import Link from "next/link";
import { BlogPost } from "@/services/api";
import SafeImage from "./SafeImage";

interface FashionHighlightsProps {
  posts: BlogPost[];
}

export default function FashionHighlights({ posts }: FashionHighlightsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="w-full py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 md:gap-1">
        {posts.map((post) => {
          const imageUrl = post.firebaseImages?.[0]?.url || post.blogContent.images?.[0]?.url;
          const date = new Date(post.createdAt).toLocaleDateString("fr-FR");
          const author = post.blogContent.metaTags?.author || "Inconnu";

          return (
            <article key={post._id} className="relative w-full h-[300px] sm:h-[340px] md:h-[380px] overflow-hidden rounded group">
              <Link href={`/${post.slug}`} className="block w-full h-full">
                <SafeImage
                  src={imageUrl}
                  alt={post.blogContent.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                  <div className="text-[11px] font-semibold tracking-wide opacity-85 uppercase">
                    {post.categorySlug}
                  </div>
                  <h3 className="mt-1 text-base sm:text-lg font-bold leading-snug line-clamp-2 group-hover:text-emerald-400 transition-colors">
                    {post.blogContent.title}
                  </h3>
                  <div className="mt-1 text-[12px] opacity-90">
                    <span className="font-semibold">{author}</span> – {date}
                  </div>
                </div>
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
