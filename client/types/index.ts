export type DiseaseType = {
  disease_id: number
  name: string
}

export type TreatmentType = {
  medication_id: number
  name: string
}

export type BrandName = TreatmentType & { price: number }