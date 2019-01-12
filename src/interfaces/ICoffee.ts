import { IDisease } from "./IDisease";

export interface ICoffee {
  name: string
  description: string
  bean_size: string
  quality_potential: string
  yield: string
  disease_resistance: IDisease[],
  producing_countries: string[]
}