import { toast } from "react-toastify";
import {
  deleteProduct,
  getNewProducts,
  postNewProduct,
} from "../../helper/axios";

import { setProducts } from "./productSlice";

export const postNewProductAction = (data) => async (dispatch) => {
  const pending = await postNewProduct(data);

  toast.promise(pending, {
    pending: "Please wait...",
  });

  const { status, message } = await pending;

  toast[status](message);

  if (status === "success") {
    dispatch(getProductsAction());
  }
};

export const getProductsAction = () => async (dispatch) => {
  const { status, message, products } = await getNewProducts();

  toast[status](message);

  status === "success" && dispatch(setProducts(products));
};

// export const updatePOsAction = (data) => async (dispatch) => {
//   const pending = updateNewPOs(data);

//   toast.promise(pending, {
//     pending: "Please wait...",
//   });

//   const { status, message } = await pending;

//   toast[status](message);

//   status === "success" && dispatch(getOPsAction());
// };

export const deleteProductAction = (_id) => async (dispatch) => {
  const pending = deleteProduct(_id);

  toast.promise(pending, {
    pending: "Please wait...",
  });

  const { status, message } = await pending;

  toast[status](message);

  status === "success" && dispatch(getProductsAction());
};
