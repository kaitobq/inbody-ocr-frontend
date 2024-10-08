"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Label } from "components/ui"
import { useAuth } from "hooks/useAuth"
import React, { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
  email: z
    .string()
    .email({ message: "正しいmメールアドレスを入力してください。" }),
  password: z
    .string()
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
  } = useForm<schemaType>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: schemaType) => {
    setLoading(true)

    try {
      const res = await auth.signin(data)
      console.log(res)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 m-3">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              onChange={onChange}
              value={value}
            />
          )}
          name="email"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              onChange={onChange}
              value={value}
            />
          )}
          name="password"
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating Account..." : "Sign Up"}
      </Button>
    </form>
  )
}
