import { useEffect } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { Form, Link } from "react-router-dom";
import { deleteProductAction, getProductsAction } from "./productAction";

const ProductTable = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.productInfo());

  useEffect(() => {
    dispatch(getProductsAction());
  }, [dispatch]);

  return (
    <div className="mt-5">
      <div className="d-flex justify-content-between mb-3">
        <div>10 Products Found</div>
        <div>
          <Form.Control type="text" placeholder="Search by product name...">
            {" "}
          </Form.Control>
        </div>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Thumbnail</th>
            <th>Status</th>
            <th>Name</th>
            <th>QTY</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, i) => (
            <tr key={item._id}>
              <td>{i + 1}</td>
              <td>
                <img
                  src={
                    process.env.REACT_APP_ROOT_SERVER + item.images[0]?.slice(6)
                  }
                  alt=""
                  width="150px"
                ></img>
              </td>
              <td>
                <h3>{item.name}</h3>
                Price: {item.price}
              </td>
              <td>{item.qty}</td>
              <td>
                <Link to={`/product/edit/${item.id}`}>
                  <Button variant="warning">Edit</Button>
                </Link>
                <Button
                  variant="danger"
                  onClick={() => dispatch(deleteProductAction(item._id))}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ProductTable;
