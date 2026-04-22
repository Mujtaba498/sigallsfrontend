import Script from "next/script";
import { parseSeoHead } from "@/services/seoHead";

export default function HeaderScripts({
  scripts,
}: {
  scripts?: string | null;
}) {
  const { entries } = parseSeoHead(scripts);

  if (entries.length === 0) {
    return null;
  }

  return (
    <>
      {entries.map((entry) => {
        if (entry.type === "script") {
          if (entry.src) {
            return (
              <Script
                key={entry.key}
                id={entry.id}
                src={entry.src}
                async={entry.isAsync}
                crossOrigin={entry.crossOrigin}
                strategy={entry.strategy}
              />
            );
          }

          if (!entry.content) {
            return null;
          }

          return (
            <Script
              key={entry.key}
              id={entry.id ?? entry.key}
              strategy={entry.strategy}
              dangerouslySetInnerHTML={{ __html: entry.content }}
            />
          );
        }

        if (entry.type === "meta") {
          return <meta key={entry.key} {...(entry.attributes as Record<string, string>)} />;
        }

        return <link key={entry.key} {...(entry.attributes as Record<string, string>)} />;
      })}
    </>
  );
}
