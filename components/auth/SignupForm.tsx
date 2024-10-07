"use client"

import { z } from "zod"
import React, { useState } from 'react'
import { useAuth } from "hooks/useAuth"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Label } from "components/ui"
import { useParams } from "next/navigation"

const schema = z.object({
  name: z.string().min(1, { message: "ユーザー名を入力してください。" }),
  email: z.string().email({ message: "正しいmメールアドレスを入力してください。" }),
  password: z.string().min(8, { message: "パスワードは8文字以上で入力してください。" }),
  confirmPassword: z.string().min(8, { message: "パスワードは8文字以上で入力してください。" }),
})

type schemaType = z.infer<typeof schema>

export const SignupForm = () => {
  const { id } = useParams()
  const orgId = id as string
  const [loading, setLoading] = useState(false)
  const auth = useAuth()  
  const { control, handleSubmit, formState: {errors} } = useForm<schemaType>({resolver: zodResolver(schema)})

  const onSubmit = async (data: schemaType) => {
    setLoading(true)

    if (data.password !== data.confirmPassword) {
      //   toast({
      //     title: 'Error',
      //     description: 'Passwords do not match.',
      //     variant: 'destructive',
      //   })
      setLoading(false)
      return
    }

    try {
      const res = await auth.signup(orgId, data)
      console.log(res)
      //   toast({
      //     title: 'Success',
      //     description: 'Your account has been created successfully.',
      //   })
      // router.push("/signin")
    } catch (error) {
      //   toast({
      //     title: 'Error',
      //     description: 'Failed to create account. Please try again.',
      //     variant: 'destructive',
      //   })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 m-3">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              id="name"
              placeholder="Enter your name"
              onChange={onChange}
              value={value}
              />
          )}
          name="name"
        />
      </div>
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
              placeholder="Create a password"
              onChange={onChange}
              value={value}
            />
          )}
          name="password"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirm your password"
              onChange={onChange}
              value={value}
            />
          )}
          name="confirmPassword"
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating Account..." : "Sign Up"}
      </Button>
    </form>
  )
}
