"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);
    const [animateOut, setAnimateOut] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie_consent");
        if (!consent) {
            // Small delay so it slides in after page load
            const timer = setTimeout(() => setVisible(true), 500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleConsent = (choice: "accepted" | "refused") => {
        setAnimateOut(true);
        setTimeout(() => {
            localStorage.setItem("cookie_consent", choice);
            setVisible(false);
        }, 400);
    };

    if (!visible) return null;

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-[9999] transition-transform duration-500 ease-out ${animateOut ? "translate-y-full" : "translate-y-0"
                }`}
        >
            {/* Subtle top shadow */}
            <div className="bg-white border-t border-zinc-200 shadow-[0_-4px_24px_rgba(0,0,0,0.08)]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        {/* Icon + Text */}
                        <div className="flex items-start gap-3 flex-1">
                            <span className="text-2xl mt-0.5" aria-hidden="true">🍪</span>
                            <p className="text-sm text-zinc-700 leading-relaxed">
                                Nous utilisons des cookies pour améliorer votre expérience et analyser le trafic du site.
                                En cliquant sur « Accepter », vous consentez à l&apos;utilisation de tous les cookies.{" "}
                                <a
                                    href="/politique-de-cookies"
                                    className="text-red-600 font-medium underline underline-offset-2 hover:text-red-700 transition-colors"
                                >
                                    En savoir plus
                                </a>
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center gap-3 shrink-0">
                            <button
                                onClick={() => handleConsent("refused")}
                                className="px-5 py-2 text-sm font-medium text-zinc-600 bg-zinc-100 rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer"
                            >
                                Refuser
                            </button>
                            <button
                                onClick={() => handleConsent("accepted")}
                                className="px-5 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors shadow-sm cursor-pointer"
                            >
                                Accepter
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
