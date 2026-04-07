import Image from "next/image";


export default function CategorySplitSection({ slug }: { slug?: string }) {
  const normalizedSlug = (slug ?? "facts").toLowerCase();
  const title = normalizedSlug.replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());

  const leftPosts: { id: string; title: string; author: string; date: string; image: string; category: string }[] = [
    { id: "lp1", title: "You and Your Kids can Enjoy this News Gaming Console", author: "David Lee", date: "June 3, 2020", image: "/camera-man.jpg", category: "Gaming" },
    { id: "lp2", title: "H&M’s Fashion Photoshoot Campaign is the Coolest Thing We’ve Seen", author: "David Lee", date: "June 1, 2020", image: "/sunny-girl.jpg", category: "Arts" },
    { id: "lp3", title: "Alexa Wallace Doesn’t Like to Play by the Standard Red Carpet Rules", author: "David Lee", date: "June 1, 2020", image: "/window.svg", category: "Arts" },
    { id: "lp4", title: "Discover 5 Travel Outfits That Are Comfortable and Also Very Chic", author: "David Lee", date: "June 1, 2020", image: "/trees.jpg", category: "Arts" },
    { id: "lp5", title: "15 of the Most Popular Make Up Products with Included Video Tutorials", author: "David Lee", date: "June 1, 2020", image: "/bird.jpg", category: "Arts" },
    { id: "lp6", title: "10 Affordable Outfits for Beach Vacations Presented by Mia Joanes", author: "David Lee", date: "June 1, 2020", image: "/nature.jpg", category: "Arts" },
  ];

  const latestArticles: { id: string; title: string; image: string; category: string }[] = [
    { id: "la1", title: "The Travel Insurance Catch that can Double Your Cover in Two Months", image: "/trees.jpg", category: "Facts" },
    { id: "la2", title: "The Weirdest Places Ashes Have Been Scattered in South America", image: "/nature.jpg", category: "Facts" },
    { id: "la3", title: "These Fabulous Photos Will Have Astonishing Impact for Any Campaign", image: "/bird.jpg", category: "Facts" },
    { id: "la4", title: "Watch Awesome Kate Manner Go Full Dancing Pro in Peru this Week", image: "/sunny-girl.jpg", category: "Facts" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-10 gap-6">
        {/* Left 70% content */}
        <div className="col-span-10 md:col-span-7">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {leftPosts.map((p) => (
              <article key={p.id}>
                <div className="relative w-full h-[220px] sm:h-[240px] md:h-[260px] overflow-hidden rounded">
                  <Image src={p.image} alt={p.title} fill className="object-cover" />
                </div>
                <div className="mt-2 text-[11px] font-semibold tracking-wide text-black/60 uppercase">{p.category}</div>
                <h3 className="mt-1 text-lg font-extrabold leading-snug">{p.title}</h3>
                <div className="mt-1 text-[12px] text-black/70"><span className="font-semibold">{p.author}</span> – {p.date}</div>
              </article>
            ))}
          </div>
        </div>

        {/* Right 30% sidebar */}
        <aside className="col-span-10 md:col-span-3 lg:sticky lg:top-24 h-fit space-y-8">



          {/* Latest Articles list */}
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-black">Latest Articles</span>
              <div className="flex-1 h-[3px] bg-emerald-500" />
            </div>
            <ul className="space-y-4">
              {latestArticles.map((a) => (
                <li key={a.id} className="flex items-center gap-3">
                  <Image src={a.image} alt={a.title} width={64} height={64} className="rounded-full object-cover ring-1 ring-black/10" />
                  <div className="flex-1">
                    <div className="text-[10px] uppercase tracking-widest text-black/60">{a.category}</div>
                    <div className="text-sm font-semibold leading-snug text-black/90">{a.title}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}