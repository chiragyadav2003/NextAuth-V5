/**
 * An array of routes that is accessible to public
 * These route do not require authentication
 * @type {string[]}
 */

export const publicRoutes = ['/', '/auth/new-verification'];

/**
 * Array of routes used for authentication
 * these routes will redirect logged in user to "/settings" route
 * @type {string[]}
 */
export const authRoutes = ['/auth/login', '/auth/register', '/auth/error', '/auth/reset'];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * Default redirect path for Logging in
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = '/settings';
