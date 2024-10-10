"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Label } from "components/ui"
import { useAuth } from "mods/hooks/useAuth"
import { useToast } from "mods/hooks/useToast"
import { useParams } from "next/navigation"
import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
  name: z
    .string({
      required_error: "ユーザー名を入力してください。",
      invalid_type_error: "入力値に誤りがあります。",
    })
    .min(1, { message: "ユーザー名を入力してください。" }),
  email: z
    .string({
      required_error: "メールアドレスを入力してください。",
      invalid_type_error: "入力値に誤りがあります。",
    })
    .email({ message: "正しいmメールアドレスを入力してください。" }),
  password: z
    .string({
      required_error: "パスワードを入力してください。",
      invalid_type_error: "入力値に誤りがあります。",
    })
    .min(8, { message: "パスワードは8文字以上で入力してください。" }),
  confirmPassword: z
    .string({
      required_error: "パスワードを入力してください。",
      invalid_type_error: "入力値に誤りがあります。",
    })
    .min(8, { message: "パスワードは8文字以上で入力してください。" }),
})

type schemaType = z.infer<typeof schema>

export const SignupForm = () => {
  const { id } = useParams()
  const orgId = id as string
  const [loading, setLoading] = useState(false)
  const auth = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })
  const showToast = useToast()

  const onSubmit = async (data: schemaType) => {
    setLoading(true)

    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "パスワードが一致しません。",
      })
      setLoading(false)
      return
    }

    try {
      const res = await auth.signup(orgId, data)
      console.log(res)
      showToast.success("success")
    } catch (error) {
      console.error(error)
      showToast.error("error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 m-3">
      <div className="space-y-2">
        <Label htmlFor="name">ユーザー名</Label>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              id="name"
              placeholder="someone"
              onChange={onChange}
              value={value}
            />
          )}
          name="name"
        />
        {errors.name && (
          <p className="text-red-500 text-xs">{errors.name.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">メールアドレス</Label>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              id="email"
              type="email"
              placeholder="someone@example.com"
              onChange={onChange}
              value={value}
            />
          )}
          name="email"
        />
        {errors.email && (
          <p className="text-red-500 text-xs">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">パスワード</Label>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              id="password"
              type="password"
              placeholder="password"
              onChange={onChange}
              value={value}
            />
          )}
          name="password"
        />
        {errors.password && (
          <p className="text-red-500 text-xs">{errors.password.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">パスワード(確認)</Label>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              id="confirm-password"
              type="password"
              placeholder="password"
              onChange={onChange}
              value={value}
            />
          )}
          name="confirmPassword"
        />
      </div>
      {errors.confirmPassword && (
        <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>
      )}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "ロード中..." : "サインアップ"}
      </Button>
    </form>
  )
}
