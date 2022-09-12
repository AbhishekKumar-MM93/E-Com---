import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, FormGroup, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addPaymentMethod } from "../../REDUX/actions/cartAction";
import FormContainer from "./FormContainer";
import CheckoutSteps from "./CheckoutSteps";
function PaymentSreen() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate("/shipping");
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <FormContainer>
        <h1>Payment Method</h1>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Form.Label>Select Method</Form.Label>
            <Col>
              <Form.Check
                type="radio"
                label="PayPal or Credit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                onClick={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type="radio"
                label="EMI"
                id="EMI"
                name="paymentMethod"
                value="EMI"
                onClick={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type="radio"
                label="UPI"
                id="UPI"
                name="paymentMethod"
                value="UPI"
                onClick={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type="radio"
                label="Cash On Delivery"
                id="Cash On Delivery"
                name="paymentMethod"
                value="Cash On Delivery"
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </FormGroup>

          <Button type="submit" variant="primary" className="my-3">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
}

export default PaymentSreen;
