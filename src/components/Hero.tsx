import Link from "next/link";
import { getPostsByCategory } from "@/services/api";
import SafeImage from "./SafeImage";

export default async function Hero() {
  const posts = await getPostsByCategory("salud");
  console.log("[Hero] Rendered with posts:", posts.length);

  // Ensure we have at least 1 post for the main feature, and up to 4 for the side grid.
  const mainPost = posts[0];
  const sidePosts = posts.slice(1, 5);

  if (!mainPost) return null;

  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
        {/* Left feature */}
        <article className="relative lg:col-span-2 overflow-hidden h-[360px] sm:h-[420px] lg:h-[520px]">
          <Link href={`/${mainPost.slug}`} className="block w-full h-full group">
            <SafeImage
              src={mainPost.firebaseImages?.[0]?.url || mainPost.blogContent.images?.[0]?.url}
              alt={mainPost.blogContent.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
              <div className="text-xs font-semibold tracking-wide opacity-80 uppercase">
                {mainPost.categorySlug}
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold leading-tight">
                {mainPost.blogContent.title}
              </h2>
              <div className="mt-3 text-xs sm:text-sm opacity-80">
                {mainPost.blogContent.metaTags?.author || "Auteur Inconnu"} — {new Date(mainPost.createdAt).toLocaleDateString("fr-FR")}
              </div>
            </div>
          </Link>
        </article>

        {/* Right 2x2 grid, full height to match left */}
        <div className="grid grid-cols-2 grid-rows-2 gap-1 h-[360px] sm:h-[420px] lg:h-[520px]">
          {sidePosts.map((post) => (
            <article key={post._id} className="relative overflow-hidden h-full w-full">
              <Link href={`/${post.slug}`} className="block w-full h-full group">
                <SafeImage
                  src={post.firebaseImages?.[0]?.url || post.blogContent.images?.[0]?.url}
                  alt={post.blogContent.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="text-[11px] font-semibold tracking-wide opacity-80 uppercase">
                    {post.categorySlug}
                  </div>
                  <h3 className="mt-1 text-sm sm:text-base font-bold leading-snug line-clamp-3">
                    {post.blogContent.title}
                  </h3>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
