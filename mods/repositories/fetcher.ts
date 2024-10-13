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
    const token = req?.accessToken || null
    if (token) {
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      headers["Authorization"] = `Bearer ${token}`
    }

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

  const fetchFormData = async <T, U = T>(
    req: Req,
    convert?: RespConvert<T, U>,
  ) => {
    const method = req.method
    const headers = req.header || {}
    const body = (() => {
      if (req.method === "POST" || req.method === "PUT") {
        return makeFormDataBody(req.body)
      }
      return undefined
    })()
    const token = req?.accessToken || null
    if (token) {
      // biome-ignore lint/complexity/useLiteralKeys: <explanation>
      headers["Authorization"] = `Bearer ${token}`
    }

    const res = await fetch(`${API_BASE_URL + req.path}`, {
      method: method,
      headers: headers,
      body: body,
    })

    const text = await res.text()
    if (res.ok) {
      if (text) {
        try {
          const data = JSON.parse(text)
          const converted = convert ? convert(data) : (data as U)
          return converted
        } catch (error) {
          console.error("JSONのパースに失敗しました:", error)
          throw error
        }
      } else {
        return null
      }
    } else {
      console.error("HTTPエラー:", res.status, text)
      throw new Error(`HTTPエラー: ${res.status}`)
    }
  }

  return {
    fetchJSON,
    fetchFormData,
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

const makeFormDataBody = (param: Body): FormData => {
  const formData = new FormData()
  if (param) {
    const keys = Object.keys(param)
    for (const key of keys) {
      const value = param[key]
      if (value instanceof File || value instanceof Blob) {
        // FileやBlobの場合はそのまま追加
        formData.append(key, value)
      } else if (Array.isArray(value)) {
        // 配列の場合は各要素を追加
        // biome-ignore lint/complexity/noForEach: <explanation>
        value.forEach((item) => {
          formData.append(key, item)
        })
      } else if (typeof value === "object" && value !== null) {
        // オブジェクトの場合はJSON文字列に変換
        formData.append(key, JSON.stringify(value))
      } else {
        // その他のデータ型（文字列や数値など）
        formData.append(key, String(value))
      }
    }
  }
  return formData
}
