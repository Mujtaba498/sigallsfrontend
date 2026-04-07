import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Avertissement - Sigal Industries",
    description: "Avertissement concernant l'utilisation du site Sigal Industries.",
};

export default function Avertissement() {
    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Avertissement / Disclaimer</h1>

            <div className="space-y-6">
                <p>Les informations publiées sur https://sigal-industries.fr sont fournies à titre informatif concernant nos services industriels et solutions professionnelles.</p>
                <p>Sigal-Industries ne peut être tenu responsable de l’utilisation faite des informations disponibles sur le site.</p>
            </div>
        </main>
    );
}
