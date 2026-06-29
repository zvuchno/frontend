import { type NextRequest, NextResponse } from "next/server";

import { buildStoreApiUrl } from "../../utils";

async function proxyCartRequest(request: NextRequest, slug: string[] = []) {
  const targetPath = `/v1/store/cart/${slug.join("/")}${request.nextUrl.search}`;
  const headers = new Headers();

  const authorizationHeader = request.headers.get("authorization");
  const cookieHeader = request.headers.get("cookie");
  const contentTypeHeader = request.headers.get("content-type");

  if (authorizationHeader) {
    headers.set("Authorization", authorizationHeader);
  }

  if (cookieHeader) {
    headers.set("Cookie", cookieHeader);
  }

  if (contentTypeHeader) {
    headers.set("Content-Type", contentTypeHeader);
  }

  const body = request.method !== "GET" && request.method !== "HEAD"
    ? await request.text()
    : undefined;

  const response = await fetch(buildStoreApiUrl(targetPath), {
    method: request.method,
    headers,
    body,
    cache: "no-store",
    credentials: "include",
  });

  const responseBody = await response.text();
  const nextResponse = new NextResponse(responseBody, {
    status: response.status,
    headers: {
      "Content-Type": response.headers.get("content-type") ?? "application/json",
    },
  });

  const setCookieHeaders = response.headers.getSetCookie?.() ?? [];

  for (const cookie of setCookieHeaders) {
    nextResponse.headers.append("set-cookie", cookie);
  }

  return nextResponse;
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params;
  return proxyCartRequest(request, slug);
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params;
  return proxyCartRequest(request, slug);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params;
  return proxyCartRequest(request, slug);
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug = [] } = await params;
  return proxyCartRequest(request, slug);
}
