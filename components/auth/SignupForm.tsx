"use client"

import { Button, Input, Label } from "components/ui"
import { useAuth } from "mods/hooks/useAuth"
import { useParams } from "next/navigation"
import React from "react"
import { Controller } from "react-hook-form"

export const SignupForm = () => {
  const { id } = useParams()
  const orgId = id as string
  const auth = useAuth()
  const { loading, control, handleSubmit, errors, onSubmit } =
    auth.signup(orgId)

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
