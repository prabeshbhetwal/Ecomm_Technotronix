import React from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { ProfilePage } from "./ProfilePage";

export const Profile = () => {
  return (
    <AdminLayout title="Profile">
      <ProfilePage />
    </AdminLayout>
  );
};
