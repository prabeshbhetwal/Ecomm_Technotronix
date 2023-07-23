import categorySchema from "./categorySchema.js";

export const insertCategory = (obj) => {
  return categorySchema(obj).save();
};
export const getCategories = () => {
  return categorySchema.find();
};
export const updateCategoryById = (_id, obj) => {
  return categorySchema.findByIdAndUpdate(_id, obj, { new: true });
};
export const deleteCategory = (_id) => {
  return categorySchema.findByIdAndDelete(_id);
};
