import { toast } from "react-toastify";
import {
  loginUserDetail,
  postNewAdmin,
  verifyEmailAndCode,
} from "../../helper/axios";

export const createNewAdminAction = async (obj) => {
  const pendingResp = postNewAdmin(obj);

  toast.promise(pendingResp, {
    pending: "Please await..",
  });
  const { status, message } = await pendingResp;
  toast[status](message);
};

export const verifyUserAction = async (obj) => {
  const { status, message } = await verifyEmailAndCode(obj);
  toast[status](message);
  return status;
};
export const loginUserAction = async (obj) => {
  const { status, message } = await loginUserDetail(obj);
  toast[status](message);
  return status;
};
