"use server";

import { cookies } from "next/headers";

export const useCookie = () => {
    const setCookie = async (key: string, value: string) => {
        cookies().set(key, value, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          sameSite: "strict",
        });
      };
      
      const getCookie = async (key: string) => {
        const cookieStore = cookies();
        const cookie = cookieStore.get(key);
        return cookie ? cookie.value : null;
      };
      
      const deleteCookie = async (key: string) => {
        const cookieStore = cookies();
        cookieStore.delete(key);
      };

    return {
        setCookie,
        getCookie,
        deleteCookie
    }
}
