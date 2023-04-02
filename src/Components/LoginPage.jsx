import React, { useState } from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const [isUser, setIsUSer] = useState(false);
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
          if (
            res.data.message == "user mail not found" ||
            res.data.message == "password not matched"
          ) {
            toast.error(`${res.data.message}`, {
              position: "top-center",
              autoClose: 1200,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          } else
            toast.success(`${res.data.message}`, {
              position: "top-center",
              autoClose: 1200,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          // console.log(res.data.user);
          setIsUSer(res.data.user);
          //dispatch to set value using redux
          dispatch({
            type: "setUerData",
            payload: res.data.user,
          });
          //sending value for logout and login used in navbar
          dispatch({
            type: "isUser",
            payload: true,
          });
          // console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else
      toast.warning("invalid", {
        position: "top-center",
        autoClose: 1200,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  };

  //getting info of user of showing upload option
  const { isPresent } = useSelector((state) => state.custom);
  // console.log(isPresent);

  //for logout it willll empty isUser
  // const handelLogOut = () => {
  //   setIsUSer(isPresent);
  // };

  //selector to use values from reducres
  // const { name } = useSelector((state) => state.custom);

  return (
    <>
      {/* {isUser && isUser._id ? <h1>hello {name} </h1> : <h1>welcome</h1>} */}

      <div className="LoginFullPage">
        <div className="loginMain">
          <div className="loginBoxHeading">
            <h2>Login</h2>
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
              {isPresent ? (
                <div className="logoutButton">
                  <br />

                  <p>
                    <Link to="UploadProduct">
                      <button>Want to upload your product</button>
                    </Link>
                  </p>
                </div>
              ) : (
                <>
                  <br />
                  <div className="logoutButton">
                    <button onClick={handelLogin}>Login</button>
                    <div className="signUpButton">
                      <Link to="RegisterPage">
                        <button>Register</button>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default LoginPage;
