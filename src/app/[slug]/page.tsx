import { notFound } from "next/navigation";
import PostDetail from "@/components/PostDetail";
import TableOfContents from "@/components/TableOfContents";

import CompactPostList from "@/components/CompactPostList";
import { getPostBySlug, getCategoryPosts, getLatestPosts, BlogPost } from "@/services/api";

export async function generateMetadata({ params }: { params: Promise<{ slug?: string }> }) {
  const resolved = await params;
  const slug = resolved.slug;
  if (!slug) return {};

  const post = await getPostBySlug(slug);
  if (!post) return {};

  const { title, metaDescription, metaTags } = post.blogContent;

  return {
    title: metaTags?.title || title,
    description: metaTags?.description || metaDescription,
  };
}

export default async function Page({ params }: { params: Promise<{ slug?: string }> }) {
  const resolved = await params;
  const slug = resolved.slug;
  if (!slug) notFound();

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Fetch related posts from the same category (Sidebar)
  const categoryPostsResponse = await getCategoryPosts(post.categorySlug, 1, 6);
  const sidebarRelatedPosts = categoryPostsResponse?.posts
    .filter((p) => p._id !== post._id)
    .slice(0, 5) || [];

  const categoryName = post.categorySlug
    ? post.categorySlug.charAt(0).toUpperCase() + post.categorySlug.slice(1)
    : "Connexes";

  // Fetch random posts for bottom section (Random/Latest)
  const latestPosts = await getLatestPosts(20);
  const bottomRelatedPosts: BlogPost[] = latestPosts
    .filter((p) => p._id !== post._id)
    .sort(() => 0.5 - Math.random()) // Simple shuffle
    .slice(0, 5);

  // TODO: Extract TOC from post content if needed
  const toc: { id: string; text: string }[] = [];

  return (
    <main className="max-w-6xl mx-auto py-8 px-4">
      <div className="grid grid-cols-10 gap-6 py-10">
        <div className="col-span-10 md:col-span-7">
          <PostDetail post={post} relatedPosts={bottomRelatedPosts} />
        </div>
        <aside className="col-span-10 md:col-span-3 lg:sticky lg:top-24 h-fit space-y-8">
          {toc.length > 0 && <TableOfContents items={toc} />}


          {sidebarRelatedPosts.length > 0 && (
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4 border-b border-gray-200 pb-2">
                Plus dans {categoryName}
              </h3>
              <CompactPostList posts={sidebarRelatedPosts} />
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}