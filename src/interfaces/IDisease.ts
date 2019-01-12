//Many other strings, like yield, bean size and so on can be changed to String literals types
export type ResistanceLevel = "SUSCEPTIBLE" | "TOLERANT" | "RESISTANT"

export interface IDisease {
  [key: string]: ResistanceLevel
}