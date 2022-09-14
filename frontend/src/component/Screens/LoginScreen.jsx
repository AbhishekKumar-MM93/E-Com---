import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "./FormContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, FormGroup } from "react-bootstrap";
import Message from "./Message";
import Load from "./Loading";
import { login } from "../../REDUX/actions/userAction";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();/

function LoginScreen() {
  const [userData, setUserData] = useState();
  const [siteKey, setSiteKey] = useState();
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

  useEffect(() => {
    async function getSiteKey() {
      const { data: googleSiteKey } = await axios.get(
        "http://localhost:3344/api/config/recaptcha"
      );
      setSiteKey(googleSiteKey);
    }
    getSiteKey();
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]); //dependences, if any of one chnages than it will reload our data
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(userData));
  };

  return (
    siteKey && (
      <FormContainer>
        <Form onSubmit={handleSubmit} onChange={handleChange}>
          <h1>LogIn</h1>

          {error && <Message variant="danger" message={error} />}
          <FormGroup controlId="email">
            <Form.Label> Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Eneter Email"
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

          <FormGroup className="my-3">
            <ReCAPTCHA sitekey={siteKey} />
          </FormGroup>

          <Button type="submit" variant="primary">
            {" "}
            Sign In
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            New Customer?{" "}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
            >
              Register
            </Link>{" "}
          </Col>
        </Row>
      </FormContainer>
    )
  );
}

export default LoginScreen;
