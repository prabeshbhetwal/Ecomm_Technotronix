import React, { useState } from "react";
import { Footer } from "../../components/layout/Footer";
import { Header } from "../../components/layout/Header";

import { requestPassOTP } from "../../helper/axios";
import { toast } from "react-toastify";
import { Alert, Container } from "react-bootstrap";
import { PasswordOTP } from "../../components/admin-signup/PasswordOTP";
import { PasswordReset } from "../../components/admin-signup/PasswordReset";

const ResetPassword = () => {
  const [form, setForm] = useState("otp");

  const [resp, setResp] = useState({});

  const handleOnOtpRequest = async (email) => {
    if (!email.includes("@") && !email.includes(".")) {
      return toast.error("Invalid email");
    }
    const pending = requestPassOTP(email);
    toast.promise(pending, {
      pending: "please wait....",
    });

    const result = await pending;
    setResp(result);
    setForm("reset");
  };

  const forms = {
    otp: <PasswordOTP handleOnOtpRequest={handleOnOtpRequest} />,
    reset: <PasswordReset setForm={setForm} />,
  };

  return (
    <>
      <Header />
      <main className="main pt-5">
        {resp.message && (
          <Container>
            <Alert variant={resp.status === "success" ? "success" : "danger"}>
              {resp.message}
            </Alert>
          </Container>
        )}
        <div className="d-flex reset-pass">
          {/* requeset opt form */}
          {forms[form]}

          {/* rest password form  */}
        </div>
      </main>
      <Footer />;
    </>
  );
};

export default ResetPassword;
