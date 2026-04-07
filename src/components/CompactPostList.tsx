import Link from "next/link";
import { BlogPost } from "@/services/api";
import SafeImage from "./SafeImage";

interface CompactPostListProps {
  posts: BlogPost[];
}

export default function CompactPostList({ posts }: CompactPostListProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="space-y-4 md:space-y-5">
      {posts.map((post) => {
        const imageUrl = post.firebaseImages?.[0]?.url || post.blogContent.images?.[0]?.url;
        const date = new Date(post.createdAt).toLocaleDateString("fr-FR");

        return (
          <Link key={post._id} href={`/${post.slug}`} className="flex gap-3">
            <SafeImage
              src={imageUrl}
              alt={post.blogContent.title}
              width={120}
              height={80}
              className="w-[120px] h-[80px] object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1">
              <h3 className="text-sm md:text-[15px] font-semibold leading-snug text-foreground line-clamp-2">
                {post.blogContent.title}
              </h3>
              <div className="mt-1 text-[12px] text-zinc-500">{date}</div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
