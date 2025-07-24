import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect()
  }
})

export const config = {
  matcher: [
    // Match all routes including server actions, but skip static files
    '/((?!.*\\.(?:ico|png|svg|jpg|jpeg|gif|webp|css|js|woff|woff2|ttf)$|_next).*)',
  ],
} 