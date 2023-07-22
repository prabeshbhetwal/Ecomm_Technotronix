import React from "react";

import Header from "../../components/layout/Header";
import { AdminSignup } from "../../components/admin-signup/AdminSignUp";

const SignUp = () => {
  return (
    <div>
      <Header />
      <main className="main">
        <AdminSignup />
      </main>
    </div>
  );
};

export default SignUp;
