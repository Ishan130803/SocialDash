// import type { User} from 'next-auth'
type UserId = string
import { type DefaultJWT } from "next-auth/jwt"
declare module 'next-auth/jwt' {
  interface JWT extends Record<string, unknown>,DefaultJWT  {
    id ?: string
  } 
}



declare module 'next-auth' {
  interface Session {
    user : User & {
      id : string
    }
  }
}