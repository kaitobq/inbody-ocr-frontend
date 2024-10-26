export type Role = "owner" | "admin" | "member"

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

// screen

export type ImageDataForScreen = {
  user_id: string
  user_name: string
  weight: number
  height: number
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

export type GetScreenForMemberResponse = {
  status: number
  message: string
  current: {
    weight: number
    muscle_weight: number
    fat_weight: number
    created_at: string
  }
  previous: {
    weight: number
    muscle_weight: number
    fat_weight: number
    created_at: string
  }
  graph: {
    kilo: [
      {
        weight: number
        muscle_weight: number
        fat_weight: number
        body_water: number
        protein: number
        mineral: number
        created_at: string
      }
    ]
    percent: [
      {
        fat_percent: number
        created_at: string
      }
    ]
    score: [
      {
        point: number
        created_at: string
      }
    ]
  }
  history: ImageDataForScreen[]
}

export type GetScreenForAdminResponse = {
  status: number
  message: string
  avg: {
    weight: number
    muscle_weight: number
    fat_percent: number
    point: number
  }
  chart: {
    bmi: { [key: string]: number }
    weight: { [key: string]: number }
    muscle_weight: { [key: string]: number }
    fat_percent: { [key: string]: number }
  }
  current: ImageDataForScreen[]
  all_data: ImageDataForScreen[]
}
