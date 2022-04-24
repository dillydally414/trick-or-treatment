export type DiseaseType = {
  id: number
  name: string
}

export type TreatmentType = DiseaseType

export type BrandName = TreatmentType & { price: number }