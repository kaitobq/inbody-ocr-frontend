import type { Body, Req, RespConvert } from "types/fetcher"

const API_BASE_URL = "http://localhost:8080/api"

export const fetcher = () => {
  const fetchJSON = async <T, U = T>(req: Req, convert?: RespConvert<T, U>) => {
    const method = req.method
    const headers = req.header || {}
    headers["Content-Type"] = "application/json"
    const body = (() => {
      if (req.method === "POST" || req.method === "PUT") {
        return makeBody(req.body)
      }
      return undefined
    })()

    const res = await fetch(`${API_BASE_URL + req.path}`, {
      method: method,
      headers: headers,
      body: body,
    })
      .then((res) => res.text())
      .then((text) => {
        const data = JSON.parse(text)
        const converted = convert ? convert(data) : (data as U)
        return converted
      })

    return res
  }

  // const fetchFormData

  return {
    fetchJSON,
  }
}

const makeBody = (param: Body): string => {
  if (param === undefined) {
    return JSON.stringify({})
  }

  const key = Object.keys(param)
  if (key.length === 0) {
    return JSON.stringify({})
  }

  return JSON.stringify(param)
}
