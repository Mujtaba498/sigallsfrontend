import Link from "next/link";
import { BlogPost } from "@/services/api";
import SafeImage from "./SafeImage";

interface TravelGuidesProps {
  posts: BlogPost[];
}

export default function TravelGuides({ posts }: TravelGuidesProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="w-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <span className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-black">
            {posts[0].categorySlug.replace("-", " ")}
          </span>
          <div className="flex-1 h-[3px] bg-emerald-500/80" />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-1">
        {posts.map((post) => {
          const imageUrl = post.firebaseImages?.[0]?.url || post.blogContent.images?.[0]?.url;
          return (
            <article key={post._id} className="relative overflow-hidden group">
              <Link href={`/${post.slug}`} className="block relative h-[260px] sm:h-[320px] md:h-[360px] w-full">
                <SafeImage
                  src={imageUrl}
                  alt={post.blogContent.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 text-white text-center">
                  <div className="text-[11px] font-semibold tracking-wide opacity-90 uppercase">
                    {post.categorySlug}
                  </div>
                  <h3 className="mt-2 text-base sm:text-lg md:text-xl font-extrabold leading-snug line-clamp-3">
                    {post.blogContent.title}
                  </h3>
                </div>
              </Link>
            </article>
          );
        })}
      </div>

      {/* Controls */}
      <div className="mt-5 flex gap-2">
        <button aria-label="Précédent" className="w-8 h-8 flex items-center justify-center border border-black/15 hover:bg-black/5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M15 19L8 12l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <button aria-label="Suivant" className="w-8 h-8 flex items-center justify-center border border-black/15 hover:bg-black/5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </section>
  );
}
