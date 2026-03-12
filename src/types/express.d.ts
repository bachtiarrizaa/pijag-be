import type { JwtPayload } from './config'

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}

// declare global {
//   namespace Express {
//     interface Request {
//       user?: {
//         userId: string
//         roleId: string
//         roleName: string
//         exp?: number
//       }
//     }
//   }
// }

// export {}
