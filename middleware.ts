// import createMiddleware from 'next-intl/middleware';
// import {
//   clerkMiddleware,
//   createRouteMatcher,
// } from '@clerk/nextjs/server';

// const intlMiddleware = createMiddleware({
//   locales: ['pt', 'en'],
//   defaultLocale: 'en',
// });

// const isProtectedRoute = createRouteMatcher([
//   '/:locale/dashboard(.*)',
//   '/dashboard'
// ]);

// export default clerkMiddleware((auth, req) => {
//   console.log("req.url", req.url);
//   if (isProtectedRoute(req)) auth.protect();

//   return intlMiddleware(req);
// });

// export const config = {
//   // Match only internationalized pathnames
//   matcher: ['/', '/(pt|en)/:path*'],
// };

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import createMiddleware from 'next-intl/middleware'

const intlMiddleware = createMiddleware({
  locales: ['pt', 'en'],
  defaultLocale: 'en',
});

const isProtectedRoute = createRouteMatcher([
  '/app(.*)',
  '/:locale/app(.*)',
  '/api(.*)',
  '/:locale/api(.*)',
]);


export default clerkMiddleware(async (auth, req) => {
if (isProtectedRoute(req)) {
        const locale
          = req.nextUrl.pathname.match(/(\/.*)\/dashboard/)?.at(1) ?? '';

        const signInUrl = new URL(`${locale}/sign-in`, req.url);

        auth.protect({
          // `unauthenticatedUrl` is needed to avoid error: "Unable to find `next-intl` locale because the middleware didn't run on this request"
          unauthenticatedUrl: signInUrl.toString(),
        });
      }


  return intlMiddleware(req)
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}