/**
 *These route do not require authentication
 */

export const publicRoutes = ['/'];


/**
 *Array of routes used for authentication
 *these routes will redirect logged in user to "/settings" route
 */
export const authRoutes = ['/auth/login', '/auth/register'];


/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 */
export const apiAuthPrefix = '/api/auth';


/**
 * Default redirect path for Logging in
 */

export const DEFAULT_LOGIN_REDIRECT = '/settings';