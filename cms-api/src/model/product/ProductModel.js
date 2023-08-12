import productSchema from "./ProductSchema.js";

export const insertProduct = (obj) => {
  return productSchema(obj).save();
};

export const getProducts = (obj) => {
  return productSchema.find();
};

export const getProductById = (obj) => {
  return productSchema.findById();
};

export const findOneProductByFilter = ({ filter }) => {
  return productSchema.findOne(filter);
};

export const updateProductById = ({ _id, ...rest }) => {
  return productSchema.findByIdAndUpdate(_id, rest);
};

export const deleteProductById = (_id) => {
  return productSchema.findByIdAndDelete(_id);
};
