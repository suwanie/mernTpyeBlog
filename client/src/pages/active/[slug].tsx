import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// IParams에 slug?:string
import { IParams } from "../../utils/TypeScript";
// server/routes/authRouter 가보면 /active가 있다.
import { postAPI } from "../../utils/FetchData";
import { showErrMsg, showSuccessMsg } from "../../components/alert/Alert";

function Active() {
  const { slug }: IParams = useParams();
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");
  useEffect(() => {
    if (slug) {
      //두 번째 인자로 authCtrl의 activeAccount를 봐라
      postAPI("active", { active_token: slug })
        .then((res) => setSuccess(res.data.msg))
        .catch((err) => setErr(err.response.data.msg));
    }
  }, [slug]);

  return (
    <div>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
    </div>
  );
}

export default Active;
