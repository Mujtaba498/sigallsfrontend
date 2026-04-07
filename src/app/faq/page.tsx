import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "FAQ / Aide - Sigal Industries",
    description: "Foire aux questions de Sigal Industries.",
};

export default function FAQ() {
    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">FAQ / Aide</h1>

            <div className="space-y-6">
                <section>
                    <h2 className="text-xl font-semibold mb-2">Comment contacter Sigal-Industries ?</h2>
                    <p>Vous pouvez nous écrire à <a href="mailto:info@sigal-industries.fr" className="text-blue-600 hover:underline">info@sigal-industries.fr</a> ou utiliser le formulaire de contact.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Le site est-il gratuit ?</h2>
                    <p>Oui, l’accès au site est entièrement gratuit.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Comment gérer mes cookies ?</h2>
                    <p>Vous pouvez modifier vos préférences via la bannière de consentement ou les paramètres de votre navigateur.</p>
                </section>
            </div>
        </main>
    );
}
