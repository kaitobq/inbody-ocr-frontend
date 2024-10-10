"use server";

import { cookies } from "next/headers";

export const setCookie = async (key: string, value: string) => {
  cookies().set(key, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
  });
};

export const getCookie = async (key: string) => {
  const cookieStore = cookies();
  const cookie = cookieStore.get(key);
  return cookie ? cookie.value : null;
};

export const deleteCookie = async (key: string) => {
  const cookieStore = cookies();
  cookieStore.delete(key);
};