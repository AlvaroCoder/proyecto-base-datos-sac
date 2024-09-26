import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./authentication/lib";

export default async function middleware(request=NextRequest) {
  const session = await getSession();
  console.log(session);
  
  if (!session) {
    return NextResponse.redirect(
      new URL("/login",request.url)
    )
  }
  
  
  return NextResponse.next()
  
}
export const config={
  matcher : ["/dashboard/:path*"]
}