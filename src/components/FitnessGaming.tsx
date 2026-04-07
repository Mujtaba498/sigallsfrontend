import Link from "next/link";
import { BlogPost } from "@/services/api";
import SafeImage from "./SafeImage";

interface FitnessGamingProps {
  posts: BlogPost[];
  categoryName: string;
}

export default function FitnessGaming({ posts, categoryName }: FitnessGamingProps) {
  if (!posts || posts.length === 0) return null;

  // Split posts: first 5 for the list, last 1 for the sidebar feature (or similar logic)
  const listPosts = posts.slice(0, 5);
  const featurePost = posts[5]; // The 6th post

  return (
    <section className="w-full py-6">
      <div className="grid grid-cols-10 gap-4 md:gap-6">
        {/* Left 70%: Post list */}
        <div className="col-span-10 md:col-span-7">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-center gap-4">
              <span className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-foreground">{categoryName}</span>
              <div className="flex-1 h-[3px] bg-sky-500" />
            </div>
          </div>

          {/* Posts list */}
          <ul className="space-y-6">
            {listPosts.map((post) => {
              const imageUrl = post.firebaseImages?.[0]?.url || post.blogContent.images?.[0]?.url;
              const date = new Date(post.createdAt).toLocaleDateString("fr-FR");
              const author = post.blogContent.metaTags?.author || "Inconnu";

              return (
                <li key={post._id} className="flex gap-4 group">
                  <Link href={`/${post.slug}`} className="block shrink-0">
                    <SafeImage
                      src={imageUrl}
                      alt={post.blogContent.title}
                      width={220}
                      height={160}
                      className="w-[120px] h-[90px] sm:w-[220px] sm:h-[160px] object-cover transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </Link>
                  <div className="flex-1">
                    <div className="text-[11px] font-semibold uppercase text-zinc-500">{post.categorySlug}</div>
                    <h3 className="mt-1 text-base sm:text-lg font-extrabold leading-snug text-foreground group-hover:text-sky-500 transition-colors">
                      <Link href={`/${post.slug}`}>{post.blogContent.title}</Link>
                    </h3>
                    <div className="mt-1 text-[12px] text-zinc-600"><span className="font-semibold">{author}</span> – {date}</div>
                    <p className="mt-2 text-[13px] text-zinc-700 leading-relaxed line-clamp-2 sm:line-clamp-3">
                      {(post.blogContent.metaDescription || post.blogContent.content).replace(/<[^>]*>?/gm, "").substring(0, 120) + "..."}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Controls */}
          <div className="mt-5 flex gap-2">
            <button aria-label="Précédent" className="w-8 h-8 flex items-center justify-center border border-zinc-200 hover:bg-zinc-50 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 19L8 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button aria-label="Suivant" className="w-8 h-8 flex items-center justify-center border border-zinc-200 hover:bg-zinc-50 transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>

        {/* Right 30%: Feature, sticky */}
        <div className="col-span-10 md:col-span-3 lg:sticky lg:top-24 h-fit">
          {featurePost && (
            <>
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-foreground">En Vedette</span>
                  <div className="flex-1 h-[3px] bg-pink-400" />
                </div>
              </div>

              {/* Feature */}
              <article className="group">
                <Link href={`/${featurePost.slug}`} className="block relative w-full h-[220px] sm:h-[260px] md:h-[300px] overflow-hidden">
                  <SafeImage
                    src={featurePost.firebaseImages?.[0]?.url || featurePost.blogContent.images?.[0]?.url}
                    alt={featurePost.blogContent.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </Link>
                <div className="mt-3 text-[11px] font-semibold tracking-wide text-zinc-500 uppercase">{featurePost.categorySlug}</div>
                <h3 className="mt-1 text-lg font-extrabold leading-snug text-foreground group-hover:text-pink-500 transition-colors">
                  <Link href={`/${featurePost.slug}`}>{featurePost.blogContent.title}</Link>
                </h3>
                <div className="mt-1 text-[12px] text-zinc-600">
                  <span className="font-semibold">{featurePost.blogContent.metaTags?.author || "Inconnu"}</span> – {new Date(featurePost.createdAt).toLocaleDateString("fr-FR")}
                </div>
                <p className="mt-3 text-[13px] text-zinc-700 leading-relaxed line-clamp-3">
                  {(featurePost.blogContent.metaDescription || featurePost.blogContent.content).replace(/<[^>]*>?/gm, "").substring(0, 100) + "..."}
                </p>
              </article>

              {/* Controls */}
              <div className="mt-5 flex gap-2">
                <button aria-label="Précédent" className="w-8 h-8 flex items-center justify-center border border-black/15 hover:bg-black/5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 19L8 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <button aria-label="Suivant" className="w-8 h-8 flex items-center justify-center border border-black/15 hover:bg-black/5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
