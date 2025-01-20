import createMiddleware from 'next-intl/middleware';
import {
  clerkMiddleware,
  createRouteMatcher,
} from '@clerk/nextjs/server';

const intlMiddleware = createMiddleware({
  locales: ['pt', 'en'],
  defaultLocale: 'en'
});

const isProtectedRoute = createRouteMatcher([
  '/:locale/dashboard(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth.protect();

  return intlMiddleware(req);
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(pt|en)/:path*'],
};