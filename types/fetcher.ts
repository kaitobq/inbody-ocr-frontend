export type Req = {
  path: string
  method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH" | "OPTIONS"
  header?: Record<string, string>
  body?: Body
  accessToken?: string
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type Body = Record<string, any> | undefined

export type RespConvert<T, U = T> = (respData: T) => U
