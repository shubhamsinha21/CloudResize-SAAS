import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in",
  "/sign-up",
  "/",
  "/home",
]);

const isPublicApiRoute = createRouteMatcher(["/api/videos"]);

export default clerkMiddleware((auth, req) => {
  // accesing userId
  const { userId } = auth();
  // current Url from req | 2nd parameter
  const currentUrl = new URL(req.url);
  // check isAccess Home | dashboard
  const isAccessingHome = currentUrl.pathname === "/home";
  // check whether it is an api req or home
  const isApiRequest = currentUrl.pathname.startsWith("/api");

  // check user logged in and req of isPublicRoute + not accessing dashboard
  if (userId && isPublicRoute(req) && !isAccessingHome) {
    // redirecting to home using next js NextResponse
    return NextResponse.redirect(new URL("/home", req.url));
  }

  //   check user not logged in
  if (!userId) {
    // not logged in and trying to access protected route, (requested for it + it also both a public api)
    if (!isPublicRoute(req) && !isPublicApiRoute(req)) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }

    // if the user request for a protected API  and the user is not logged in
    if (isApiRequest && !isPublicApiRoute(req)) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }

  //   requests keeps on forwarding
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
