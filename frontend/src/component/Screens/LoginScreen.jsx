import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "./FormContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, FormGroup } from "react-bootstrap";
import Message from "./Message";
import Load from "./Loading";
import { login } from "../../REDUX/actions/userAction";

function LoginScreen() {
  const [userData, setUserData] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin); // calling our state from reducer
  const { loading, error, userInfo } = userLogin;
  // console.log(userInfo);

  const redirect = location.search ? location.search.split("=")[1] : "/"; // to get query string value we use location

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
    // console.log("Handle Submit Called", userData);
  };

  useEffect(() => {
    //it will redirect us if we already login
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]); //dependences, if any of one chnages than it will reload our data

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit} onChange={handleChange}>
        <h1>LogIn</h1>

        {error && <Message variant="danger" message={error} />}
        {loading && <Load />}
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
        <Button type="submit" variant="primary" className="my-4">
          {" "}
          Sign In
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>{" "}
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
