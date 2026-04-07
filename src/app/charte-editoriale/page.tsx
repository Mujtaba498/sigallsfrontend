import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Charte éditoriale - Sigal Industries",
    description: "Charte éditoriale de Sigal Industries.",
};

export default function CharteEditoriale() {
    return (
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold mb-8">Charte éditoriale</h1>

            <div className="space-y-6">
                <p>Sigal-Industries s’engage à respecter :</p>
                <ul className="list-disc list-inside ml-4 space-y-2">
                    <li>Exactitude des informations</li>
                    <li>Transparence commerciale</li>
                    <li>Respect des partenaires et clients</li>
                    <li>Mise à jour régulière des contenus</li>
                </ul>
            </div>
        </main>
    );
}
