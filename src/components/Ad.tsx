import Image from "next/image";

export default function Ad({ title = "Publicité" }: { title?: string }) {
  return (
    <aside className="w-full">
      <div className="text-[11px] font-semibold text-zinc-500 tracking-wide uppercase text-center mb-2">
        {title}
      </div>
      <div className="border border-zinc-200 bg-zinc-50 p-2">
        <div className="w-full h-[250px] overflow-hidden">
          <Image
            src="/window.svg"
            alt="Ad placeholder"
            width={300}
            height={250}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      </div>
    </aside>
  );
}