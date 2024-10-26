import type {
  AnalyzeImageResponse,
  GetImageDataForMemberResponse,
  GetScreenForAdminResponse,
  GetScreenForMemberResponse,
  SubmitDataRequest,
  SubmitDataResponse,
} from "types/dashboard"
import { fetcher } from "./fetcher"

type Response = {
  anayzeImage: AnalyzeImageResponse
  submitData: SubmitDataResponse
  getImageDataForMember: GetImageDataForMemberResponse
  getScreenForMember: GetScreenForMemberResponse
  getScreenForAdmin: GetScreenForAdminResponse
}

// type Convert = {

// }

export const AnalyzeImage = async (token: string, file: File) => {
  const apiFetcher = fetcher()
  return await apiFetcher.fetchFormData<Response["anayzeImage"]>({
    accessToken: token,
    path: "/v1/image",
    method: "POST",
    body: {
      image: file,
    },
  })
}

export const SubmitData = async (token: string, data: SubmitDataRequest) => {
  const apiFetcher = fetcher()
  return await apiFetcher.fetchJSON<Response["submitData"]>({
    accessToken: token,
    path: "/v1/image-data",
    method: "POST",
    body: data,
  })
}

export const GetImageDataForMember = async (token: string) => {
  const apiFetcher = fetcher()
  return await apiFetcher.fetchJSON<Response["getImageDataForMember"]>({
    accessToken: token,
    path: "/v1/image-data",
    method: "GET",
  })
}

export const GetScreenForMember = async (token: string) => {
  const apiFetcher = fetcher()
  return await apiFetcher.fetchJSON<Response["getScreenForMember"]>({
    accessToken: token,
    path: "/v1/organization/dashboard",
    method: "GET",
  })
}

export const GetScreenForAdmin = async (token: string) => {
  const apiFetcher = fetcher()
  return await apiFetcher.fetchJSON<Response["getScreenForAdmin"]>({
    accessToken: token,
    path: "/v1/organization/dashboard/admin",
    method: "GET",
  })
}
