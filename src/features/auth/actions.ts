"use server"

import { signIn } from "@/lib/auth"

export const nextAuthSignInAPI = async (provider : string) => {
  await signIn(provider)
  return {message : "Success"}
}