import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "components/ui"
import { Loader2, Upload } from "lucide-react"
import { useImage } from "mods/hooks/useImage"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"

export const ImageUploader = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { loading, analyzedData, setAnalyzedData, analyze, submitData } =
    useImage()
  const router = useRouter()

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (!file) {
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      setUploadedImage(reader.result as string)
    }
    reader.readAsDataURL(file)

    if (file) {
      await analyze(file)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setAnalyzedData((prevData) => ({
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      ...prevData!,
      // biome-ignore lint/style/useNumberNamespace: <explanation>
      [name]: parseFloat(value),
    }))
  }

  const handleSubmit = async () => {
    if (!analyzedData) {
      return
    }
    await submitData(analyzedData)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    router.refresh()
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>新規データ登録</CardTitle>
        <CardDescription>
          InBody画像をアップロードしてデータを登録
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="inbody-image">InBody画像</Label>
          <Input
            id="inbody-image"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            ref={fileInputRef}
            disabled={loading}
          />
        </div>
        {loading && (
          <div className="flex justify-center items-center mt-4">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">処理中...</span>
          </div>
        )}
        {uploadedImage && !loading && (
          <div className="mt-4">
            <img
              src={uploadedImage}
              alt="Uploaded InBody"
              className="max-w-full h-auto"
            />
          </div>
        )}
        {analyzedData && !loading && (
          <div className="mt-4 grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="height">身長 (cm)</Label>
                <Input
                  id="height"
                  name="height"
                  type="number"
                  value={analyzedData.height}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="weight">体重 (kg)</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  value={analyzedData.weight}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="muscle_weight">筋肉量 (kg)</Label>
                <Input
                  id="muscle_weight"
                  name="muscle_weight"
                  type="number"
                  value={analyzedData.muscle_weight}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="fat_weight">体脂肪量 (kg)</Label>
                <Input
                  id="fat_weight"
                  name="fat_weight"
                  type="number"
                  value={analyzedData.fat_weight}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fat_percent">体脂肪率 (%)</Label>
                <Input
                  id="fat_percent"
                  name="fat_percent"
                  type="number"
                  value={analyzedData.fat_percent}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="body_water">体水分量 (kg)</Label>
                <Input
                  id="body_water"
                  name="body_water"
                  type="number"
                  value={analyzedData.body_water}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="protein">タンパク質量 (kg)</Label>
                <Input
                  id="protein"
                  name="protein"
                  type="number"
                  value={analyzedData.protein}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="mineral">ミネラル量 (kg)</Label>
                <Input
                  id="mineral"
                  name="mineral"
                  type="number"
                  value={analyzedData.mineral}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="point">得点</Label>
              <Input
                id="point"
                name="point"
                type="number"
                value={Math.round(analyzedData.point)}
                onChange={handleInputChange}
              />
            </div>
          </div>
        )}
        <Button
          className="mt-4"
          onClick={handleSubmit}
          disabled={!analyzedData || loading}
        >
          <Upload className="mr-2 h-4 w-4" /> 確定
        </Button>
      </CardContent>
    </Card>
  )
}
