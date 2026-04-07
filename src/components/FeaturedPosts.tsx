import Link from "next/link";
import { BlogPost } from "@/services/api";
import SafeImage from "./SafeImage";

interface FeaturedPostProps {
  post: BlogPost;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  if (!post) return null;

  const imageUrl = post.firebaseImages?.[0]?.url || post.blogContent.images?.[0]?.url;
  const author = post.blogContent.metaTags?.author || "Auteur Inconnu";
  const date = new Date(post.createdAt).toLocaleDateString("fr-FR");

  return (
    <article>
      <Link href={`/${post.slug}`} className="group relative block overflow-hidden">
        <SafeImage
          src={imageUrl}
          alt={post.blogContent.title}
          width={800}
          height={600}
          className="h-[220px] md:h-[300px] w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          priority
          referrerPolicy="no-referrer"
        />
        <span className="absolute left-3 top-3 text-[11px] px-2 py-0.5 bg-black text-white/90 uppercase">
          {post.categorySlug}
        </span>
      </Link>

      <h2 className="mt-3 text-lg md:text-xl font-bold leading-snug text-foreground hover:text-red-500 transition-colors">
        <Link href={`/${post.slug}`}>
          {post.blogContent.title}
        </Link>
      </h2>
      <div className="mt-1 text-[12px] text-zinc-600">
        <span className="font-semibold">{author}</span> – {date}
      </div>
      <p className="mt-3 text-[13px] text-zinc-700 leading-relaxed line-clamp-3">
        {(post.blogContent.metaDescription || post.blogContent.content).replace(/<[^>]*>?/gm, "").substring(0, 150) + "..."}
      </p>


    </article>
  );
}
