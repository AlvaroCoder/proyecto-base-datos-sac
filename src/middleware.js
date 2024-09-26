import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./authentication/lib";

export default async function middleware(request = NextRequest) {
  const session = await getSession();
    
  if (session !== null && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/dashboard/libros', request.url));
  }
  
  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next(); 
}

export const config = {
  matcher: ['/login', '/dashboard/:path*'],
};