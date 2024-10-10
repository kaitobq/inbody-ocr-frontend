import type { CreateOrganizationRequest, CreateOrganizationResponse, SigninRequest, SigninResponse, SignupRequest, SignupResponse } from 'types/auth'
import { fetcher } from './fetcher'

type Response = {
    createOrgRes: CreateOrganizationResponse
    signupRes: SignupResponse
    signinRes: SigninResponse
}

// type Convert = {

// }

export const useAuth = () => {
    const apiFetcher = fetcher()

    const createOrganization = async (req: CreateOrganizationRequest) => {
        return await apiFetcher.fetchJSON<Response["createOrgRes"]>({
            path: "/v1/organization",
            method: "POST",
            body: {
                "user_name": req.userName,
                "email": req.email,
                "password": req.password,
                "organization_name": req.organizationName
            }
        })
    }

    const signup = async (orgId: string, req: SignupRequest) => {
        return await apiFetcher.fetchJSON<Response["signupRes"]>({
            path: `/v1/organization/${orgId}/signup`,
            method: "POST",
            body: {
                "name": req.name,
                "email": req.email,
                "password": req.password,
            }
        })
    }

    const signin = async (req: SigninRequest) => {
        return await apiFetcher.fetchJSON<Response["signinRes"]>({
            path: "/v1/organization/signin",
            method: "POST",
            body: {
                "email": req.email,
                "password": req.password
            }
        })
    }

    return {
        createOrganization,
        signup,
        signin
    }
}
