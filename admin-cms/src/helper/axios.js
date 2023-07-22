import axios from "axios";

const rootApi = process.env.REACT_APP_ROOT_API;
const adminApi = rootApi + "/admin";

export const axiosProcess = async ({ method, url, obj }) => {
  try {
    const { data } = await axios({
      method,
      url,
      data: obj,
    });
    return data;
  } catch (error) {
    return {
      status: "error",
      message: error.response ? error?.response?.data?.message : error.message,
    };
  }
};

//ADMIN API
export const postNewAdmin = (data) => {
  const obj = {
    method: "post",
    url: adminApi,
    obj: data,
  };
  return axiosProcess(obj);
};