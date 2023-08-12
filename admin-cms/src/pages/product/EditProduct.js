import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { useDispatch } from "react-redux";
import { postNewProductAction } from "./productAction";
import { Link, useParams } from "react-router-dom";
import { SelectCategory } from "../../components/category/SelectCategory";
import { getNewProducts } from "../../helper/axios";

const initialState = {
  status: "inactive",
};

const EditProduct = () => {
  const { _id } = useParams;
  console.log(_id);

  const dispatch = useDispatch();
  const [imgs, setImgs] = useState([]);
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    getSelectedProduct();
  }, [dispatch]);

  const getSelectedProduct = async () => {
    const { products } = await getNewProducts();
    products?._id && setForm(products);
  };
  const inputs = [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "SamsungTV",
      require: true,
      value: form.name,
    },
    {
      name: "sku",
      label: "SKU",
      type: "text",
      placeholder: "Sam-TV-90",
      require: true,
      value: form.sku,
    },
    {
      name: "qty",
      label: "QTY",
      type: "text",
      placeholder: "50",
      require: true,
      value: form.qty,
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      placeholder: "1000",
      require: true,
      value: form.price,
    },
    {
      name: "salesPrice",
      label: "Sales Price",
      type: "number",
      placeholder: "800",
      value: form.salesPrice,
    },
    {
      name: "salesStartDate",
      label: "Sales Start Date",
      type: "Date",
      value: form.salesStartDate?.slice(0, 10),
    },
    {
      name: "salesEndDate",
      label: "Sales End Date",
      type: "Date",
      value: form.salesEndDate?.slice(0, 10),
    },
    {
      name: "description",
      label: "Desctextion",
      type: "text",
      as: "textarea",
      placeholder: "Product Description",
      rows: "10",
      require: true,
      value: form.description,
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

  const handleOnImageAttached = (e) => {
    const { files } = e.target;
    setImgs(files);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const formDt = FormData();
    for (let key in form) {
      console.log(key, form[key]);
    }
    if (imgs.length) {
      [...imgs].forEach((item) => {
        formDt.append("images", item);
      });
    }
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
              checked={form.status === "active"}
            />
          </Form.Group>
          <SelectCategory
            onChange={handleOnChange}
            name="parentCat"
            required={true}
            _id={form.parentCat}
          />
          {inputs.map((item, i) => (
            <CustomInput key={i} {...item} onChange={handleOnChange} />
          ))}

          <div className="py-5">
            {form.images?.map((url) => (
              <img
                className="img-thumbnail"
                key={url}
                src={
                  process.env.REACT_APP_ROOT_SERVER + form.images[0]?.slice(6)
                }
                alt=""
                width="300px"
              ></img>
            ))}
          </div>

          <Form.Group className="mb-3 mt-3">
            <Form.Control
              type="file"
              name="img"
              multiple
              onChange={handleOnImageAttached}
            />
          </Form.Group>
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

export default EditProduct;
