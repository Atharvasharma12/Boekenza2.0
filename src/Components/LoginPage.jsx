import React, { useState } from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

function LoginPage() {
  const [isUser, setIsUSer] = useState({});
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handelChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const dispatch = useDispatch();

  const handelLogin = () => {
    const { email, password } = userData;
    if (email && password) {
      axios
        .post("http://localhost:9191/loginpage", userData)
        .then((res) => {
          alert(res.data.message);

          //dispatch to set value using redux
          dispatch({
            type: "setUerData",
            payload: res.data.user,
          });
          setIsUSer(res.data.user);
        })
        .catch((err) => alert(err));
    } else alert("invalid");
  };

  //for logout it willll empty isUser
  const handelLogOut = () => {
    setIsUSer({});
  };

  //selector to use values from reducres
  const { name, _id } = useSelector((state) => state.custom);

  return (
    <>
      {isUser && isUser._id ? (
        <h1>
          hello {name} user id is {_id}{" "}
        </h1>
      ) : (
        <h1>welcom</h1>
      )}

      <div className="lolo">
        <div className="loginMain">
          <div className="loginBoxHeading">
            <h4>Login</h4>
          </div>
          <div className="loginForm">
            <label>User Name</label>
            <input
              name="email"
              value={userData.email}
              onChange={handelChange}
              type="text"
              placeholder="Email"
            />
            <br />
            <label>Password</label>
            <input
              name="password"
              value={userData.password}
              onChange={handelChange}
              type="password"
              placeholder="Password"
            />
            <div className="loginButton">
              {isUser && isUser._id ? (
                <div>
                  <button onClick={handelLogOut}>Logout</button>
                  <Link to="UploadProduct">
                    <button>Upload Product</button>
                  </Link>
                </div>
              ) : (
                <button onClick={handelLogin}>Login</button>
              )}
            </div>
            <div className="signUpButton">
              <Link to="RegisterPage">
                <button>Register</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
