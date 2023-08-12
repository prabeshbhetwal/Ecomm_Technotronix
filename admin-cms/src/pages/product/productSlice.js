import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, { payload }) => {
      if (
        state.products?.length === 0 &&
        payload?.length === 0 &&
        payload === undefined
      ) {
        return;
      }

      state.products = payload;
    },
  },
});

const { reducer, actions } = productsSlice;

export const { setProducts } = actions;

export default reducer;
