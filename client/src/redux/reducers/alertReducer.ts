import { ALERT, IAlertType } from "../types/alertType";
import { IALERT } from "../../utils/TypeScript";

const alertReducer = (state: IALERT = {}, action: IAlertType): IALERT => {
  switch (action.type) {
    case ALERT:
      return action.payload;
    default:
      return state;
  }
};
export default alertReducer;
