import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { verifyEmailAndCode } from "../../helper/axios";
import { toast } from "react-toastify";

const SignIn = () => {
  const [form, setForm] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const verificationResult = await verifyEmailAndCode(
      form.email,
      form.password
    );
    console.log(form.email, form.password);

    if (verificationResult.status === "success") {
      toast.success(verificationResult.message);
      window.location.href = "/user-profile";
    } else {
      toast.error(verificationResult.message);
    }
  };

  const inputs = [
    {
      label: "Email",
      name: "email",
      required: true,
      type: "text",
      placeholder: "Email",
    },
    {
      label: "Password",
      name: "password",
      required: true,
      type: "password",
      placeholder: "Password",
    },
  ];

  return (
    <div>
      <Form
        onSubmit={handleOnSubmit}
        style={{ width: "450px" }}
        className="m-auto border p-4 shadow-lg mt-5 rounded"
      >
        <h3>Sign In</h3>
        <hr />
        {inputs.map((itm, i) => (
          <Form.Group key={i}>
            <Form.Label>{itm.label}</Form.Label>
            <Form.Control
              type={itm.type}
              name={itm.name}
              placeholder={itm.placeholder}
              onChange={handleOnChange}
              required={itm.required}
            />
          </Form.Group>
        ))}

        <div className="d-grid mt-5">
          <Button variant="dark" type="submit">
            Sign In
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default SignIn;
