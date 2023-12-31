import React from "react";
import { AdminLayout } from "../../components/layout/AdminLayout";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = () => {
  return (
    <AdminLayout title="Product">
      <div className="text-end">
        <Link to="/new-product">
          <Button variant="primary"> + Add New Product</Button>
        </Link>
      </div>
    </AdminLayout>
  );
};

export default Product;
