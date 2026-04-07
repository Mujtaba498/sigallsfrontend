"use client";

import { useEffect } from "react";
import { RotateCw } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
            <h2 className="text-2xl font-bold text-zinc-800 mb-4">Une erreur s{"'"}est produite !</h2>
            <p className="text-zinc-600 mb-8 max-w-md">
                Nous n{"'"}avons pas pu charger cette page. Veuillez réessayer.
            </p>
            <button
                onClick={reset}
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white font-semibold rounded-md hover:bg-zinc-800 transition-colors"
            >
                <RotateCw className="w-4 h-4" />
                Réessayer
            </button>
        </div>
    );
}
