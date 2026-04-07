import Image from "next/image";
import { getSeoData } from "@/services/api";

export default async function Footer() {
  const seoData = await getSeoData();
  const description = seoData?.footerContent || "Sigal Industries est votre source d'actualités et d'informations.";

  return (
    <footer className="w-full mt-16">
      {/* Top band with background image and overlay */}
      <div className="relative">
        <div className="absolute inset-0">
          <Image src="/camera-man.jpg" alt="Footer background" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center text-white">
          {/* Logo / Title */}
          <div className="flex items-center justify-center gap-3">
            <div className="relative h-16 w-16 flex-shrink-0">
              <Image src="/segelLogo.png" alt="Sigal Industries Logo" fill className="object-contain" />
            </div>
            <div className="text-xl sm:text-2xl font-extrabold tracking-wide uppercase">SIGAL INDUSTRIES</div>
          </div>

          {/* Description */}
          <p className="mt-6 max-w-3xl mx-auto text-sm sm:text-base text-white/85">
            {description}
          </p>

          {/* Contact */}
          <div className="mt-3 text-white/90">
            Contactez-nous : <a href="mailto: info@sigal-industries.fr" className="underline"> info@sigal-industries.fr</a>
          </div>

          {/* Social icons */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <a aria-label="Facebook" href="#" className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white"><path d="M15 3h-3a5 5 0 0 0-5 5v3H5v4h2v6h4v-6h3l1-4h-4V8a1 1 0 0 1 1-1h3V3z" fill="currentColor" /></svg>
            </a>
            <a aria-label="X" href="#" className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white"><path d="M17.5 3.5L3.5 17.5M3.5 3.5l14 14" stroke="currentColor" strokeWidth="2" /></svg>
            </a>
            <a aria-label="Instagram" href="#" className="w-9 h-9 flex items-center justify-center bg-white/10 hover:bg-white/20 transition">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" /><circle cx="17" cy="7" r="1" fill="currentColor" /></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom band with copyright and links */}
      <div className="bg-black text-white/90">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-xs sm:text-sm text-center md:text-left">© 2026 Sigal Industries. Tous droits réservés.</div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs sm:text-sm text-white/80">
            <a href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="/politique-de-confidentialite" className="hover:text-white transition-colors">Confidentialité</a>
            <a href="/politique-de-cookies" className="hover:text-white transition-colors">Cookies</a>
            <a href="/cgu" className="hover:text-white transition-colors">CGU</a>
            <a href="/avertissement" className="hover:text-white transition-colors">Avertissement</a>
            <a href="/a-propos" className="hover:text-white transition-colors">À propos</a>
            <a href="/contact" className="hover:text-white transition-colors">Contact</a>
            <a href="/charte-editoriale" className="hover:text-white transition-colors">Charte éditoriale</a>
            <a href="/faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}