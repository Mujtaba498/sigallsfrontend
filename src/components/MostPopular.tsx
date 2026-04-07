import Link from "next/link";
import { BlogPost } from "@/services/api";
import SafeImage from "./SafeImage";

interface MostPopularProps {
  posts: BlogPost[];
}

export default function MostPopular({ posts }: MostPopularProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <aside className="w-full">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <span className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-foreground">Dernières Nouvelles</span>
          <div className="flex-1 h-[3px] bg-red-500" />
        </div>
      </div>

      {/* List */}
      <ul className="space-y-5">
        {posts.map((post) => {
          const imageUrl = post.firebaseImages?.[0]?.url || post.blogContent.images?.[0]?.url;
          return (
            <li key={post._id} className="flex items-start gap-3 group">
              <Link href={`/${post.slug}`} className="block w-16 h-16 shrink-0 rounded-full overflow-hidden">
                <SafeImage
                  src={imageUrl}
                  alt={post.blogContent.title}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </Link>
              <div className="flex-1">
                <div className="text-[11px] font-semibold uppercase text-zinc-500">{post.categorySlug}</div>
                <h4 className="mt-1 text-[15px] font-bold leading-snug text-foreground group-hover:text-red-500 transition-colors line-clamp-2">
                  <Link href={`/${post.slug}`}>{post.blogContent.title}</Link>
                </h4>
              </div>
            </li>
          );
        })}
      </ul>


    </aside>
  );
}
