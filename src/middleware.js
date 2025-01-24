import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./authentication/lib";
import jwt from 'jsonwebtoken'
export default async function middleware(request = NextRequest) {
  const session = await getSession();
  
  if (session !== null && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/dashboard/libros', request.url));
  }
  
  if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const restrictedIds = [5,6,7];
  
  const token_jwt = session?.user?.access_token;
  const decode_jwt = jwt.decode(token_jwt);
  const userID = decode_jwt?.role;

  if (restrictedIds.includes(userID) && request.nextUrl.pathname.startsWith('/dashboard/miembros')) {
    return NextResponse.redirect(new URL('/unauthorized',request.url));
  }

  return NextResponse.next(); 
}

export const config = {
  matcher: ['/login', '/dashboard/:path*'],
};