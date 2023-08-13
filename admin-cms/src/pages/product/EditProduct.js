import React, { useEffect, useState } from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Button, Form } from "react-bootstrap";
import { CustomInput } from "../../components/custom-input/CustomInput";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SelectCategory } from "../../components/category/SelectCategory";
import { getNewProducts } from "../../helper/axios";
import { deleteProductAction, updateProductAction } from "./productAction";

const EditProduct = () => {
  const { _id } = useParams;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [imgs, setImgs] = useState([]);
  const [form, setForm] = useState({});
  const [imgToDelete, setImgToDelete] = useState({});

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
      name: "slug",
      label: "Slug",
      type: "text",
      value: form.sku,
      disabled: true,
    },
    {
      name: "sku",
      label: "SKU",
      type: "text",
      placeholder: "Sam-TV-90",
      required: true,
      value: form.sku,
      disabled: true,
    },
    {
      name: "qty",
      label: "QTY",
      type: "text",
      placeholder: "50",
      required: true,
      value: form.qty,
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      placeholder: "1000",
      required: true,
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
      value: form?.salesStartDate?.slice(0, 10),
    },
    {
      name: "salesEndDate",
      label: "Sales End Date",
      type: "Date",
      value: form?.salesEndDate?.slice(0, 10),
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      as: "textarea",
      placeholder: "Product Description",
      rows: "10",
      required: true,
      value: form.description,
    },
  ];

  const handleOnChange = (e) => {
    let { checked, name, value } = e.target;

    if (name === "thumbnail" && imgToDelete.includes(value)) {
      return alert(
        "You can't delete something that is chosen as default thumbnail. Choose another thumbnail first!"
      );
    }

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

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to update the product?")) {
      return;
    }
    const formDt = new FormData();

    // Remove - SKU, Slug, __v, createdAt, updatedAt
    let { sku, slug, __v, createdAt, updatedAt, ...rest } = form;

    // Remove all the url form rest.images which matches the urls in imgToDelete
    rest.images = rest.images.filter((url) => !imgToDelete.includes(url));

    for (let key in rest) {
      form.append(key, rest[key]);
    }

    if (imgs.length) {
      [...imgs].forEach((item) => {
        formDt.append("images", item);
      });
    }

    const isUpdated = await dispatch(updateProductAction(formDt));

    isUpdated && getSelectedProduct();
    setImgToDelete([]);
  };

  const handleOnDelete = async () => {
    if (window.confirm("Are you sure you want to delete?")) {
      const isDeleted = await dispatch(deleteProductAction(_id));

      isDeleted && navigate("/product");
    }
  };

  const handleOnDeleteSelect = async (e) => {
    const { value, checked } = e.target;
    if (value === form.thumbnail) {
      return alert(
        "You can't delete the thumbnail, choose another thumbnail first"
      );
    }
    checked
      ? setImgToDelete([...imgToDelete, value])
      : setImgToDelete(imgToDelete.filter((url) => true !== value));
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

          <div className="py-5 d-flex justify-content-between">
            {form.images?.map((url) => (
              <div>
                <div>
                  <input
                    type="radio"
                    name="thumbnail"
                    label="thumbnail"
                    value={url}
                    checked={url === form.thumbnail}
                    onChange={handleOnChange}
                  ></input>
                </div>
                <img
                  className="img-thumbnail"
                  key={url}
                  src={process.env.REACT_APP_ROOT_SERVER + url?.slice(6)}
                  alt=""
                  width="150px"
                ></img>
                <div>
                  <input
                    type="checkbox"
                    label="Delete"
                    value={url}
                    onChange={handleOnDeleteSelect}
                    checked={imgToDelete.includes(url)}
                  ></input>
                </div>
              </div>
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
            Update this Product
          </Button>
        </div>
        <div className="d-grid mt-3 mb-3">
          <Button variant="danger" type="submit" onClick={handleOnDelete}>
            Delete this Product
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditProduct;
