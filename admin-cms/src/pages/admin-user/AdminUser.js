import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { AdminSignup } from "../../components/admin-signup/AdminSignUp";

const AdminUser = () => {
  return (
    <AdminLayout>
      <AdminSignup />
    </AdminLayout>
  );
};

export default AdminUser;
