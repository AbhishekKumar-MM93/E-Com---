import React, { useState } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import FormContainer from "./FormContainer";
import { useSelector, useDispatch } from "react-redux";
import { addShippingAddress } from "../../REDUX/actions/cartAction";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";

function ShippingScreen() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [userAddress, setUserAddress] = useState({
    country: shippingAddress.country,
    city: shippingAddress.city,
    state: shippingAddress.state,
    address: shippingAddress.address,
    pincode: shippingAddress.pincode,
    mobile: shippingAddress.mobile,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserAddress({ ...userAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(addShippingAddress(userAddress));
    navigate("/payment");
  };

  return (
    <>
      <CheckoutSteps step1 step2 />
      <FormContainer>
        <h1>Shipping</h1>
        <Form onSubmit={handleSubmit} onChange={handleChange}>
          <FormGroup controlId="country">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Eneter Your country"
              name="country"
              value={userAddress?.country}
              required
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId="city">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="Eneter Your City"
              name="city"
              value={userAddress?.city}
              required
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId="state">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              placeholder="Eneter Your State"
              name="state"
              value={userAddress?.state}
              required
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Eneter Your Address"
              name="address"
              value={userAddress?.address}
              required
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId="pincode">
            <Form.Label>PinCode</Form.Label>
            <Form.Control
              type="text"
              placeholder="Eneter Your PinCode"
              name="pincode"
              value={userAddress?.pincode}
              required
            ></Form.Control>
          </FormGroup>
          <FormGroup controlId="mobile">
            <Form.Label>Mobile No.</Form.Label>
            <Form.Control
              type="text"
              placeholder="Eneter Your Mobile Number"
              name="mobile"
              value={userAddress?.mobile}
              required
            ></Form.Control>
          </FormGroup>

          <Button type="submit" variant="primary" className="my-3">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
}

export default ShippingScreen;
