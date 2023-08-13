import React from "react";
import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../../components/custom-input/CustomInput";

const PasswordOTP = () => {
  return (
    <>
      <Form>
        <h3>Request OTP</h3>
      </Form>

      <CustomInput label="email">
        <div className="d-grid mt-3">
          <Button variant="dark">Reset OTP</Button>
        </div>
      </CustomInput>
    </>
  );
};

export default PasswordOTP;
