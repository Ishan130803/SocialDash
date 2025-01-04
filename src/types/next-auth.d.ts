import type { User} from 'next-auth'

type UserId = string

declare module 'next-auth/jwt' {
  interface JWT {
    id : UserId
    providerId : UserId
  }
}

declare module 'next-auth' {
  interface Session {
    user : User & {
      id : string
      providerId : string
    }
  }
}