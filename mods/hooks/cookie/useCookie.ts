"use server"

import { cookies } from "next/headers"

export const setCookie = async (key: string, value: string, expires?: Date) => {
  cookies().set(key, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
    expires: expires,
  })
}

export const getCookie = async (key: string) => {
  const cookieStore = cookies()
  const cookie = cookieStore.get(key)
  return cookie ? cookie.value : null
}

export const deleteCookie = async (key: string) => {
  const cookieStore = cookies()
  cookieStore.delete(key)
}
