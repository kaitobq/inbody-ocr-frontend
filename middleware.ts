import { fetcher } from "mods/repositories/fetcher"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

type Resp = {
  verify: {
    status: number
    message: string
  }
}

const PUBLIC_PATHS = ["/signin", "/signup", "/"]

async function verifyToken(token: string) {
  const apiFetcher = fetcher()
  try {
    const response = await apiFetcher.fetchJSON<Resp["verify"]>({
      path: "/v1/user/authenticate",
      method: "POST",
      header: {
        Authorization: `Bearer ${token}`,
      },
      body: {},
    })
    return response.status === 200
  } catch (error) {
    return false
  }
}

export async function middleware(request: NextRequest) {
  const cookieStore = cookies()
  const token = (await cookieStore).get("token")
  const path = request.nextUrl.pathname

  if (PUBLIC_PATHS.includes(path)) {
    console.log("public path")
    return NextResponse.next()
  }

  if (!token) {
    console.log("no token")
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  const isValidToken = await verifyToken(token.value)
  if (!isValidToken) {
    console.log("invalid token")
    return NextResponse.redirect(new URL("/signin", request.url))
  }

  if (PUBLIC_PATHS.includes(path)) {
    console.log("valid token")
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
