import { expressjwt } from 'express-jwt'

/**
 * Middleware to enforce authentication using JWT.
 * @constant
 * @type {import('express-jwt').RequestHandler}
 * @throws {UnauthorizedError} If the JWT is missing or invalid.
 */
export const requireAuth = expressjwt({
  secret: () => process.env.JWT_SECRET,
  algorithms: ['HS256'],
})
