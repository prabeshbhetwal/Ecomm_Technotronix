import React, { useState } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { useDispatch } from "react-redux";
import { postNewProductAction } from "./productAction";
import { Link } from "react-router-dom";
import { SelectCategory } from "../../components/category/SelectCategory";

const initialState = {
  status: "inactive",
};

const NewProduct = () => {
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const inputs = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "SamsungTV",
      require: true,
    },
    {
      name: "sku",
      label: "SKU",
      type: "text",
      placeholder: "Sam-TV-90",
      require: true,
    },
    {
      name: "qty",
      label: "QTY",
      type: "text",
      placeholder: "50",
      require: true,
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      placeholder: "1000",
      require: true,
    },
    {
      name: "salesPrice",
      label: "Sales Price",
      type: "number",
      placeholder: "800",
    },
    {
      name: "salesStartDate",
      label: "Sales Start Date",
      type: "Date",
    },
    {
      name: "salesEndDate",
      label: "Sales End Date",
      type: "Date",
    },
    {
      name: "description",
      label: "Desctextion",
      type: "text",
      as: "textarea",
      placeholder: "Product Description",
      rows: "10",
      require: true,
    },
  ];

  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;

    if (name === "status") {
      value = checked ? "active" : "inactive";
    }

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(postNewProductAction(form));
  };

  return (
    <AdminLayout title="New Product">
      <Link to="/product">
        <Button variant="secondary">&lt; Back</Button>
      </Link>
      <div>
        <Form onSubmit={handleOnSubmit}>
          <Form.Group className="mb-3">
            <Form.Check
              name="status"
              type="switch"
              label="Status"
              onChange={handleOnChange}
            />
          </Form.Group>
          <SelectCategory
            onChange={handleOnChange}
            name="parentCat"
            required={true}
          />
          {inputs.map((item, i) => (
            <CustomInput key={i} {...item} onChange={handleOnChange} />
          ))}
        </Form>
        <div className="d-grid mt-3 mb-3">
          <Button variant="success" type="submit">
            Add Product
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewProduct;
