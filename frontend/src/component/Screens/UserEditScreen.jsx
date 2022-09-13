import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Row, Col, Button, FormGroup } from "react-bootstrap";
import Message from "./Message";
import Load from "./Loading";
import FormContainer from "./FormContainer";
import {
  getUserByAdmin,
  updateUserByAdmin,
} from "../../REDUX/actions/userAction";
import { useNavigate, useParams, Link } from "react-router-dom";
import { USER_UPDATE_BY_ADMIN_RESET } from "../../REDUX/constants/userConstants";

export function UserEditScreen() {
  const userId = useParams().id;
  const navigate = useNavigate();

  const [userData, setUserData] = useState();
  const [check, setCheck] = useState();

  const dispatch = useDispatch();

  const userGetByAdmin = useSelector((state) => state.userGetByAdmin);
  const { loading, error, userByAdmin } = userGetByAdmin;

  const userUpdateByAdmin = useSelector((state) => state.userUpdateByAdmin);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdateByAdmin;

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
    setCheck({ ...check, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData, check);
    dispatch(
      updateUserByAdmin(userId, {
        name: userData.name,
        email: userData.email,
        isAdmin: check.isAdmin,
        isVerified: check.isVerified,
      })
    );
  };

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_BY_ADMIN_RESET });
      navigate("/admin/userlist");
    } else {
      if (userByAdmin?._id !== userId) {
        dispatch(getUserByAdmin(userId));
      } else {
        setUserData({
          name: userByAdmin.name,
          email: userByAdmin.email,
        });
        setCheck({
          isAdmin: userByAdmin.isAdmin,
          isVerified: userByAdmin.isVerified,
        });
      }
    }
  }, [dispatch, userByAdmin, userId, successUpdate]);

  return (
    <>
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>
        {loading ? (
          <Load />
        ) : error ? (
          <Message variant={"danger"} message={error} />
        ) : (
          <Form onSubmit={handleSubmit} onChange={handleChange}>
            <FormGroup controlId="name">
              <Form.Label> Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Eneter name"
                name="name"
                value={userData?.name}
              ></Form.Control>
            </FormGroup>

            <FormGroup controlId="email">
              <Form.Label> Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Eneter email"
                name="email"
                value={userData?.email}
              ></Form.Control>
            </FormGroup>

            <FormGroup controlId="isadmin">
              <Form.Check
                type="checkbox"
                name="isAdmin"
                label="Is Admin"
                checked={check?.isAdmin}
              ></Form.Check>
            </FormGroup>

            <FormGroup controlId="isVerified">
              <Form.Check
                type="checkbox"
                label="Is Verified"
                name="isVerified"
                checked={check?.isVerified}
              ></Form.Check>
            </FormGroup>

            <Button type="submit" variant="primary" className="my-4">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
}
