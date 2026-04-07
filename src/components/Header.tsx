"use client";
import Image from "next/image";
import { useState, useRef, useEffect, useCallback } from "react";
import { Search } from "lucide-react";
import type { Category, BlogPost } from "@/services/api";
import SafeImage from "./SafeImage";

export default function Header({ categories = [] }: { categories?: Category[] }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<BlogPost[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }
    setIsLoading(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch(`${baseUrl}/api/posts/search?q=${encodeURIComponent(q)}`);
      const json = await res.json();
      if (json.success && Array.isArray(json.posts)) {
        setResults(json.posts);
        setIsOpen(json.posts.length > 0);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    } catch {
      setResults([]);
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(val), 300);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <header className="w-full border-b border-zinc-200">
      {/* Top bar with logo and search */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 no-underline cursor-pointer">
            <div className="relative h-20 w-20 flex-shrink-0">
              <Image src="/segelLogo.png" alt="Sigal Industries Logo" fill className="object-contain" />
            </div>
            <div className="leading-tight">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-extrabold tracking-tight text-foreground uppercase">SIGAL INDUSTRIES</span>
              </div>
              <div className="text-zinc-500 text-sm">sigal-industries.fr</div>
            </div>
          </a>

          {/* Search Bar */}
          <div ref={containerRef} className="relative hidden md:block w-[400px] lg:w-[480px]">
            <div className="flex items-center border border-zinc-300 rounded-lg bg-white overflow-hidden focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500 transition-all">
              <Search className="h-5 w-5 text-zinc-400 ml-3 flex-shrink-0" />
              <input
                type="text"
                value={query}
                onChange={handleChange}
                onFocus={() => { if (results.length > 0) setIsOpen(true); }}
                placeholder="Rechercher des articles..."
                className="w-full px-3 py-2.5 text-sm text-zinc-800 placeholder-zinc-400 outline-none bg-transparent"
              />
              {isLoading && (
                <div className="mr-3 flex-shrink-0">
                  <div className="h-4 w-4 border-2 border-zinc-300 border-t-red-500 rounded-full animate-spin" />
                </div>
              )}
            </div>

            {/* Search Results Dropdown */}
            {isOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-zinc-200 rounded-lg shadow-xl z-50 max-h-[400px] overflow-y-auto">
                {results.map((post) => {
                  const imageUrl =
                    post.firebaseImages?.[0]?.url ||
                    post.blogContent?.images?.[0]?.url;
                  return (
                    <a
                      key={post._id}
                      href={`/${post.slug}`}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-zinc-50 transition-colors border-b border-zinc-100 last:border-0"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="w-14 h-14 flex-shrink-0 rounded overflow-hidden bg-zinc-100">
                        <SafeImage
                          src={imageUrl}
                          alt={post.blogContent?.title || ""}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-zinc-800 line-clamp-2 leading-snug">
                          {post.blogContent?.title}
                        </p>
                        <span className="text-[11px] text-zinc-500 uppercase mt-0.5 block">
                          {post.categorySlug}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Nav bar */}
      <div className="w-full border-t border-zinc-200 relative">
        <nav className="bg-zinc-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
            <div className="flex items-center gap-4 overflow-x-auto text-white py-3">
              {/* Static Home Item */}
              <a
                className="flex items-center gap-2 rounded px-3 py-1.5 bg-white/10"
                href="/"
              >
                <span className="font-medium">ACCUEIL</span>
              </a>

              {/* Dynamic Categories from API */}
              {categories.map((cat) => (
                <a
                  key={cat._id}
                  className="flex items-center gap-2 rounded px-3 py-1.5 hover:bg-white/10"
                  href={`/category/${cat.slug}`}
                >
                  <span className="font-medium uppercase">{cat.name}</span>
                </a>
              ))}


            </div>
          </div>
          <div className="h-1 bg-red-600" />
        </nav>
      </div>
    </header>
  );
}

