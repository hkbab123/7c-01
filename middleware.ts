import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Uncomment when NextAuth is configured:
  // const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  
  // For now, simulate role checking (replace with actual NextAuth logic)
  // const userRole = token?.role as 'admin' | 'user' | undefined;
  
  // Admin routes protection
  if (pathname.startsWith('/dashboard') && !pathname.startsWith('/(user)/dashboard')) {
    // if (!token || userRole !== 'admin') {
    //   return NextResponse.redirect(new URL('/auth/signin', request.url));
    // }
  }
  
  // User routes protection
  // if (pathname.startsWith('/(user)/dashboard')) {
  //   if (!token) {
  //     return NextResponse.redirect(new URL('/auth/signin', request.url));
  //   }
  // }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/(user)/dashboard/:path*', '/(admin)/dashboard/:path*'],
};
