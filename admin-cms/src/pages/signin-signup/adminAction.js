import { toast } from "react-toastify";
import { postNewAdmin, verifyEmailAndCode } from "../../helper/axios";

export const createNewAdminAction = async (obj) => {
  const { status, message } = await postNewAdmin(obj);
  toast[status](message);
  return status;
};

export const verifyUserAction = async (obj) => {
  const { status, message } = await verifyEmailAndCode(obj);
  toast[status](message);
  return status;
};
