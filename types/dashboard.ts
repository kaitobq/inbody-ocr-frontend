export type ImageData = {
  height: number
  weight: number
  muscle_weight: number
  fat_weight: number
  fat_percent: number
  body_water: number
  protein: number
  mineral: number
  point: number
  created_at: string
  updated_at: string
}

export type DataGroup = {
  label: string
  keys: string[]
}

export type DataGroups = {
  [key: string]: DataGroup
}

export type AnalyzeImageResponse = {
  status: number
  message: string
  results: ImageData
}

export type SubmitDataRequest = {
  height: number
  weight: number
  muscle_weight: number
  fat_weight: number
  fat_percent: number
  body_water: number
  protein: number
  mineral: number
  point: number
  created_at: string
  updated_at: string
}

export type SubmitDataResponse = {
  message: string
}

export type GetImageDataForMemberResponse = {
  records: {
    id: string
    organization_id: string
    user_id: string
    height: number
    weight: number
    muscle_weight: number
    fat_weight: number
    fat_percent: number
    body_water: number
    protein: number
    mineral: number
    point: number
    created_at: string
    updated_at: string
  }[]
}
