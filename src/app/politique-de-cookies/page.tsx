import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Politique de cookies - Sigal Industries",
    description: "Politique de cookies de Sigal Industries.",
};

export default function PolitiqueCookies() {
    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Politique de cookies</h1>
            <p className="mb-4 text-sm text-gray-500">Dernière mise à jour : 11 février 2026</p>

            <div className="space-y-6">
                <section>
                    <h2 className="text-xl font-semibold mb-2">Utilisation des cookies</h2>
                    <p>Le site https://sigal-industries.fr utilise des cookies pour :</p>
                    <ul className="list-disc list-inside ml-4">
                        <li>Assurer le bon fonctionnement du site</li>
                        <li>Améliorer l’expérience utilisateur</li>
                        <li>Mesurer l’audience</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Types de cookies</h2>
                    <ul className="list-disc list-inside ml-4">
                        <li>Cookies essentiels</li>
                        <li>Cookies analytiques</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Consentement</h2>
                    <p>Lors de votre première visite, une bannière vous permet d’accepter ou de refuser les cookies.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Gestion</h2>
                    <p>Vous pouvez modifier vos préférences à tout moment via votre navigateur.</p>
                </section>
            </div>
        </main>
    );
}
