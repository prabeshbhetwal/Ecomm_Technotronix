import React from "react";
import Header from "../../components/layout/Header";
import AdminSignIn from "../../components/admin-signin/AdminSignIn";
import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <div>
      <Header />
      <main className="main">
        <AdminSignIn />
        <div className="text-center mt-3">
          Don't have an account? <Link to="/new-admin">Sign Up</Link>
        </div>
      </main>
    </div>
  );
};

export default SignIn;
