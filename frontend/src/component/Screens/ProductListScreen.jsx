import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Row, Col, Image } from "react-bootstrap";
import Load from "./Loading";
import Message from "./Message";
import { listProduct, deleteProduct } from "../../REDUX/actions/productActions";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function ProductListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const { success } = productDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProduct());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, success, userInfo]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id));
        if (success)
          Swal.fire("Deleted!", " User has been deleted.", "success");
      }
    });
  };

  const createProductHandler = (product) => {
    console.log("create product handlers");
  };

  return (
    <>
      <Row className="align-items-center mb-2">
        <Col>
          <h1>Products Lists</h1>
        </Col>

        <Col className="text-end ">
          <Button onClick={createProductHandler}>
            <i class="fa-solid fa-sparkles" style={{ color: "orange" }}></i>
            Create Product
          </Button>
        </Col>
      </Row>

      {loading ? (
        <Load />
      ) : error ? (
        <Message variant={"danger"} message="User Not Found" />
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className="table-sm"
          style={{
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <thead>
            <tr style={{ text: "" }}>
              <td>ID</td>

              <td>IMAGE</td>
              <td>NAME</td>
              <td>PRICE</td>
              <td>CATEGORY</td>
              <td>Brand</td>
              <td>IN STOCK</td>
              <td>Edit</td>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="text-align-bottum">
                <td>{product._id}</td>

                <td>
                  <Image
                    src={product.image}
                    alt={product.name}
                    fluid
                    rounded
                    style={{ width: "80px", height: "60px" }}
                  />
                </td>
                <td>{product.name}</td>
                <td>&#8377;{product.price}</td>

                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                </td>
                <td
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.4rem",
                  }}
                >
                  <Link to={`/admin/product/${product._id}/edit`}>
                    <i
                      className="fa-solid fa-pen-to-square"
                      style={{ color: "orange" }}
                    ></i>
                  </Link>

                  <i
                    className="fas fa-trash"
                    onClick={(e) => handleDelete(product._id)}
                    style={{ color: "crimson" }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default ProductListScreen;
