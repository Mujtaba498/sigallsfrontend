import CategoryPage from "@/components/CategoryPage";
import { getCategories, getCategoryPosts, getSeoData } from "@/services/api";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import CategorySkeleton from "@/components/CategorySkeleton";

export const dynamic = "force-dynamic"; // Since we have searchParams for pagination, we should probably be dynamic or use revalidate. 
// However, the user asked for proper SSR.
// Next.js static params are good for slugs, but pagination usually requires dynamic rendering or client-side fetching.
// Let's use standard server component data fetching.

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const [seoData, categories] = await Promise.all([getSeoData(), getCategories()]);

  // Try to find category in SEO data first
  const seoCategory = seoData?.categories?.find(c => c.categorySlug === slug);

  if (seoCategory) {
    return {
      title: seoCategory.title, // It seems the user wants the exact title from the SEO response
      description: seoCategory.description,
      keywords: seoCategory.keywords,
      openGraph: {
        title: seoCategory.title,
        description: seoCategory.description,
      },
      twitter: {
        title: seoCategory.title,
        description: seoCategory.description,
      }
    };
  }

  // Fallback to existing logic
  const category = categories.find(c => c.slug === slug);
  const title = category ? category.name : slug.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());

  return {
    title: `${title} | Category`,
    description: `Browse articles for ${title}.`,
  };
}

export default async function Page({ params, searchParams }: { params: Promise<{ slug: string }>, searchParams: Promise<{ page?: string }> }) {
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const limit = 12; // Standard grid size

  // Key for Suspense to trigger on page change
  const suspendKey = `${slug}-${currentPage}`;

  return (
    <Suspense key={suspendKey} fallback={<CategorySkeleton />}>
      <CategoryPageWrapper slug={slug} currentPage={currentPage} limit={limit} />
    </Suspense>
  );
}

async function CategoryPageWrapper({ slug, currentPage, limit }: { slug: string, currentPage: number, limit: number }) {
  const [categories, postsResponse] = await Promise.all([
    getCategories(),
    getCategoryPosts(slug, currentPage, limit)
  ]);

  if (!postsResponse || !postsResponse.success) {
    // Handle error or empty state
    // If category doesn't exist or API fails, we might want to show 404 or empty state.
    // For now if no categories found but slug exists in static params it might be okay.
    // But strictly, if we can't find the category data, it's a 404.
  }

  const category = categories.find(c => c.slug === slug);
  // If we want to enforce category existence:
  // if (!category && postsResponse?.posts.length === 0) notFound();

  return (
    <CategoryPage
      slug={slug}
      title={category ? category.name : slug}
      posts={postsResponse?.posts || []}
      pagination={postsResponse?.pagination || { currentPage: 1, totalPages: 1, hasNextPage: false, hasPrevPage: false, totalPosts: 0 }}
    />
  );
}