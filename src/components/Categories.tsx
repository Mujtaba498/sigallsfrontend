import { Category } from "@/services/api";
import Link from "next/link";

interface CategoriesProps {
  categories: Category[];
}

export default function Categories({ categories }: CategoriesProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <aside className="w-full">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-4">
          <span className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-black">Categories</span>
          <div className="flex-1 h-[3px] bg-emerald-500" />
        </div>
      </div>

      {/* List */}
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat._id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
            <Link
              href={`/category/${cat.slug}`}
              className="flex items-center justify-between py-1 w-full"
            >
              <span className="text-[15px] font-semibold text-zinc-700">{cat.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}