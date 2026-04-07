export type TocItem = { id: string; text: string };

export default function TableOfContents({ items, title = "Table des matières" }: { items: TocItem[]; title?: string }) {
  return (
    <nav className="border border-black/15 p-4">
      <div className="flex items-center gap-4 mb-3">
        <span className="text-lg font-extrabold uppercase tracking-tight text-black">{title}</span>
        <div className="flex-1 h-[3px] bg-emerald-500" />
      </div>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it.id}>
            <a href={`#${it.id}`} className="text-sm text-black/80 hover:text-black">
              {it.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}