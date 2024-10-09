"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Label } from "components/ui"
import { useAuth } from "hooks/useAuth"
import { useToast } from "hooks/useToast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"

const schema = z.object({
  userName: z
    .string({ required_error: "ユーザー名を入力してください。", invalid_type_error: "入力値に誤りがあります。" })
    .min(1, { message: "ユーザー名を入力してください。" }),
  email: z
    .string({ required_error: "メールアドレスを入力してください。", invalid_type_error: "入力値に誤りがあります。" })
    .email({ message: "正しいmメールアドレスを入力してください。" }),
  password: z
    .string({ required_error: "パスワードを入力してください。", invalid_type_error: "入力値に誤りがあります。" })
    .min(8, { message: "パスワードは8文字以上で入力してください。" }),
  confirmPassword: z
    .string({ required_error: "パスワードを入力してください。", invalid_type_error: "入力値に誤りがあります。" })
    .min(8, { message: "パスワードは8文字以上で入力してください。" }),
  organizationName: z
    .string({ required_error: "組織名を入力してください。", invalid_type_error: "入力値に誤りがあります。" })
    .min(3, { message: "組織名を3文字以上で入力してください。" }),
})

type schemaType = z.infer<typeof schema>

export const CreateOrganizationForm = () => {
  const [loading, setLoading] = useState(false)
  const auth = useAuth()
  const router = useRouter()
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<schemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      organizationName: "",
    },
  })
  const showErrorToast = useToast("error")
  const showSuccessToast = useToast("success")

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
      const res = await auth.createOrganization(data)
      console.log(res)
      showSuccessToast("success")
    } catch (error) {
      console.error(error)
      showErrorToast("error")
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
              id="userName"
              placeholder="someone"
              onChange={onChange}
              value={value}
            />
          )}
          name="userName"
        />
        {errors.userName && (
          <p className="text-red-500 text-xs">{errors.userName.message}</p>
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
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="organization-name">組織名</Label>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              id="organization-name"
              placeholder="organization"
              onChange={onChange}
              value={value}
            />
          )}
          name="organizationName"
        />
        {errors.organizationName && (
          <p className="text-red-500 text-xs">{errors.organizationName.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "ロード中..." : "サインアップ"}
      </Button>
    </form>
  )
}
