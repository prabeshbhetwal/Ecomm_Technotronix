import React from "react";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";

export const SelectCategory = (props) => {
  const { cats } = useSelector((state) => state.catInfo());
  return (
    <Form.Group className="mb-3">
      <Form.Select {...props}>
        <option value="">---Select One---</option>
      </Form.Select>
    </Form.Group>
  );
};
