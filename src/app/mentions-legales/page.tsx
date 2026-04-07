import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Mentions Légales - Sigal Industries",
    description: "Mentions légales de Sigal Industries.",
};

export default function MentionsLegales() {
    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Mentions légales</h1>
            <p className="mb-4 text-sm text-gray-500">Dernière mise à jour : 11 février 2026</p>

            <div className="space-y-6">
                <section>
                    <h2 className="text-xl font-semibold mb-2">Éditeur du site</h2>
                    <p>Le site https://sigal-industries.fr est édité par :</p>
                    <ul className="list-none mt-2 space-y-1">
                        <li><strong>Nom / Raison sociale :</strong> Sigal-Industries</li>
                        <li><strong>Adresse :</strong> 25 Avenue des Champs-Élysées, 75008 Paris, France</li>
                        <li><strong>Téléphone :</strong> +33 1 84 80 45 62</li>
                        <li><strong>Email :</strong> info@sigal-industries.fr</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Directeur de publication</h2>
                    <p>Jean Dupont</p>
                    <p>Claire Morel</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Hébergeur</h2>
                    <p>Le site est hébergé par :</p>
                    <ul className="list-none mt-2 space-y-1">
                        <li><strong>Hetzner Online GmbH</strong></li>
                        <li><strong>Adresse :</strong> Industriestr. 25, 91710 Gunzenhausen, Allemagne</li>
                        <li><strong>Téléphone :</strong> +49 (0)9831 505-0</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Propriété intellectuelle</h2>
                    <p>Tous les contenus (textes, images, vidéos, logos, éléments graphiques) sont protégés par le droit d’auteur et la propriété intellectuelle.</p>
                    <p>Toute reproduction, distribution ou modification sans autorisation écrite est strictement interdite.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">Responsabilité</h2>
                    <p>Sigal-Industries s’efforce de fournir des informations exactes et mises à jour. Toutefois, nous ne pouvons garantir l’absence d’erreurs ou d’omissions.</p>
                </section>
            </div>
        </main>
    );
}
