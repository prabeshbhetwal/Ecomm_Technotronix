import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../custom-input/CustomInput";

export const PasswordOTP = ({ handleOnOtpRequest }) => {
  const emailRef = useRef("");

  const handleOnOTPRequest = () => {
    const { value } = emailRef.current;
    if (value) {
      handleOnOtpRequest(value);
    }
  };

  return (
    <Form>
      <h3>Request OTP</h3>
      <hr />

      <CustomInput
        someRef={emailRef}
        label="Enter your email address"
        placeholder="sam@email.com"
      />
      <div className="d-grid mt-3">
        <Button variant="dark" onClick={handleOnOTPRequest}>
          Request OTP
        </Button>
      </div>
    </Form>
  );
};
