import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "./FormContainer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, FormGroup } from "react-bootstrap";
import Message from "./Message";
import Load from "./Loading";
import { login } from "../../REDUX/actions/userAction";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import Reaptcha from "reaptcha";

function LoginScreen() {
  const [userData, setUserData] = useState();
  const [siteKey, setSiteKey] = useState();
  const [captchaToken, setCaptchaToken] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const captchaRef = useRef(null);
  // const token = captchaRef.current.getValue();

  const userLogin = useSelector((state) => state.userLogin); // calling our state from reducer
  const { loading, error, userInfo } = userLogin;
  // console.log(userInfo);

  const redirect = location.search ? location.search.split("=")[1] : "/"; // to get query string value we use location

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const getSiteKey = async () => {
      const { data: googleSiteKey } = await axios.get(
        "http://localhost:3344/api/config/recaptcha",
        {
          headers: {
            publish_key: "PK_C2cZ9IGQZBCytX7wMvjevMKMP1idZ3BQopBpOg==",
            secret_key: "SK_LZnc3jfHw4d36ze55GQW3f97BTK7aE2rJBwLXEw=",
          },
        }
      );
      setSiteKey(googleSiteKey);
    };
    getSiteKey();
  }, []);
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]); //dependences, if any of one chnages than it will reload our data

  //<---------------------------------------->//

  const handleSubmit = (e) => {
    e.preventDefault();
    if (captchaToken) {
      dispatch(login(userData));
    }
  };
  const verify = () => {
    captchaRef.current
      .getResponse()
      .then((res) => setCaptchaToken(res))
      .catch((er) => console.log(er.message));
    console.log("Verify Called");
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
            <Form.Label> Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Eneter password"
              name="password"
            ></Form.Control>
          </FormGroup>

          <FormGroup className="my-3">
            <Reaptcha onVerify={verify} sitekey={siteKey} ref={captchaRef} />
          </FormGroup>

          <Button
            disabled={captchaToken ? false : true}
            type="submit"
            variant="primary"
          >
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
