type ScriptCrossOrigin = "" | "anonymous" | "use-credentials";

type ParsedHeaderScript = {
  key: string;
  content?: string;
  crossOrigin?: ScriptCrossOrigin;
  id?: string;
  isAsync?: boolean;
  src?: string;
};

const VALID_CROSS_ORIGIN = new Set<ScriptCrossOrigin>([
  "",
  "anonymous",
  "use-credentials",
]);

function parseAttributes(source: string) {
  const attributes: Omit<ParsedHeaderScript, "content" | "key"> = {};
  const attributePattern =
    /([A-Za-z][\w:-]*)(?:=(?:"([^"]*)"|'([^']*)'))?/g;

  for (const match of source.matchAll(attributePattern)) {
    const name = match[1];
    const value = match[2] ?? match[3] ?? "";

    switch (name) {
      case "async":
        attributes.isAsync = true;
        break;
      case "crossorigin":
      case "crossOrigin":
        if (VALID_CROSS_ORIGIN.has(value as ScriptCrossOrigin)) {
          attributes.crossOrigin = value as ScriptCrossOrigin;
        }
        break;
      case "id":
        attributes.id = value;
        break;
      case "src":
        attributes.src = value;
        break;
      default:
        break;
    }
  }

  return attributes;
}

function normalizeScriptContent(source: string) {
  const trimmed = source.trim();
  const templateLiteralMatch = trimmed.match(/^\{`([\s\S]*)`\}$/);

  if (templateLiteralMatch) {
    return templateLiteralMatch[1].trim();
  }

  const expressionMatch = trimmed.match(/^\{([\s\S]*)\}$/);

  if (expressionMatch) {
    return expressionMatch[1].trim();
  }

  return trimmed;
}

function parseHeaderScripts(markup?: string | null): ParsedHeaderScript[] {
  if (!markup?.trim()) {
    return [];
  }

  const scripts: ParsedHeaderScript[] = [];
  const scriptPattern =
    /<(?:Script|script)\b([\s\S]*?)(?:\/>|>([\s\S]*?)<\/(?:Script|script)>)/g;

  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = scriptPattern.exec(markup)) !== null) {
    const attributes = parseAttributes(match[1]);
    const content = match[2]
      ? normalizeScriptContent(match[2])
      : undefined;
    const id =
      attributes.id ??
      (!attributes.src && content ? `seo-header-script-${index}` : undefined);

    scripts.push({
      ...attributes,
      content,
      id,
      key: id ?? attributes.src ?? `seo-header-script-${index}`,
    });

    index += 1;
  }

  return scripts;
}

export default function HeaderScripts({
  scripts,
}: {
  scripts?: string | null;
}) {
  const parsedScripts = parseHeaderScripts(scripts);

  if (parsedScripts.length === 0) {
    return null;
  }

  return (
    <>
      {parsedScripts.map((script) => {
        if (script.src) {
          return (
            <script
              key={script.key}
              id={script.id}
              src={script.src}
              async={script.isAsync}
              crossOrigin={script.crossOrigin}
            />
          );
        }

        if (!script.content) {
          return null;
        }

        return (
          <script
            key={script.key}
            id={script.id ?? script.key}
            dangerouslySetInnerHTML={{ __html: script.content }}
          />
        );
      })}
    </>
  );
}
