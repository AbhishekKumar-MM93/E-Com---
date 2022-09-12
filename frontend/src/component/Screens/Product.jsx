import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { useNavigate, Link } from "react-router-dom";

// here we use our props name as product which we give in HomeScreens to access the products
function Product({ product }) {
  let Navigate = useNavigate();
  return (
    <div>
      <Card className="my-3 p-3">
        <Link to={`/${product._id}`}>
          <Card.Img variant="top" src={product.image} />
        </Link>
        <Card.Body>
          <Link
            to={`/${product._id}`}
            style={{
              textDecoration: "none",
            }}
          >
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <Card.Text as="h4" className="my-3">
            ₹{product.price}
          </Card.Text>
          <Card.Text>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews `}
            />
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Product;

