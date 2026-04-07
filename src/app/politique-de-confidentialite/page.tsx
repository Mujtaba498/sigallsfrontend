import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Politique de confidentialité - Sigal Industries",
    description: "Politique de confidentialité de Sigal Industries.",
};

export default function PolitiqueConfidentialite() {
    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Politique de confidentialité</h1>
            <p className="mb-4 text-sm text-gray-500">Dernière mise à jour : 11 février 2026</p>

            <div className="space-y-6">
                <section>
                    <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
                    <p>Le site https://sigal-industries.fr accorde une importance particulière à la protection de vos données personnelles.</p>
                    <p>La présente politique explique quelles données sont collectées, comment elles sont utilisées et vos droits conformément au RGPD.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">2. Données collectées</h2>
                    <p>Nous collectons uniquement :</p>
                    <ul className="list-disc list-inside ml-4">
                        <li>Adresse e-mail (via formulaire de contact ou demande d’information)</li>
                    </ul>
                    <p className="mt-2">Nous ne collectons pas directement :</p>
                    <ul className="list-disc list-inside ml-4">
                        <li>Nom</li>
                        <li>Adresse postale</li>
                        <li>Numéro de téléphone</li>
                        <li>Données sensibles</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">3. Utilisation des données</h2>
                    <p>Les adresses e-mail sont utilisées uniquement pour :</p>
                    <ul className="list-disc list-inside ml-4">
                        <li>Répondre à vos demandes</li>
                        <li>Vous envoyer des informations liées à nos services (si vous y avez consenti)</li>
                    </ul>
                    <p className="mt-2">Nous ne vendons ni ne louons vos données à des tiers.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">4. Cookies et services tiers</h2>
                    <p>Le site peut utiliser :</p>
                    <ul className="list-disc list-inside ml-4">
                        <li>Cookies techniques (fonctionnement du site)</li>
                        <li>Cookies analytiques (statistiques de fréquentation)</li>
                    </ul>
                    <p className="mt-2">Aucune publicité intrusive ou revente de données n’est effectuée.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">5. Base légale du traitement</h2>
                    <p>Conformément au RGPD, le traitement repose sur :</p>
                    <ul className="list-disc list-inside ml-4">
                        <li>Votre consentement</li>
                        <li>Notre intérêt légitime (sécurité, amélioration du site)</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">6. Conservation des données</h2>
                    <p>Les données sont conservées uniquement le temps nécessaire au traitement de votre demande.</p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">7. Vos droits</h2>
                    <p>Vous disposez des droits suivants :</p>
                    <ul className="list-disc list-inside ml-4">
                        <li>Droit d’accès</li>
                        <li>Droit de rectification</li>
                        <li>Droit d’effacement</li>
                        <li>Droit d’opposition</li>
                        <li>Droit de retrait du consentement</li>
                    </ul>
                    <p className="mt-2">
                        Pour exercer vos droits : <a href="mailto:info@sigal-industries.fr" className="text-blue-600 hover:underline">info@sigal-industries.fr</a>
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold mb-2">8. Sécurité</h2>
                    <p>Nous mettons en œuvre des mesures techniques et organisationnelles adaptées pour protéger vos données.</p>
                </section>
            </div>
        </main>
    );
}
