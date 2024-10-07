"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Button, Input, Label } from "components/ui"
import { useAuth } from "hooks/useAuth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
// import { useToast } from '@components/ui/use-toast'
import type { SignupRequest } from "types/auth"
import { z } from "zod"

const schema = z.object({
  userName: z.string().min(1, { message: "ユーザー名を入力してください。" }),
  email: z
    .string()
    .email({ message: "正しいmメールアドレスを入力してください。" }),
  password: z
    .string()
    .min(8, { message: "パスワードは8文字以上で入力してください。" }),
  confirmPassword: z
    .string()
    .min(8, { message: "パスワードは8文字以上で入力してください。" }),
  organizationName: z
    .string()
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
  } = useForm<schemaType>({ resolver: zodResolver(schema) })

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
      const res = await auth.createOrganization(data)
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
              id="userName"
              placeholder="Enter your name"
              onChange={onChange}
              value={value}
            />
          )}
          name="userName"
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
      <div className="space-y-2">
        <Label htmlFor="organization-name">Organization Name</Label>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              id="organization-name"
              placeholder="Enter your organization name"
              onChange={onChange}
              value={value}
            />
          )}
          name="organizationName"
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creating Account..." : "Sign Up"}
      </Button>
    </form>
  )
}

// signup success
// {
//   "message": "Organization created successfully",
//   "organization": {
//       "id": "01J9AKA9W73A3H9T3MMANVY4VR",
//       "name": "My Organization",
//       "created_at": "2024-10-04T10:46:40.718566633+09:00",
//       "updated_at": "2024-10-04T10:46:40.718566633+09:00"
//   },
//   "user": {
//       "id": "01J9AKAAPEV6XASZFFMDCMJCT7",
//       "name": "test",
//       "role": "owner"
//   },
//   "token": {
//       "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JpemVkIjp0cnVlLCJleHAiOjE3MjgwOTI4MDAsIm9yZ19pZCI6IjAxSjlBS0E5VzczQTNIOVQzTU1BTlZZNFZSIiwidXNlcl9pZCI6IjAxSjlBS0FBUEVWNlhBU1pGRk1EQ01KQ1Q3In0.v4UVI3xGazK4kQVYmEjtnCU1abhxbbH4XSQ3ZdJwR98",
//       "expires_at": "2024-10-05T10:46:40+09:00"
//   }
// }
