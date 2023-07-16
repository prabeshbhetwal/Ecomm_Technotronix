import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

const AdminSignUp = () => {
  const formFields = [
    {
      label: "First Name:",
      type: "text",
      name: "firstName",
      placeholder: "Prabesh",
      required: true,
    },
    {
      label: "Last Name:",
      type: "text",
      name: "lastName",
      placeholder: "Bhetwal",
      required: true,
    },
    {
      label: "Email:",
      type: "email",
      name: "email",
      placeholder: "jarvis.pc123@gmai.co",
      required: true,
    },
    {
      label: "Address:",
      type: "textarea",
      name: "address",
      placeholder: "123 sydney st",
      required: true,
    },
    {
      label: "Phone Number:",
      type: "number",
      placeholder: "03405230403",
      name: "phone",
      required: true,
    },
    {
      label: "Password:",
      type: "password",
      name: "password",
      placeholder: "*******",
      required: true,
    },
    {
      label: "Confirm Password:",
      type: "password",
      name: "confirmpassword",
      placeholder: "*******",
      required: true,
    },
  ];

  const [form, setForm] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <>
      <Container style={{ margin: "auto" }}>
        <div>
          <h2 className="text-center">Admin Sign Up</h2>
          <Form onSubmit={handleOnSubmit}>
            {formFields.map(({ name, label, type, required, placeholder }) => (
              <Form.Group key={name}>
                <Form.Label>{label}</Form.Label>
                <Form.Control
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  onChange={handleOnChange}
                  required={required}
                />
              </Form.Group>
            ))}
            <div className="d-grid">
              <br />
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default AdminSignUp;
