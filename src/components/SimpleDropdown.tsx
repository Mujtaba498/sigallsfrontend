"use client";
import Link from "next/link";
import { simpleMenuContent } from "@/services/simpleMenu";

export type SimpleDropdownProps = {
  menuKey: keyof typeof simpleMenuContent;
};

export default function SimpleDropdown({ menuKey }: SimpleDropdownProps) {
  const items = simpleMenuContent[menuKey];
  if (!items) return null;

  return (
    <div className="w-64 rounded-md border border-zinc-200 bg-white shadow-xl">
      <ul className="py-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-4 py-2 hover:bg-zinc-50 transition-colors"
              >
                <Icon className="h-5 w-5 text-zinc-700" strokeWidth={2} />
                <span className="text-sm font-semibold text-zinc-900">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}