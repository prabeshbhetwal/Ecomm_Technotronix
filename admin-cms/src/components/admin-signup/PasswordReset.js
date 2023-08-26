import React from "react";
import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../custom-input/CustomInput";

export const PasswordReset = ({ setForm }) => {
  return (
    <Form>
      <h3>Reset New Password</h3>
      <hr />

      <CustomInput label="OTP" type="number" placeholder="12345" />
      <CustomInput label="Password" type="password" placeholder="****" />
      <CustomInput
        label="Confirm Password"
        type="password"
        placeholder="****"
      />
      <div className="d-grid mt-3">
        <Button variant="dark">Reset Password</Button>
      </div>

      <div className="text-end py-3">
        Didn't receive OTP?{" "}
        <a onClick={() => setForm("otp")} href="#!">
          Request Again
        </a>
      </div>
    </Form>
  );
};
