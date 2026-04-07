import Link from "next/link";
import { BlogPost } from "@/services/api";
import SafeImage from "./SafeImage";

interface GadgetsRecipesProps {
  posts: BlogPost[];
  categoryName: string;
}

export default function GadgetsRecipes({ posts, categoryName }: GadgetsRecipesProps) {
  if (!posts || posts.length < 2) return null;

  // Split posts for left and right columns
  const midPoint = Math.ceil(posts.length / 2);
  const leftPosts = posts.slice(0, midPoint);
  const rightPosts = posts.slice(midPoint);

  const leftMain = leftPosts[0];
  const leftList = leftPosts.slice(1);

  const rightMain = rightPosts[0];
  const rightList = rightPosts.slice(1);

  const Card = ({ main, list, accent, title }: { main: BlogPost; list: BlogPost[]; accent: string; title: string }) => {
    if (!main) return null;

    const imageUrl = main.firebaseImages?.[0]?.url || main.blogContent.images?.[0]?.url;
    const date = new Date(main.createdAt).toLocaleDateString("fr-FR");

    return (
      <div>
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-4">
            <span className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-black">
              {title}
            </span>
            <div className={`flex-1 h-[3px] ${accent}`} />
          </div>
        </div>

        {/* Featured */}
        <article>
          <Link href={`/${main.slug}`} className="block relative w-full h-[220px] sm:h-[260px] md:h-[300px] overflow-hidden group">
            <SafeImage
              src={imageUrl}
              alt={main.blogContent.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          <div className="mt-3 text-xs font-semibold tracking-wide text-black/60 uppercase">
            {main.categorySlug}
          </div>
          <h3 className="mt-1 text-xl font-extrabold leading-snug hover:text-emerald-600 transition-colors">
            <Link href={`/${main.slug}`}>{main.blogContent.title}</Link>
          </h3>
          <div className="mt-1 text-[12px] text-black/70">
            <span className="font-semibold">{main.blogContent.metaTags?.author || "Inconnu"}</span> – {date}
          </div>
          <p className="mt-3 text-[13px] text-black/75 leading-relaxed line-clamp-3">
            {(main.blogContent.metaDescription || main.blogContent.content).replace(/<[^>]*>?/gm, "").substring(0, 100) + "..."}
          </p>
        </article>

        {/* Compact list */}
        <div className="mt-5 space-y-4">
          {list.map((item) => {
            const itemImg = item.firebaseImages?.[0]?.url || item.blogContent.images?.[0]?.url;
            const itemDate = new Date(item.createdAt).toLocaleDateString("fr-FR");
            return (
              <Link key={item._id} href={`/${item.slug}`} className="flex gap-3 group">
                <SafeImage
                  src={itemImg}
                  alt={item.blogContent.title}
                  width={120}
                  height={80}
                  className="w-[120px] h-[80px] object-cover transition-transform duration-300 group-hover:opacity-90"
                />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold leading-snug group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {item.blogContent.title}
                  </h4>
                  <div className="mt-1 text-[12px] text-black/60">{itemDate}</div>
                </div>
              </Link>
            )
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
      </div>
    )
  };

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card main={leftMain} list={leftList} accent="bg-pink-400" title={`${categoryName} : Points Forts`} />
        {rightMain && <Card main={rightMain} list={rightList} accent="bg-amber-400" title={`${categoryName} : Tendances`} />}
      </div>
    </section>
  );
}
