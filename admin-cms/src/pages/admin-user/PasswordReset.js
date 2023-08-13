import React from "react";
import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../../components/custom-input/CustomInput";

const PasswordReset = () => {
  return (
    <>
      <Form>
        <h3>Request New Password</h3>
      </Form>
      <CustomInput label="OTP" />
      <CustomInput label="Password" />
      <CustomInput label="confirmPassword" />
      <div className="d-grid mt-3">
        <Button variant="dark">Reset OTP</Button>
      </div>
    </>
  );
};

export default PasswordReset;
