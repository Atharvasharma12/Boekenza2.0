import React, { useState } from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";


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
    setIsUSer(false);
  };

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
              {isUser ? (
                <div className="logoutButton">
                  <br />
                  <button onClick={handelLogOut}>Logout</button>

                  <p>
                    <Link to="UploadProduct">Want to upload your product </Link>
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
    </>
  );
}

export default LoginPage;
