"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Label } from "components/ui"
import { useAuth } from "mods/hooks/useAuth"
import { useCookie } from "mods/hooks/useCookie"
import { useToast } from "mods/hooks/useToast"
import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
  email: z
    .string({
      required_error: "メールアドレスを入力してください。",
      invalid_type_error: "入力値に誤りがあります。",
    })
    .email({ message: "正しいメールアドレスを入力してください。" }),
  password: z
    .string({
      required_error: "パスワードを入力してください。",
      invalid_type_error: "入力値に誤りがあります。",
    })
    .min(8, { message: "パスワードは8文字以上で入力してください。" }),
})

type schemaType = z.infer<typeof schema>

export const SigninForm = () => {
  const [loading, setLoading] = useState(false)
  const auth = useAuth()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  })
  const showToast = useToast()
  const cookie = useCookie()

  const onSubmit = async (data: schemaType) => {
    setLoading(true)

    try {
      const res = await auth.signin(data)
      cookie.setCookie("token", res.token.value)
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
        <Label htmlFor="email">メールアドレス</Label>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              id="email"
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
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "ロード中..." : "サインイン"}
      </Button>
    </form>
  )
}
