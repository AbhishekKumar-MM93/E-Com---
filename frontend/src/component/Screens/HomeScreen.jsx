import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
// import products from "../../products";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../REDUX/actions/productActions";
import Product from "./Product";
import Load from "./Loading";
import Message from "./Message";
function HomeScreen() {
  const dispatch = useDispatch();
  const { error, loading, products } = useSelector(
    (state) => state.productList
  );
  useEffect(() => {
    dispatch(listProduct());
  }, [dispatch]);

  return (
    <main>
      {error ? (
        <Message variant={"danger"} message={error} />
      ) : loading ? (
        <Load />
      ) : (
        <Row>
          {products?.map((product) => (
            <Col md={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </main>
  );
}

export default HomeScreen;
