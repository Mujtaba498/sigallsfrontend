"use client";
import { Facebook, Twitter, Linkedin, Link as LinkIcon, Instagram } from "lucide-react";

interface SocialLinks {
  instagram?: string[];
  linkedin?: string[];
  facebook?: string[];
  twitter?: string[];
  threads?: string[];
}

export default function ShareBar({ socialLinks }: { socialLinks?: SocialLinks }) {
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // no toast framework; keep silent
    } catch { }
  };

  const fbLink = socialLinks?.facebook?.[0];
  const xLink = socialLinks?.twitter?.[0];
  const inLink = socialLinks?.linkedin?.[0];
  const instaLink = socialLinks?.instagram?.[0];

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Facebook */}
      {fbLink ? (
        <a href={fbLink} target="_blank" rel="noopener noreferrer" className="h-8 w-8 flex items-center justify-center bg-[#1877f2] text-white hover:opacity-90 transition rounded" aria-label="Visit Facebook">
          <Facebook className="h-4 w-4" strokeWidth={2} />
        </a>
      ) : (
        <button className="h-8 w-8 flex items-center justify-center bg-[#1877f2] text-white hover:opacity-90 transition rounded" aria-label="Share on Facebook">
          <Facebook className="h-4 w-4" strokeWidth={2} />
        </button>
      )}

      {/* X / Twitter */}
      {xLink ? (
        <a href={xLink} target="_blank" rel="noopener noreferrer" className="h-8 w-8 flex items-center justify-center bg-black text-white hover:opacity-90 transition rounded" aria-label="Visit X">
          <Twitter className="h-4 w-4" strokeWidth={2} />
        </a>
      ) : (
        <button className="h-8 w-8 flex items-center justify-center bg-black text-white hover:opacity-90 transition rounded" aria-label="Share on X">
          <Twitter className="h-4 w-4" strokeWidth={2} />
        </button>
      )}

      {/* LinkedIn */}
      {inLink ? (
        <a href={inLink} target="_blank" rel="noopener noreferrer" className="h-8 w-8 flex items-center justify-center bg-[#0a66c2] text-white hover:opacity-90 transition rounded" aria-label="Visit LinkedIn">
          <Linkedin className="h-4 w-4" strokeWidth={2} />
        </a>
      ) : (
        <button className="h-8 w-8 flex items-center justify-center bg-[#0a66c2] text-white hover:opacity-90 transition rounded" aria-label="Share on LinkedIn">
          <Linkedin className="h-4 w-4" strokeWidth={2} />
        </button>
      )}

      {/* Instagram (Only if link provided, as originally it wasn't there) */}
      {instaLink && (
        <a href={instaLink} target="_blank" rel="noopener noreferrer" className="h-8 w-8 flex items-center justify-center bg-[#E1306C] text-white hover:opacity-90 transition rounded" aria-label="Visit Instagram">
          <Instagram className="h-4 w-4" strokeWidth={2} />
        </a>
      )}

      <button onClick={onCopy} className="h-8 px-3 bg-white text-black text-xs font-semibold border border-black/15 hover:bg-gray-50 transition" aria-label="Copy Link">
        <div className="flex items-center gap-1"><LinkIcon className="h-4 w-4" strokeWidth={2} /> Copy</div>
      </button>
    </div>
  );
}