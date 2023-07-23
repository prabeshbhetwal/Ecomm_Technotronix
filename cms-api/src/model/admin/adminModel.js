import adminSchema from "./adminSchema.js";

export const insertAdmin = (obj) => {
  return adminSchema(obj).save();
};
export const getAdminByEmail = (email) => {
  return adminSchema.findOne({ email });
};
export const updateAdminById = (_id, obj) => {
  return adminSchema.findByIdAndUpdate(_id, obj, { new: true });
};
export const deleteAdmin = (_id) => {
  return adminSchema.findByIdAndDelete(_id);
};
