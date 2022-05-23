import { useSelector } from "react-redux";
import { RootReducer } from "../../utils/TypeScript";

import Toast from "./Toast";
import Loading from "./Loading";

function Alert() {
  const { alert } = useSelector((state: RootReducer) => state);

  return (
    <div>
      {alert.loading && <Loading />}
      {alert.errors && (
        <Toast title="Errors" body={alert.errors} bgColor="bg-danger" />
      )}

      {alert.success && (
        <Toast title="Errors" body={alert.success} bgColor="bg-success" />
      )}
    </div>
  );
}

export default Alert;
