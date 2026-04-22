import { NextResponse } from "next/server";
import { getSeoData } from "@/services/api";
import { parseSeoHead } from "@/services/seoHead";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ file: string }> }
) {
  const { file } = await params;
  const seoData = await getSeoData();
  const { verificationFiles } = parseSeoHead(seoData?.headerScripts);

  const verificationFile = verificationFiles.find(
    (entry) => entry.path === file
  );

  if (!verificationFile) {
    return new NextResponse("Not Found", { status: 404 });
  }

  return new NextResponse(verificationFile.content, {
    headers: {
      "Cache-Control": "no-store",
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}
