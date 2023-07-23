import React, { useEffect } from "react";
import AdminSignIn from "../admin-signin/AdminSignIn";
import Header from "../layout/Header";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
// import { Link } from "react-router-dom";
import { verifyUserAction } from "../../pages/signin-signup/adminAction";

const EmailVerified = () => {
  const location = useLocation();

  const email = new URLSearchParams(location.search).get("e");

  const verificationCode = new URLSearchParams(location.search).get("c");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const verificationResult = await verifyUserAction({
          email,
          verificationCode,
        });

        if (verificationResult.status === "success") {
          toast.success(verificationResult.message);

          window.location.href = "/user-profile";
        } else {
          toast.error(verificationResult.message);
        }
      } catch (error) {
        console.log("Error checking verification status:", error);
      }
    };
    verifyEmail();
  }, [email, verificationCode]);

  return (
    <>
      <Header />
      <div className="text-center mt-5">
        <h1>Thank you for verifying your email.</h1>
        <p>You can now sign in.</p>
        {/* <Link to="/">Go to SignIn page</Link> */}
      </div>
      <AdminSignIn />
    </>
  );
};

export default EmailVerified;
