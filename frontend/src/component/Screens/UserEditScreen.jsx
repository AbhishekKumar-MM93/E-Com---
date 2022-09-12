import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Row, Col, Button, FormGroup } from "react-bootstrap";
import Message from "./Message";
import Load from "./Loading";
import FormContainer from "./FormContainer";
import { getUserDetails } from "../../REDUX/actions/userAction";
import { useLocation, useNavigate, useParams, Link } from "react-router-dom";

export function UserEditScreen() {
  const userId = useParams().id;

  const [userData, setUserData] = useState();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {});

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit} onChange={handleChange}>
        <h1>SignUp</h1>

        {error && <Message variant="danger" message={error} />}
        {message && <Message variant="danger" message={message} />}
        {loading && <Load />}
        <FormGroup controlId="name">
          <Form.Label> Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Eneter name"
            name="name"
          ></Form.Control>
        </FormGroup>

        <FormGroup controlId="email">
          <Form.Label> Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Eneter email"
            name="email"
          ></Form.Control>
        </FormGroup>

        <FormGroup controlId="password">
          <Form.Label> Enter Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Eneter password"
            name="password"
          ></Form.Control>
        </FormGroup>

        <FormGroup controlId="confirmPassword">
          <Form.Label> Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
          ></Form.Control>
        </FormGroup>

        <Button type="submit" variant="primary" className="my-4">
          Update
        </Button>
      </Form>
    </FormContainer>
  );
}
