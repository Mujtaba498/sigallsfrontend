import { NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type RouteParams = { params: Promise<{ path: string[] }> };

export async function GET(_request: Request, { params }: RouteParams) {
  const { path } = await params;
  const requestedFile = path?.join("/");

  if (!requestedFile || !API_BASE_URL) {
    return new NextResponse("Not Found", { status: 404 });
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/seo`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return new NextResponse("Verification file not found", { status: 404 });
    }

    const json = await response.json();
    const headerScripts = json?.data?.headerScripts || "";

    const verifyRegex =
      /(?:verficationUrl|verificationUrl)=(["'])(.*?)\1\s*,\s*contentFile=(["'])(.*?)\3/g;

    let match;
    while ((match = verifyRegex.exec(headerScripts)) !== null) {
      const url = match[2].replace(/^\/+/, "");
      const content = match[4];

      if (requestedFile === url) {
        const isHtml = url.endsWith(".html");
        return new NextResponse(content, {
          status: 200,
          headers: {
            "Cache-Control": "no-store",
            "Content-Type": isHtml
              ? "text/html; charset=utf-8"
              : "text/plain; charset=utf-8",
          },
        });
      }
    }

    return new NextResponse("Verification file not found", { status: 404 });
  } catch (error) {
    console.error("[Verification API] Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
