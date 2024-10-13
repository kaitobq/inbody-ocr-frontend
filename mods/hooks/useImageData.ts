import { GetImageDataForMember } from "mods/repositories/dashboard"
import { useEffect, useState } from "react"
import type { ImageData } from "types/dashboard"
import { useCookie } from "./cookie"

export const useImageData = () => {
  const cookie = useCookie()
  const [data, setData] = useState<ImageData[]>([])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const getForMember = async () => {
      const token = await cookie.get("token")
      if (!token) {
        console.error("トークンが見つかりません")
        return
      }

      try {
        const res = await GetImageDataForMember(token)
        setData(res.records || [])
        console.log("データ取得成功:", res)
      } catch (error) {
        console.error("エラーが発生しました:", error)
      }
    }
    getForMember()
  }, [])

  return {
    data,
  }
}
