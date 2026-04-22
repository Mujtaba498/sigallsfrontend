type ScriptCrossOrigin = "" | "anonymous" | "use-credentials";
type ScriptStrategy =
  | "beforeInteractive"
  | "afterInteractive"
  | "lazyOnload"
  | "worker";

type ParsedSeoScript = {
  type: "script";
  key: string;
  content?: string;
  crossOrigin?: ScriptCrossOrigin;
  id?: string;
  isAsync?: boolean;
  src?: string;
  strategy?: ScriptStrategy;
};

type ParsedSeoMeta = {
  type: "meta";
  key: string;
  attributes: Record<string, string>;
};

type ParsedSeoLink = {
  type: "link";
  key: string;
  attributes: Record<string, string>;
};

export type ParsedSeoHeadEntry =
  | ParsedSeoScript
  | ParsedSeoMeta
  | ParsedSeoLink;

export type ParsedVerificationFile = {
  content: string;
  path: string;
};

const VALID_CROSS_ORIGIN = new Set<ScriptCrossOrigin>([
  "",
  "anonymous",
  "use-credentials",
]);

const VALID_SCRIPT_STRATEGIES = new Set<ScriptStrategy>([
  "beforeInteractive",
  "afterInteractive",
  "lazyOnload",
  "worker",
]);

const SCRIPT_PATTERN =
  /<(?:Script|script)\b([\s\S]*?)(?:\/>|>([\s\S]*?)<\/(?:Script|script)>)/g;
const META_PATTERN = /<meta\b([\s\S]*?)\/?>/gi;
const LINK_PATTERN = /<link\b([\s\S]*?)\/?>/gi;

function normalizeAttributeName(name: string) {
  switch (name.toLowerCase()) {
    case "crossorigin":
      return "crossOrigin";
    case "http-equiv":
      return "httpEquiv";
    case "charset":
      return "charSet";
    case "referrerpolicy":
      return "referrerPolicy";
    case "itemprop":
      return "itemProp";
    default:
      return name;
  }
}

function parseAttributes(source: string) {
  const attributes: Record<string, string> = {};
  const attributePattern =
    /([A-Za-z][\w:-]*)(?:=(?:"([^"]*)"|'([^']*)'))?/g;

  for (const match of source.matchAll(attributePattern)) {
    const rawName = match[1];
    const value = match[2] ?? match[3] ?? "";
    const name = normalizeAttributeName(rawName);
    attributes[name] = value;
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

function stripKnownHeadTags(markup: string) {
  return markup
    .replace(SCRIPT_PATTERN, " ")
    .replace(META_PATTERN, " ")
    .replace(LINK_PATTERN, " ");
}

function parseVerificationFiles(markup?: string | null): ParsedVerificationFile[] {
  if (!markup?.trim()) {
    return [];
  }

  const verificationFiles: ParsedVerificationFile[] = [];
  const lines = stripKnownHeadTags(markup)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  let pendingContent: string | null = null;

  for (const line of lines) {
    try {
      const url = new URL(line);
      const path = url.pathname.replace(/^\/+/, "");

      if (pendingContent && path.endsWith(".html")) {
        verificationFiles.push({
          content: pendingContent,
          path,
        });
        pendingContent = null;
      }
    } catch {
      pendingContent = line;
    }
  }

  return verificationFiles;
}

export function parseSeoHead(markup?: string | null) {
  const entries: ParsedSeoHeadEntry[] = [];

  if (!markup?.trim()) {
    return {
      entries,
      verificationFiles: [],
    };
  }

  let match: RegExpExecArray | null;
  let index = 0;

  SCRIPT_PATTERN.lastIndex = 0;
  while ((match = SCRIPT_PATTERN.exec(markup)) !== null) {
    const attributes = parseAttributes(match[1]);
    const strategy = attributes.strategy;
    const crossOrigin = attributes.crossOrigin;
    const src = attributes.src;
    const content = match[2]
      ? normalizeScriptContent(match[2])
      : undefined;
    const id =
      attributes.id ??
      (!src && content ? `seo-head-script-${index}` : undefined);

    entries.push({
      type: "script",
      content,
      crossOrigin: VALID_CROSS_ORIGIN.has(crossOrigin as ScriptCrossOrigin)
        ? (crossOrigin as ScriptCrossOrigin)
        : undefined,
      id,
      isAsync: Object.prototype.hasOwnProperty.call(attributes, "async"),
      key: id ?? src ?? `seo-head-script-${index}`,
      src,
      strategy: VALID_SCRIPT_STRATEGIES.has(strategy as ScriptStrategy)
        ? (strategy as ScriptStrategy)
        : undefined,
    });

    index += 1;
  }

  META_PATTERN.lastIndex = 0;
  while ((match = META_PATTERN.exec(markup)) !== null) {
    const attributes = parseAttributes(match[1]);

    entries.push({
      type: "meta",
      attributes,
      key:
        attributes.id ??
        attributes.name ??
        attributes.property ??
        `seo-head-meta-${index}`,
    });

    index += 1;
  }

  LINK_PATTERN.lastIndex = 0;
  while ((match = LINK_PATTERN.exec(markup)) !== null) {
    const attributes = parseAttributes(match[1]);

    entries.push({
      type: "link",
      attributes,
      key:
        attributes.id ??
        attributes.href ??
        attributes.rel ??
        `seo-head-link-${index}`,
    });

    index += 1;
  }

  return {
    entries,
    verificationFiles: parseVerificationFiles(markup),
  };
}
