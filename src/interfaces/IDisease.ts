//Many other strings, like yield, bean size and so on can be changed to String literals types
import { ResistanceLevel } from "../appConfig";

export interface IDisease {
  [key: string]: ResistanceLevel;
}
