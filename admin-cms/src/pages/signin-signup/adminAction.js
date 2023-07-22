import { toast } from "react-toastify";
import { postNewAdmin } from "../../helper/axios";

export const createNewAdminAction = async (obj) => {
  const { status, message } = await postNewAdmin(obj);
  toast[status](message);
};
