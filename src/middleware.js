import { NextRequest, NextResponse } from "next/server";
import { getSession, updateSession } from "./authentication/lib";
const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/'];

export default async function middleware(request=NextRequest) {
    const path = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path);
    const isPublicRoute = publicRoutes.includes(path);

    const session = await getSession()
    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if (
        isPublicRoute &&
        session?.userId &&
        !request.nextUrl.pathname.startsWith('/dashboard')
      ) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
      }
    return NextResponse.next();
}
