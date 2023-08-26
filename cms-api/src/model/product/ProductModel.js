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

//@filter, @updateObj must be an obj
export const updateproduct = (filter, updateObj) => {
  return productSchema.findOneAndUpdate(filter, updateObj, { new: true });
};

export const deleteProductById = (_id) => {
  return productSchema.findByIdAndDelete(_id);
};
