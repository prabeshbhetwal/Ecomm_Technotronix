import { configureStore } from "@reduxjs/toolkit";
import catReducer from "./pages/category/categorySlice";
import systemReducer from "./system/systemSlice";
import adminReducer from "./pages/signin-signup/adminSlice";
import poReducer from "./pages/payment-option/poSlice";
import productReducer from "./pages/product/productSlice";

export default configureStore({
  reducer: {
    catInfo: catReducer,
    system: systemReducer,
    adminInfo: adminReducer,
    poInfo: poReducer,
    productInfo: productReducer,
  },
});
