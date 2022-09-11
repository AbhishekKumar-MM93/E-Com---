import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Row, Col, Button, FormGroup } from "react-bootstrap";
import Message from "./Message";
import Load from "./Loading";
import FormContainer from "./FormContainer";
import { register } from "../../REDUX/actions/userAction";
import { useLocation, useNavigate, Link } from "react-router-dom";

export function RegisterScreen() {
  const [registerData, setRegisterData] = useState();
  const [message, setMessage] = useState();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const registerUserInfo = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = registerUserInfo;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (registerData?.password !== registerData?.confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(register(registerData));
    }
  };



  useEffect(() => {
    if (userInfo) navigate(redirect);
  }, [navigate, userInfo, redirect]);

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
          {" "}
          Register
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          All ready have an Account?{" "}
          <Link to={redirect ? `/signup?redirect=${redirect}` : "/login"}>
            Login
          </Link>{" "}
        </Col>
      </Row>
    </FormContainer>
  );
}
