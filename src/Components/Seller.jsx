import React from "react";
import { useState } from "react";
import axios from "axios";

function Seller() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handelRegister = () => {
    //extracting name email and password from user data
    const { name, email, password } = userData;
    //axios to send data to the link
    //cheking condition for not empty
    if (name && email && password) {
      alert("posted");
      axios
        .post("http://localhost:9191/register", userData)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    } else {
      alert("invalid");
    }
  };
  return (
    <>
      <h1>This is seller page</h1>
      <p>Register to proced</p>

      <div>
        <input
          type="text"
          name="name"
          value={userData.name}
          onChange={handelChange}
          placeholder="enter name"
        />
        <br />
        <input
          type="email"
          name="email"
          value={userData.email}
          onChange={handelChange}
          placeholder="email"
        />
        <br />
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handelChange}
          placeholder="password"
        />
        <br />
        <button onClick={handelRegister}>Register</button>
      </div>
    </>
  );
}

export default Seller;
