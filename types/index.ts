export type DiseaseType = {
  disease_id: number
  name: string
  description?: string
  disease_class_id: number
}

export type TreatmentType = {
  medication_id: number
  name: string
}

export type TradeName = {
  trade_name_id: number
  name: string
  medication_id: number
  price: number
}