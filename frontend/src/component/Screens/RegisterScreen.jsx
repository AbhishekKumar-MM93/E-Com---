import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Row, Col, Button, FormGroup } from "react-bootstrap";
import Message from "./Message";
import Load from "./Loading";
import FormContainer from "./FormContainer";
import { register } from "../../REDUX/actions/userAction";
import { useLocation, useNavigate, Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import Reaptcha from "reaptcha";
import axios from "axios";
export function RegisterScreen() {
  const [registerData, setRegisterData] = useState();
  const [siteKey, setSiteKey] = useState();
  const [message, setMessage] = useState();
  const [captchaToken, setCaptchaToken] = useState();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const captchaRef = useRef();

  const registerUserInfo = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = registerUserInfo;

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    async function getSiteKey() {
      const { data: googleSiteKey } = await axios.get(
        "http://localhost:3344/api/config/recaptcha",
        {
          headers: {
            publish_key: "PK_C2cZ9IGQZBCytX7wMvjevMKMP1idZ3BQopBpOg==",
            secret_key: "SK_LZnc3jfHw4d36ze55GQW3f97BTK7aE2rJBwLXEw=",
          },
        }
      );
      setSiteKey(googleSiteKey); //to get our siteKey from backend or env //env do not support so we do it in this way
    }
    getSiteKey();
    if (userInfo) navigate(redirect);
  }, [navigate, userInfo, redirect]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (captchaToken) {
      if (registerData?.password !== registerData?.confirmPassword) {
        setMessage("Password do not match");
      } else {
        dispatch(register(registerData));
      }
    }
  };

  const verify = () => {
    captchaRef.current
      .getResponse()
      .then((res) => setCaptchaToken(res))
      .catch((er) => console.log(er.message));
  };

  return (
    siteKey && (
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

          <FormGroup className="my-3">
            <Reaptcha
              sitekey={siteKey}
              ref={captchaRef}
              onVerify={verify}
            ></Reaptcha>
          </FormGroup>

          <Button
            type="submit"
            variant="primary"
            disabled={captchaToken ? false : true}
          >
            {" "}
            Register
          </Button>
        </Form>

        <Row className="py-3">
          <Col>
            All ready have an Account?{" "}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Login
            </Link>{" "}
          </Col>
        </Row>
      </FormContainer>
    )
  );
}
