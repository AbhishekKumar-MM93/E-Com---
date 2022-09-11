import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import products from "../products";
import {
  Row,
  Col,
  Image,
  ListGroup,
  ListGroupItem,
  Button,
  FormControl,
} from "react-bootstrap";
import Rating from "./Rating";
import { useDispatch, useSelector } from "react-redux";
import { singleProduct } from "../../REDUX/actions/productActions";
import Load from "./Loading";

function ProjectScreen() {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  let { id } = useParams();

  const { error, loading, product } = useSelector(
    (state) => state.productDetail
  );

  useEffect(() => {
    dispatch(singleProduct(id));
  }, [dispatch]);

  const addToCartHandler = () => {
    navigate({
      pathname: `/cart/${id}`,
      search: `qty=${qty}`,
    });
  };

  return (
    <main>
      <Link className="btn btn-light my-3" to={"/"}>
        Go Back
      </Link>

      {error ? (
        <h2>{error}</h2>
      ) : loading ? (
        <Load />
      ) : (
        <Row className="my-2">
          <Col md={6}>
            <Image src={product?.image} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroupItem as={"h3"}>{product?.name}</ListGroupItem>
              <ListGroupItem as={"h3"}>&#x20b9;{product?.price}</ListGroupItem>
              <ListGroupItem>
                <Rating
                  value={product?.rating}
                  text={`${product?.numReviews} reviews `}
                />
              </ListGroupItem>
              <ListGroupItem>{product?.description}</ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <ListGroup variant="">
              <ListGroupItem>Price:&#x20b9;{product?.price}</ListGroupItem>
              <ListGroupItem>
                Status:
                {product?.countInStock <= 0 ? " Out Of Stock" : " In Stock"}
              </ListGroupItem>

              {product?.countInStock > 0 && (
                <ListGroupItem>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <FormControl
                        style={{ WebkitAppearance: " menulist" }}
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </FormControl>
                    </Col>
                  </Row>
                </ListGroupItem>
              )}

              <ListGroupItem>
                <Button
                  onClick={addToCartHandler}
                  variant="dark"
                  style={{ width: "100%" }}
                  disabled={product?.countInStock <= 0}
                >
                  Add to Cart
                </Button>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      )}
    </main>
  );
}

export default ProjectScreen;
