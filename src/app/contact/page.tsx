import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact - Sigal Industries",
    description: "Contactez Sigal Industries.",
};

export default function Contact() {
    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Contact</h1>

            <div className="space-y-6">
                <p>Vous pouvez nous contacter via :</p>
                <ul className="list-none space-y-2 mt-4">
                    <li>📧 <strong>Email :</strong> <a href="mailto:info@sigal-industries.fr" className="text-blue-600 hover:underline">info@sigal-industries.fr</a></li>
                    <li>📍 <strong>Adresse :</strong> 25 Avenue des Champs-Élysées, 75008 Paris, France</li>
                    <li>📞 <strong>Téléphone :</strong> +33 1 84 80 45 62</li>
                </ul>
                <p className="mt-4">Ou via le formulaire de contact disponible sur le site.</p>
            </div>
        </main>
    );
}
