"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { getTrendingPosts, type BlogPost } from "@/services/api";

export default function TrendingTicker() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      const data = await getTrendingPosts();
      setPosts(data);
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!paused && posts.length > 0) {
      intervalRef.current = setInterval(() => {
        setIndex((i) => (i + 1) % posts.length);
      }, 3500);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [paused, posts.length]);

  const prev = () => setIndex((i) => (i - 1 + posts.length) % posts.length);
  const next = () => setIndex((i) => (i + 1) % posts.length);

  if (posts.length === 0) return null;

  return (
    <div
      className="rounded-md bg-white px-3 py-2 border border-zinc-100"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center rounded-sm bg-emerald-600 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
          Tendance Actuelle
        </span>
        <div className="relative flex-1 overflow-hidden">
          <Link href={`/${posts[index]?.slug}`} key={index} className="block whitespace-nowrap text-sm text-zinc-800 transition-opacity duration-500 opacity-100 truncate hover:text-red-700 hover:underline">
            {posts[index]?.blogContent.title}
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <button
            aria-label="Previous"
            onClick={prev}
            className="rounded-sm bg-white p-1 text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            aria-label="Next"
            onClick={next}
            className="rounded-sm bg-white p-1 text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}