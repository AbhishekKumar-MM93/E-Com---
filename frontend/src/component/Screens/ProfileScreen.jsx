import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Row, Col, Button, FormGroup, Table } from "react-bootstrap";
import Message from "./Message";
import Load from "./Loading";
import FormContainer from "./FormContainer";
import {
  getUserDetails,
  updateUserProfile,
} from "../../REDUX/actions/userAction";
import { listMyOrder } from "../../REDUX/actions/orderActions";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

export function ProfileScreen() {
  const [userProfile, setUserProfile] = useState();
  const [message, setMessage] = useState();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const Details = useSelector((state) => state.userDetails);
  const { loading, error, user } = Details;

  const userLogin = useSelector((state) => state.userLogin); // if user logged in only then we get detail of user
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { sucess } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrder, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user.name) {
        dispatch(getUserDetails("profile"));
        dispatch(listMyOrder()); // this is the id term in our user action--
      } else {
        setUserProfile({
          name: user.name,
          email: user.email,
        });
      }
    }
  }, [dispatch, navigate, userInfo, user]);

  const handleChange = (e) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userProfile?.password !== userProfile?.confirmPassword) {
      setMessage("Password do not match");
    } else {
      dispatch(updateUserProfile({ ...userProfile, id: user.id })); //this is the user we pass in action (user)
    }
  };

  return (
    <Row>
      <Col md={3}>
        <Form onSubmit={handleSubmit} onChange={handleChange}>
          <h2>User Profile</h2>

          {error && <Message variant="danger" message={error} />}
          {sucess && <Message variant="success" message={"Profile Updated"} />}
          {message && <Message variant="danger" message={message} />}
          {loading && <Load />}
          <FormGroup controlId="name">
            <Form.Label> Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Eneter name"
              name="name"
              value={userProfile?.name}
            ></Form.Control>
          </FormGroup>

          <FormGroup controlId="email">
            <Form.Label> Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Eneter email"
              name="email"
              value={userProfile?.email}
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
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Order</h2>
        {loadingOrder ? (
          <Load />
        ) : errorOrders ? (
          <Message variant={"danger"} message={errorOrders} />
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELEVRED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.toString(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.toString(0, 10)
                    ) : (
                      <i className="fas-fa-times" style={{ color: "red" }}></i> // icon do not work need to change
                    )}
                  </td>
                  <td>
                    {order.isDeliverd ? (
                      order.deliveredAt.toString(0, 10)
                    ) : (
                      <i className="fas-fan-times" style={{ color: "red" }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant="light" className="btn-sm">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}
