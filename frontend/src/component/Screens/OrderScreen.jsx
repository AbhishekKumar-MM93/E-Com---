import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";

import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  Row,
  ListGroup,
  Card,
  Image,
  ListGroupItem,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import Message from "./Message";
import { Link } from "react-router-dom";
import { getOrderDetails, payOrder } from "../../REDUX/actions/orderActions";
import { ORDER_PAY_RESET } from "../../REDUX/constants/orderConstants";
import Load from "./Loading";

function OrderScreen() {
  const orderID = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sdkReady, setSdkReady] = useState(false);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientID } = await axios.get(
        "http://localhost:3344/api/config/paypal"
      );
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || order._id !== orderID || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderID));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [order, orderID, dispatch, successPay]);

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderID, paymentResult));
  };

  return loading ? (
    <Load />
  ) : error ? (
    <Message variant="danger" message={error} />
  ) : (
    <>
      <h1 style={{ fontWeight: "100px" }}>Order Id: {order._id}</h1>

      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                {" "}
                <strong>Name: </strong> {order.user.name}{" "}
              </p>
              <p>
                {" "}
                <strong>Email: </strong>{" "}
                <a href={`mailto: ${order.user.email}`}>{order.user.email}</a>{" "}
              </p>
              <p>
                <strong>Address : </strong>
                {order.shippingAddress.country}, {order.shippingAddress.city}{" "}
                <br />
                {order.shippingAddress.state}, {order.shippingAddress.address}{" "}
                <br /> PinCode : {order.shippingAddress.pincode} <br />
                Mobile : {order.shippingAddress.mobile}
              </p>
              {order.isDelivered ? (
                <Message
                  variant={"success"}
                  message={`Delivered On : ${order.deliveredAt}`}
                />
              ) : (
                <Message variant={"danger"} message={"Not Delivered Yet"} />
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>

              <p>
                {" "}
                <strong>Method : </strong>
                {order.paymentMethod}{" "}
              </p>
              {order.isPaid ? (
                <Message
                  variant={"success"}
                  message={`Paid On : ${order.paidAt}`}
                />
              ) : (
                <Message variant={"danger"} message={"Not Paid Yet"} />
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Item</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems?.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>

                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}{" "}
                          </Link>
                        </Col>

                        <Col md={4}>
                          {item.qty} x &#x20b9;{item.price} = &#x20b9;
                          {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items :</Col>
                  <Col>&#x20b9;{order.itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping Price :</Col>
                  <Col>&#x20b9;{order.shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax Price :</Col>
                  <Col>&#x20b9;{order.taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price :</Col>
                  <Col>&#x20b9;{order.totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>

              {!order.isPaid && (
                <ListGroupItem>
                  {loadingPay && <Load />}
                  {!sdkReady ? (
                    <Load />
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroupItem>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default OrderScreen;
