import { z } from "zod"

export const SignupSchema = z.object({
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
    .email({ message: "正しいメールアドレスを入力してください。" }),
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

export type SignupSchemaType = z.infer<typeof SignupSchema>

export type SignupRequest = {
  name: string
  email: string
  password: string
  // organizationName: string
}

export type SignupResponse = {
  status: number
  message: string
  organization_id: string
  user: {
    id: string
    name: string
    role: string
  }
  token: {
    value: string
    expires_at: string
  }
}

export const CreateOrganizationSchema = z.object({
  userName: z
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
  organizationName: z
    .string({
      required_error: "組織名を入力してください。",
      invalid_type_error: "入力値に誤りがあります。",
    })
    .min(3, { message: "組織名を3文字以上で入力してください。" }),
})

export type CreateOrganizationSchemaType = z.infer<
  typeof CreateOrganizationSchema
>

export type CreateOrganizationRequest = {
  userName: string
  email: string
  password: string
  organizationName: string
}

export type CreateOrganizationResponse = {
  status: number
  message: string
  organization_id: string
  user: {
    id: string
    name: string
    role: string
  }
  token: {
    value: string
    expires_at: string
  }
}

export const SigninSchema = z.object({
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

export type SigninSchemaType = z.infer<typeof SigninSchema>

export type SigninRequest = {
  email: string
  password: string
}

export type SigninResponse = {
  status: number
  message: string
  organization_id: string
  user: {
    id: string
    name: string
    role: string
  }
  token: {
    value: string
    expires_at: string
  }
}
