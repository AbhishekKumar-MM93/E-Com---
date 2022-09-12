import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Alert,
  ListGroupItem,
  Image,
  FormControl,
  Button,
  Card,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../../REDUX/actions/cartAction";
import { Link, useLocation, useParams, useNavigate } from "react-router-dom";

function CartScreen() {
  // get id
  const { id } = useParams();
  // get our query string location.. search is a pathName which we give in our nevagation
  const location = useLocation().search;
  // to get query string value
  const navigate = useNavigate();

  const qty = new URLSearchParams(location).get("qty");

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const handleCheckOut = (id) => {
    navigate({
      pathname: `/login?redirect=/shipping`,
    });
  };

  const removeFromCartHandler = (ID) => {
    //We getting id of Cart from state of redux
    dispatch(removeFromCart(ID));
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Alert variant="info">
            Your cart is Empty Please add some items first
            <Link
              to="/"
              style={{
                color: "red",
                paddingLeft: "10px",
              }}
            >
              GO Back
            </Link>
          </Alert>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroupItem key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/${item.product}`}>
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>₹{item.price}</Col>
                  <Col md={2}>
                    <FormControl
                      style={{ WebkitAppearance: " menulist" }}
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </FormControl>
                  </Col>
                  <Col>
                    <Button
                      variant="light"
                      onClick={(e) => removeFromCartHandler(item.product)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                SubTotal (
                {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)})
                item
              </h2>
              ₹
              {cartItems
                .reduce((acc, cur) => acc + cur.qty * cur.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroupItem>
              <Button
                disabled={cartItems.length === 0}
                onClick={handleCheckOut}
                className="btn-block"
              >
                Proceed To CheckOut
              </Button>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
