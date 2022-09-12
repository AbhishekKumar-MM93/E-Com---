import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import Load from "./Loading";
import Message from "./Message";
import { listUsers, deleteUsers } from "../../REDUX/actions/userAction";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function UserListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, users, error } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDeleted } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, successDeleted]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUsers(id));
        Swal.fire("Deleted!", " User has been deleted.", "success");
      }
    });
  };

  return (
    <>
      <h1>Users</h1>
      {loading ? (
        <Load />
      ) : error ? (
        <Message variant={"danger"} message="User Not Found" />
      ) : (
        <Table
          striped
          bordered
          hover
          responsive
          className="table-sm"
          style={{ textAlign: "center" }}
        >
          <thead>
            <tr>
              <td>ID</td>
              <td>NAME</td>
              <td>EMAIL</td>
              <td>ADMIN</td>
              <td>Edit</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>

                <td className="d-flex justify-content-around align-items-center">
                  <Link to={`admin/users/${user._id}/edit`}>
                    <i
                      class="fa-solid fa-user-pen"
                      style={{ color: "orange" }}
                    ></i>
                  </Link>

                  <i
                    className="fas fa-trash"
                    onClick={(e) => handleDelete(user._id)}
                    style={{ color: "crimson" }}
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default UserListScreen;
