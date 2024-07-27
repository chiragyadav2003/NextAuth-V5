import authConfig from "@/auth.config";
import NextAuth, { Session } from "next-auth";

import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT
} from "@/routes"
import { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req: NextRequest & { auth: Session | null }): Response | void => {
  // const isLoggedIn = !!req.auth;
  // console.log("ROUTE :", req.nextUrl.pathname)
  // console.log("URL :", req.nextUrl)
  // console.log("is logged in ", isLoggedIn)

  const { nextUrl } = req;
  const isLoggedIn = !!req.auth; //convert to boolean

  /**
   * always allow user to visit this api route, it is required for next auth to work properly
   * e.g : 'api/auth/providers' is needed to work always for next-auth to work properly
   */
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

  const isAuthRoute = authRoutes.includes(nextUrl.pathname)


  if (isApiAuthRoute) {
    return;
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/auth/login', nextUrl));
  }

  return;
})


export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}; 