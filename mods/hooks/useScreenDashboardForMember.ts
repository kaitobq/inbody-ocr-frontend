import { GetScreenForMember } from "mods/repositories/dashboard"
import React, { useEffect, useState } from "react"
import type { GetScreenForMemberResponse } from "types/dashboard"
import { useCookie } from "./cookie"

export const useScreenDashboardForMember = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const cookie = useCookie()
  const [dataForMember, setDataForMember] =
    useState<GetScreenForMemberResponse | null>(null)

  const getForMember = async () => {
    setLoading(true)
    const token = await cookie.get("token")
    if (!token) {
      console.error("トークンが見つかりません")
      setLoading(false)
      return
    }

    try {
      const res = await GetScreenForMember(token)
      setDataForMember(res)
      console.log("データ取得成功:", res)
    } catch (error) {
      console.error("エラーが発生しました:", error)
    } finally {
      setLoading(false)
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    getForMember()
  }, [])

  return {
    dataForMember,
    loading,
  }
}
