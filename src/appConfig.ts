export const COFFEE_API_BASE = "https://coffee-varieties.now.sh/api";
export const EMPTY_FILTER = "None";
export const ALL_SELECTED = "All";
export enum FILTER_SELECTION_TYPE {
  COUNTRY = "country",
  VARIETY = "variety",
  RESISTANCE_LEVEL = "resistanceLevel"
}

export enum ResistanceLevel {
  SUSCEPTIBLE = "SUSCEPTIBLE",
  TOLERANT = "TOLERANT",
  RESISTANT = "RESISTANT"
}
