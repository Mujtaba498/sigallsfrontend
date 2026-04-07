import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Conditions générales d’utilisation - Sigal Industries",
    description: "Conditions générales d’utilisation du site Sigal Industries.",
};

export default function CGU() {
    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Conditions générales d’utilisation</h1>
            <p className="mb-4 text-sm text-gray-500">Dernière mise à jour : 11 février 2026</p>

            <div className="space-y-6">
                <section>
                    <h2 className="text-xl font-semibold mb-2">Objet</h2>
                    <p>Les présentes CGU définissent les conditions d’utilisation du site https://sigal-industries.fr.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Accès au site</h2>
                    <p>Le site est accessible gratuitement.</p>
                    <p>Sigal-Industries se réserve le droit de modifier ou suspendre l’accès sans préavis.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Responsabilités</h2>
                    <p>L’éditeur ne saurait être tenu responsable des interruptions ou erreurs techniques.</p>
                    <p>L’utilisateur est responsable de l’usage qu’il fait des informations.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Propriété intellectuelle</h2>
                    <p>Les contenus sont protégés par le droit d’auteur.</p>
                    <p>Toute reproduction non autorisée est interdite.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Données personnelles</h2>
                    <p>L’utilisation du site implique l’acceptation de la Politique de confidentialité.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Droit applicable</h2>
                    <p>Les présentes CGU sont régies par le droit français.</p>
                </section>
            </div>
        </main>
    );
}
