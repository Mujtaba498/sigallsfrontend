import Link from "next/link";
import ShareBar from "./ShareBar";
import { BlogPost } from "@/services/api";
import SafeImage from "./SafeImage";

export default function PostDetail({ post, relatedPosts = [] }: { post: BlogPost; relatedPosts?: BlogPost[] }) {
  const { title, content, author, metaTags, keyPoints, ogTags } = post.blogContent;
  const contentImageFallback = "this.onerror=null;this.src='/placeholder-image.svg';";

  const inlineRelatedPosts = relatedPosts.slice(0, 3);
  const footerRelatedPosts = relatedPosts.slice(3);

  let displayContent = content;

  if (inlineRelatedPosts.length > 0) {
    const paragraphs = displayContent.split(/(<\/p>)/i);
    const pIndices: number[] = [];
    paragraphs.forEach((part, index) => {
      if (part.toLowerCase() === '</p>') {
        pIndices.push(index);
      }
    });

    if (pIndices.length >= 4) {
      const positions: number[] = [];
      const totalP = pIndices.length;

      if (inlineRelatedPosts.length === 1) {
        positions.push(Math.floor(totalP / 2));
      } else if (inlineRelatedPosts.length === 2) {
        positions.push(Math.floor(totalP / 3));
        positions.push(Math.floor((totalP * 2) / 3));
      } else {
        // Distribute 3 items approximately at 1/4, 2/4, 3/4
        positions.push(Math.floor(totalP / 4));
        positions.push(Math.floor((totalP * 2) / 4));
        positions.push(Math.floor((totalP * 3) / 4));
      }

      positions.forEach((pIndex, i) => {
        const related = inlineRelatedPosts[i];
        if (!related) return;

        const relatedImage =
          related.firebaseImages?.[0]?.url ||
          related.blogContent.images?.[0]?.url ||
          related.blogContent.ogTags?.image ||
          "/placeholder-image.svg";

        const safeTitle = related.blogContent.title
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;");

        const htmlToInject = `
        <div class="my-8 p-4 sm:p-5 bg-[#f8fbff] border border-blue-100 rounded-xl flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 group hover:shadow-md transition-all not-prose">
          <a href="/${related.slug}" class="flex-shrink-0 w-full sm:w-32 h-44 sm:h-24 overflow-hidden rounded-lg shadow-sm block">
            <img src="${relatedImage}" alt="${safeTitle}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" referrerpolicy="no-referrer" />
          </a>
          <div class="flex-1">
            <span class="text-[11px] font-bold uppercase tracking-widest text-[#2a5b84] mb-2 block">À Lire Aussi</span>
            <a href="/${related.slug}" class="flex items-start gap-3 flex-row font-bold text-gray-900 group-hover:text-blue-700 decoration-blue-700/40 decoration-2 underline-offset-4 group-hover:underline transition-colors text-left">
              <span class="mt-2 sm:mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-black group-hover:bg-blue-700 transition-colors"></span>
              <span class="text-[16px] sm:text-[17px] leading-snug line-clamp-3">${safeTitle}</span>
            </a>
          </div>
        </div>
        `;

        const targetIndex = pIndices[pIndex];
        paragraphs[targetIndex] = paragraphs[targetIndex] + htmlToInject;
      });

      displayContent = paragraphs.join('');
    }
  }

  displayContent = displayContent.replace(
    /<img\b(?![^>]*\bonerror=)/gi,
    `<img onerror="${contentImageFallback}"`
  );

  const postDate = new Date(post.createdAt).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const tag = post.categorySlug || "Général";

  // Prioritize firebaseImages, then ogTags image, then fallback
  const heroImage =
    post.firebaseImages?.[0]?.url ||
    post.blogContent.images?.[0]?.url ||
    ogTags?.image ||
    "/placeholder-image.svg";

  const authorName = metaTags?.author || author || "David Lee";

  return (
    <article>
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold leading-tight">{title}</h1>
      <div className="mt-2 flex items-center gap-3 text-[12px] text-black/70">
        <span className="font-semibold">{authorName}</span>
        <span>{postDate}</span>
        <span className="inline-block px-2 py-0.5 bg-black text-white/90 text-[11px] uppercase tracking-wider">{tag}</span>
      </div>

      {/* Share bar near header */}
      <div className="mt-4">
        <ShareBar socialLinks={post.socialMediaUrls} />
      </div>

      {/* Hero image */}
      <div className="mt-5 relative w-full h-[240px] md:h-[360px]">
        <SafeImage
          src={heroImage}
          alt={title}
          fill
          className="object-cover"
          priority
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Key Points */}
      {keyPoints && keyPoints.length > 0 && (
        <div className="mt-6 bg-gray-50 p-4 border-l-4 border-black">
          <h3 className="font-bold text-sm mb-2 uppercase">Points Clés</h3>
          <ul className="list-disc pl-5 space-y-1">
            {keyPoints.map((point, index) => (
              <li key={index} className="text-sm text-gray-700 leading-relaxed">{point}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Body content */}
      <div className="prose prose-sm md:prose p-0 mt-6 !max-w-none w-full prose-a:text-blue-600 hover:prose-a:underline prose-img:rounded-md">
        <div className="[&_h1]:hidden [&_table]:w-full [&_table]:border-collapse [&_table]:border [&_table]:border-zinc-200 [&_th]:border [&_th]:border-zinc-200 [&_th]:px-4 [&_th]:py-2 [&_td]:border [&_td]:border-zinc-200 [&_td]:px-4 [&_td]:py-2 [&_iframe]:w-full [&_figure]:w-full" dangerouslySetInnerHTML={{ __html: displayContent }} />
      </div>

      {/* FAQs */}
      {post.blogContent.faqs && post.blogContent.faqs.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Foire Aux Questions</h3>
          <div className="space-y-4">
            {post.blogContent.faqs.map((faq, index) => (
              <details key={index} className="group border border-gray-200 rounded-lg open:bg-gray-50 transition-colors">
                <summary className="flex cursor-pointer items-center justify-between p-4 font-semibold text-gray-900 group-hover:text-blue-600 list-none">
                  {faq.question}
                  <span className="ml-2 transition-transform group-open:rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <div className="px-4 pb-4 text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}





      {/* Related articles */}
      {footerRelatedPosts.length > 0 && (
        <div className="mt-8">
          <div className="flex items-center gap-3 border-b border-black/20 pb-2">
            <span className="text-[12px] font-semibold px-3 py-1 bg-black text-white uppercase">Articles Connexes</span>
            <div className="flex-1" />
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {footerRelatedPosts.map((related) => {
              const relatedImage =
                related.firebaseImages?.[0]?.url ||
                related.blogContent.images?.[0]?.url ||
                related.blogContent.ogTags?.image;
              return (
                <div key={related._id}>
                  <Link href={`/${related.slug}`} className="block group">
                    <div className="relative w-full h-[180px] overflow-hidden">
                      <SafeImage
                        src={relatedImage}
                        alt={related.blogContent.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <p className="mt-3 text-[13px] font-semibold leading-snug group-hover:text-blue-600 transition-colors">
                      {related.blogContent.title}
                    </p>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </article>
  );
}
