"use client";
import Image from "next/image";
import { megaMenuContent } from "@/services/megaMenu";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type MegaMenuProps = {
  menuKey: keyof typeof megaMenuContent | null;
};

export default function MegaMenu({ menuKey }: MegaMenuProps) {
  if (!menuKey) return null;
  const data = megaMenuContent[menuKey];
  if (!data) return null;

  const [page, setPage] = useState(0);
  const pageSize = 5;
  const pageCount = Math.max(1, Math.ceil(data.cards.length / pageSize));
  const start = page * pageSize;
  const visible = data.cards.slice(start, start + pageSize);

  return (
    <div className="w-full bg-white shadow-xl border-b border-zinc-200">
      <div className="mx-auto max-w-7xl px-6 pb-6 pt-4">
        {/* Cards row */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
          {visible.map((card, idx) => (
            <div key={idx} className="">
              <div className="relative h-36 w-full overflow-hidden rounded-md bg-[url('/vercel.svg')] bg-cover bg-center bg-gray-200">
                {/* If we had real images we would use <Image src={card.image!} unoptimized fill /> */}
              </div>
              <div className="mt-2 text-[11px] font-semibold text-zinc-500">{data.heading}</div>
              <div className="mt-1 text-sm font-semibold text-zinc-900 leading-5">
                {card.title}
              </div>
            </div>
          ))}
        </div>
        {/* Controls + Tabs row */}
        <div className="mt-5 flex items-center justify-between border-t border-zinc-200 pt-4">
          <div className="flex items-center gap-2">
            <button
              aria-label="Previous"
              className="h-6 w-6 rounded border border-zinc-300 text-zinc-700 hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            </button>
            <button
              aria-label="Next"
              className="h-6 w-6 rounded border border-zinc-300 text-zinc-700 hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
              onClick={() => setPage((p) => Math.min(pageCount - 1, p + 1))}
              disabled={page >= pageCount - 1}
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2} />
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {data.tabs.map((tab, i) => (
              <button
                key={tab}
                className={`font-medium transition-colors ${i === 0 ? "text-emerald-600" : "text-zinc-700 hover:text-zinc-900"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}