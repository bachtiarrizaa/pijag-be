import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { UserRepository } from '../repositories/user.repository'
import { RoleRepository } from '../repositories/role.repository'
import { CustomerRepository } from '../repositories/customer.repository'
import type { RequestHandler } from 'express'
import { CUSTOMER_ROLE_NAME } from '../constants/role.constants'

export class PassportConfig {
  static init() {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            const email = profile.emails?.[0]?.value
            const name = profile.displayName

            if (!email) {
              return done(new Error('No email from Google'), false)
            }

            const existingUser = await UserRepository.findByEmail(email)

            if (existingUser) {
              return done(null, {
                userId: existingUser.id,
                roleId: existingUser.role.id,
                roleName: existingUser.role.name,
              })
            }

            const role = await RoleRepository.findRoleByName(CUSTOMER_ROLE_NAME)
            if (!role) {
              return done(new Error('Customer role not found'), false)
            }

            const username =
              email.split('@')[0] + '_' + Math.random().toString().slice(2, 4)

            const newUser = await UserRepository.createOAuthUser({
              name,
              username,
              email,
              roleId: role.id,
            })
            await CustomerRepository.create(newUser.id)

            return done(null, {
              userId: newUser.id,
              roleId: role.id,
              roleName: role.name,
            })
          } catch (error) {
            return done(error, false)
          }
        }
      )
    )
  }

  static googleAuth(): RequestHandler {
    return passport.authenticate('google', {
      scope: ['profile', 'email'],
      session: false,
    })
  }

  static googleCallback(): RequestHandler {
    return passport.authenticate('google', {
      session: false,
      failureRedirect: `${process.env.FRONTEND_URL}/login?error=google_auth_failed`,
    })
  }
}
