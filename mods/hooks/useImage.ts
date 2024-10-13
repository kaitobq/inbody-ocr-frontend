import { AnalyzeImage, SubmitData } from "mods/repositories/dashboard"
import { useRouter } from "next/navigation"
import { useState } from "react"
import type { ImageData } from "types/dashboard"
import { useCookie } from "./cookie"
import { useToast } from "./useToast"

export const useImage = () => {
  const [loading, setLoading] = useState(false)
  const [analyzedData, setAnalyzedData] = useState<ImageData | null>(null)
  const cookie = useCookie()
  const showToast = useToast()
  const router = useRouter()

  const analyze = async (file: File) => {
    const token = await cookie.get("token")
    if (!token) {
      console.error("トークンが見つかりません")
      return
    }

    try {
      setLoading(true)
      const res = await AnalyzeImage(token, file)
      setAnalyzedData(res?.results || null)
    } catch (error) {
      console.error("エラーが発生しました:", error)
      setAnalyzedData(null)
    } finally {
      setLoading(false)
    }
  }

  const submitData = async (data: ImageData) => {
    const token = await cookie.get("token")
    if (!token) {
      console.error("トークンが見つかりません")
      return
    }

    try {
      setLoading(true)
      const res = await SubmitData(token, data)
      console.log("データ送信成功:", res)
      setAnalyzedData(null)
      showToast.success("データの登録に成功しました")
      router.refresh()
    } catch (error) {
      console.error("エラーが発生しました:", error)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    analyzedData,
    setAnalyzedData,
    analyze,
    submitData,
  }
}
