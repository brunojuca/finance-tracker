import { match } from "@formatjs/intl-localematcher";
import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "../utils/i18n";

function parseAcceptLanguage(acceptLanguage: string | null): string[] {
  if (!acceptLanguage) return [];
  const langs = acceptLanguage.split(",").map((lang) => lang.split(";")[0]);
  return langs;
}

function getLocale(request: NextRequest) {
  const languages = parseAcceptLanguage(request.headers.get("Accept-Language"));
  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  console.log(locales);
  console.log(pathname);
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!api|_next/static|auth|images|_next/image|favicon.ico|robots.txt|sitemap.xml|sitemap-0.xml|server-sitemap.xml).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
