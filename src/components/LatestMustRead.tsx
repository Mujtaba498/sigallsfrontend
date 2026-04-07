"use client";
import Link from "next/link";
import Categories from "./Categories";
import { useState } from "react";
import { BlogPost, Category } from "@/services/api";
import SafeImage from "./SafeImage";

interface LatestMustReadProps {
  latestPosts: BlogPost[];
  mustReadPosts: BlogPost[];
  categories: Category[];
}

export default function LatestMustRead({ latestPosts = [], mustReadPosts = [], categories = [] }: LatestMustReadProps) {
  const sectionPageSizeLeft = 4;
  const sectionPageSizeRight = 3; // Kept for pagination logic if expanded later, though currently we might just show all passed posts or slice them
  const [sectionPage, setSectionPage] = useState(1);

  // For now, we'll just display the passed posts. Prop names imply pre-fetched data.
  // We can implement client-side pagination if we passed many posts, but usually we just pass the first page.
  // Let's assume we want to show all passed posts (which were limited by the API call) or handle simple pagination if needed.
  // The API call limited latestPosts to 6.

  const latestPaged = latestPosts;
  const mustReadPaged = mustReadPosts;

  return (
    <section className="w-full py-6">
      <div className="grid grid-cols-10 gap-4 md:gap-6">
        {/* Left 70%: Latest Articles grid */}
        <div className="col-span-10 md:col-span-7">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-center gap-4">
              <span className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-foreground">Derniers Articles</span>
              <div className="flex-1 h-[3px] bg-emerald-500" />
            </div>
          </div>

          {/* Grid of posts (2 columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {latestPaged.map((post) => {
              const imageUrl = post.firebaseImages?.[0]?.url || post.blogContent.images?.[0]?.url;
              const date = new Date(post.createdAt).toLocaleDateString("fr-FR");
              const author = post.blogContent.metaTags?.author || "Inconnu";

              return (
                <article key={post._id} className="group">
                  <Link href={`/${post.slug}`} className="block relative w-full h-[220px] sm:h-[240px] md:h-[260px] overflow-hidden">
                    <SafeImage
                      src={imageUrl}
                      alt={post.blogContent.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </Link>
                  {/* Category removed as requested */}
                  <h3 className="mt-3 text-lg font-extrabold leading-snug text-foreground group-hover:text-emerald-500 transition-colors">
                    <Link href={`/${post.slug}`}>{post.blogContent.title}</Link>
                  </h3>
                  <div className="mt-1 text-[12px] text-zinc-600"><span className="font-semibold">{author}</span> – {date}</div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Right 30%: Must Read list (sticky) */}
        <div className="col-span-10 md:col-span-3 lg:sticky lg:top-24 h-fit">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-center gap-4">
              <span className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-foreground">À Lire Absolument</span>
              <div className="flex-1 h-[3px] bg-emerald-500" />
            </div>
          </div>

          {/* List */}
          <ul className="space-y-6">
            {mustReadPaged.map((item) => (
              <li key={item._id} className="group">
                <div className="text-[11px] font-semibold uppercase text-zinc-500">{item.categorySlug}</div>
                <h4 className="mt-1 text-[15px] font-bold leading-snug text-foreground group-hover:text-emerald-500 transition-colors">
                  <Link href={`/${item.slug}`}>{item.blogContent.title}</Link>
                </h4>
              </li>
            ))}
          </ul>

          {/* Categories below */}
          <div className="mt-10">
            <Categories categories={categories} />
          </div>
        </div>
      </div>
    </section>
  );
}
