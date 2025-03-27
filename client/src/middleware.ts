import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const jwt = request.cookies.get("jwt")?.value;
    const { pathname } = request.nextUrl;

    const isAuthPage = pathname === "/signin" || pathname === "/signup";
    const isProtected = pathname === "/" || pathname.startsWith("/dashboard");


    if (!jwt && isProtected) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    if (jwt && isAuthPage) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/dashboard/:path*", "/signin", "/signup"],
};
