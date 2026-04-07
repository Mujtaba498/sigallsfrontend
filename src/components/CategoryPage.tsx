import Link from "next/link";
import { BlogPost } from "@/services/api";
import SafeImage from "./SafeImage";

interface CategoryPageProps {
  slug: string;
  title: string;
  posts: BlogPost[];
  pagination: {
    currentPage: number;
    totalPages: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
  };
}

export default function CategoryPage({ slug, title, posts, pagination }: CategoryPageProps) {

  return (
    <section className="max-w-6xl py-4 mx-auto px-4">
      {/* Crumbs */}
      <nav className="text-sm text-gray-500 mb-4">
        <Link href="/">Accueil</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 font-medium capitalize">{title}</span>
      </nav>

      {/* Title */}
      <header className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight mb-3 capitalize">{title}</h1>
      </header>

      {/* Grid of posts */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.map((p) => {
            const imageUrl = p.firebaseImages?.[0]?.url || p.blogContent.images?.[0]?.url;
            const date = new Date(p.createdAt).toLocaleDateString("fr-FR");
            const author = p.blogContent.metaTags?.author || "Inconnu";

            return (
              <article key={p._id} className="relative group overflow-hidden rounded shadow bg-white">
                <Link href={`/${p.slug}`} className="block relative w-full h-48">
                  <SafeImage
                    src={imageUrl}
                    alt={p.blogContent.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
                </Link>
                <div className="p-3">
                  <span className="text-[10px] uppercase tracking-widest bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">{p.categorySlug}</span>
                  <h3 className="mt-2 text-sm font-semibold leading-tight group-hover:text-emerald-600 transition-colors">
                    <Link href={`/${p.slug}`}>{p.blogContent.title}</Link>
                  </h3>
                  <p className="mt-1 text-[11px] text-gray-500">{author} · {date}</p>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="py-10 text-center text-gray-500">
          Aucun article trouvé dans cette catégorie.
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {pagination.hasPrevPage && (
            <Link
              href={`/category/${slug}?page=${pagination.currentPage - 1}`}
              className="w-8 h-8 flex items-center justify-center border border-zinc-200 hover:bg-zinc-50 transition-colors rounded"
              aria-label="Page Précédente"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 19L8 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          )}

          <span className="flex items-center justify-center h-8 px-3 border border-zinc-200 bg-gray-50 text-sm font-medium">
            Page {pagination.currentPage} sur {pagination.totalPages}
          </span>

          {pagination.hasNextPage && (
            <Link
              href={`/category/${slug}?page=${pagination.currentPage + 1}`}
              className="w-8 h-8 flex items-center justify-center border border-zinc-200 hover:bg-zinc-50 transition-colors rounded"
              aria-label="Page Suivante"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </Link>
          )}
        </div>
      )}
    </section>
  );
}
