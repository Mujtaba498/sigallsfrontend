import { NextResponse } from "next/server";

export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!baseUrl) {
        return new NextResponse("API URL not configured", { status: 500 });
    }

    try {
        const res = await fetch(`${baseUrl}/api/sitemap/bnews.xml`, {
            cache: "no-store",
        });

        if (!res.ok) {
            return new NextResponse(`Failed to fetch sitemap: ${res.statusText}`, { status: res.status });
        }

        let xml = await res.text();

        // Remove the XSL stylesheet reference if it causes issues (white page due to missing file)
        // The user wants to see the raw XML tree, which browsers show by default when no style is present.
        xml = xml.replace(/<\?xml-stylesheet.*?\?>/g, "");

        return new NextResponse(xml, {
            headers: {
                "Content-Type": "text/xml",
                "Cache-Control": "public, max-age=3600, s-maxage=3600",
            },
        });
    } catch (error) {
        console.error("Error fetching sitemap:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
