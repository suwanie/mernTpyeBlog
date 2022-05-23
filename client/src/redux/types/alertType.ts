import { IALERT } from "../../utils/TypeScript";

export const ALERT = "ALERT";

// alertReducer의 action type을 보네?
export interface IAlertType {
  type: typeof ALERT;
  payload: IALERT;
}
