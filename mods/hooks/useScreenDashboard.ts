import { useState, useEffect } from "react"
import { useCookie } from "./cookie"
import type { GetScreenForAdminResponse, GetScreenForMemberResponse } from "types/dashboard"
import { GetScreenForAdmin, GetScreenForMember } from "mods/repositories/dashboard"

type Role = "member" | "admin" | "owner"

export const useScreenDashboard = (role: Role) => {
    const cookie = useCookie()
    const [dataForMember, setDataForMember] = useState<GetScreenForMemberResponse | undefined>()
    const [dataForAdmin, setDataForAdmin] = useState<GetScreenForAdminResponse | undefined>()
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
            setDataForMember(res)
            console.log("データ取得成功:", res)
        } catch(error) {
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
        loading
    }
}