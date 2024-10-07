import type { CreateOrganizationRequest, CreateOrganizationResponse, SignupRequest, SignupResponse } from 'types/auth'
import { fetcher } from './fetcher'

type Response = {
    createOrgRes: CreateOrganizationResponse
    signupRes: SignupResponse
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

    return {
        createOrganization,
        signup
    }
}
