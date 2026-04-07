import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <h1 className="text-6xl font-black text-zinc-900 mb-4">404</h1>
            <h2 className="text-2xl font-bold text-zinc-800 mb-6">Page Non Trouvée</h2>
            <p className="text-zinc-600 max-w-md mb-8">
                La page que vous recherchez n{"'"}existe pas ou a été déplacée.
            </p>
            <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-700 transition-colors"
            >
                <MoveLeft className="w-4 h-4" />
                Retour à l{"'"}accueil
            </Link>
        </div>
    );
}
