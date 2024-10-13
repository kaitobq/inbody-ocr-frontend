import type {
  CreateOrganizationRequest,
  CreateOrganizationResponse,
  SigninRequest,
  SigninResponse,
  SignupRequest,
  SignupResponse,
} from "types/auth"
import { fetcher } from "./fetcher"

type Response = {
  createOrgRes: CreateOrganizationResponse
  signupRes: SignupResponse
  signinRes: SigninResponse
}

export const createOrganization = async (req: CreateOrganizationRequest) => {
  const apiFetcher = fetcher()
  return await apiFetcher.fetchJSON<Response["createOrgRes"]>({
    path: "/v1/organization",
    method: "POST",
    body: {
      user_name: req.userName,
      email: req.email,
      password: req.password,
      organization_name: req.organizationName,
    },
  })
}

export const signup = async (orgId: string, req: SignupRequest) => {
  const apiFetcher = fetcher()
  return await apiFetcher.fetchJSON<Response["signupRes"]>({
    path: `/v1/organization/${orgId}/signup`,
    method: "POST",
    body: {
      name: req.name,
      email: req.email,
      password: req.password,
    },
  })
}

export const signin = async (req: SigninRequest) => {
  const apiFetcher = fetcher()
  return await apiFetcher.fetchJSON<Response["signinRes"]>({
    path: "/v1/organization/signin",
    method: "POST",
    body: {
      email: req.email,
      password: req.password,
    },
  })
}
