import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "À propos - Sigal Industries",
    description: "En savoir plus sur Sigal Industries.",
};

export default function APropos() {
    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">À propos</h1>

            <div className="space-y-6">
                <section>
                    <p>Bienvenue sur https://sigal-industries.fr</p>
                    <p className="mt-2">Sigal-Industries est une entreprise spécialisée dans les solutions industrielles, la fabrication et les services techniques destinés aux professionnels et aux entreprises.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Notre équipe</h2>
                    <ul className="list-disc list-inside ml-4">
                        <li>Pierre Martin – Directeur Général</li>
                        <li>Sophie Laurent – Directrice des Opérations</li>
                        <li>Thomas Bernard – Responsable Technique</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Nos valeurs</h2>
                    <ul className="list-disc list-inside ml-4">
                        <li>Qualité</li>
                        <li>Innovation</li>
                        <li>Fiabilité</li>
                        <li>Engagement client</li>
                    </ul>
                </section>
            </div>
        </main>
    );
}
