import {
  GetScreenForAdmin,
  GetScreenForMember,
} from "mods/repositories/dashboard"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import type {
  GetScreenForAdminResponse,
  GetScreenForMemberResponse,
} from "types/dashboard"
import { useCookie } from "./cookie"

type Role = "member" | "admin" | "owner"

export const useScreenDashboard = (role: Role) => {
  const cookie = useCookie()
  const router = useRouter()
  const [dataForMember, setDataForMember] = useState<
    GetScreenForMemberResponse | undefined
  >()
  const [dataForAdmin, setDataForAdmin] = useState<
    GetScreenForAdminResponse | undefined
  >()
  const [loading, setLoading] = useState(true) // 初期値を true に設定

  const getForMember = async () => {
    const token = await cookie.get("token")
    if (!token) {
      console.error("トークンが見つかりません")
      setLoading(false)
      return
    }

    try {
      const res = await GetScreenForMember(token)

      if (Math.floor(res.status / 100) !== 2) {
        console.error("エラーが発生しました:", res)
        router.push("/signin")
        return
      }

      setDataForMember(res)
      console.log("データ取得成功:", res)
    } catch (error) {
      console.error("エラーが発生しました:", error)
    } finally {
      setLoading(false)
    }
  }

  const getForAdmin = async () => {
    const token = await cookie.get("token")
    if (!token) {
      console.error("トークンが見つかりません")
      setLoading(false)
      return
    }

    try {
      const res = await GetScreenForAdmin(token)

      if (Math.floor(res.status / 100) !== 2) {
        console.error("エラーが発生しました:", res)
        router.push("/signin")
        return
      }

      setDataForAdmin(res)
      console.log("データ取得成功:", res)
    } catch (error) {
      console.error("エラーが発生しました:", error)
    } finally {
      setLoading(false)
    }
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (role === "admin" || role === "owner") {
      getForAdmin()
    } else if (role === "member") {
      getForMember()
    }
  }, [role])

  return {
    dataForMember,
    dataForAdmin,
    loading,
  }
}
