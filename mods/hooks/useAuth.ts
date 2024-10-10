import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from './useToast'
import { createOrganization, signin, signup } from 'mods/repositories/auth'
import { type CreateOrganizationRequest, CreateOrganizationSchema, type CreateOrganizationSchemaType, type SigninRequest, SigninSchema, type SigninSchemaType, type SignupRequest, SignupSchema, type SignupSchemaType } from 'types/auth'
import { useCookie } from './cookie'

export const useAuth = () => {
    const screenCreateOrganization = () => {
        const [loading, setLoading] = useState(false)
        const showToast = useToast()
        const cookie = useCookie()
        const {
            control,
            handleSubmit,
            formState: { errors },
            setError,
        } = useForm<CreateOrganizationSchemaType>({
            resolver: zodResolver(CreateOrganizationSchema),
            defaultValues: {
                userName: "",
                email: "",
                password: "",
                organizationName: ""
            },
        })

        const onSubmit = async (data: CreateOrganizationSchemaType) => {
            setLoading(true)

            if(data.password !== data.confirmPassword) {
                setError("confirmPassword", {
                    type: "manual",
                    message: "パスワードが一致しません。",
                })
                setLoading(false)
                return
            }

            try {
                const req: CreateOrganizationRequest = {
                    userName: data.userName,
                    email: data.email,
                    password: data.password,
                    organizationName: data.organizationName
                }
                const res = await createOrganization(req)
                cookie.set("token", res.token.value)
                showToast.success("success")
            } catch (error) {
                console.error(error)
                showToast.error("error")
            } finally {
                setLoading(false)
            }
        }

        return {
            loading,
            control,
            handleSubmit,
            errors,
            onSubmit
        }
    }

    const screenSignup = (orgId: string) => {
        const [loading, setLoading] = useState(false)
        const showToast = useToast()
        const {
            control,
            handleSubmit,
            formState: { errors },
            setError,
        } = useForm<SignupSchemaType>({
            resolver: zodResolver(SignupSchema),
            defaultValues: {
                name: "",
                email: "",
                password: "",
            },
        })

        const onSubmit = async (data: SignupSchemaType) => {
            setLoading(true)

            if(data.password !== data.confirmPassword) {
                setError("confirmPassword", {
                    type: "manual",
                    message: "パスワードが一致しません。",
                })
                setLoading(false)
                return
            }

            try {
                const req: SignupRequest = {
                    name: data.name,
                    email: data.email,
                    password: data.password
                }
                const res = await signup(orgId, req)
                console.log(res)
                showToast.success("success")
            } catch (error) {
                console.error(error)
                showToast.error("error")
            } finally {
                setLoading(false)
            }
        }

        return {
            loading,
            control,
            handleSubmit,
            errors,
            onSubmit
        }
    }

    const screenSignin = () => {
        const [loading, setLoading] = useState(false)
        const showToast = useToast()
        const cookie = useCookie()
        const {
            control,
            handleSubmit,
            formState: { errors },
        } = useForm<SigninSchemaType>({
            resolver: zodResolver(SigninSchema),
            defaultValues: {
                email: "",
                password: "",
            },
        })

        const onSubmit = async (data: SigninSchemaType) => {
            setLoading(true)
            try {
                const req: SigninRequest = {
                    email: data.email,
                    password: data.password
                }
                const res = await signin(req)
                cookie.set("token", res.token.value)
                console.log(res)
                showToast.success("success")
            } catch (error) {
                console.error(error)
                showToast.error("error")
            } finally {
                setLoading(false)
            }
        }

        return {
            loading,
            control,
            handleSubmit,
            errors,
            onSubmit
        }
    }
    
    return {
        createOrganization: screenCreateOrganization,
        signup: screenSignup,
        signin: screenSignin
    }
}
