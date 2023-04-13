import React, { useState } from "react";
import axios from "axios";
import "./RegisterPage.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RegisterPage() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  //this function save data which is stored in placeholder
  const handelChange = (data) => {
    const { name, value } = data.target;

    setUserData({
      // we use ... (spread operator) to save the last change also , without this it will only save the latest word enterd by user
      ...userData,
      [name]: value, //[key] : value   here name and value will change accordingly with input tags
    });
  };

  const [showOtp, setShowOtp] = useState(false);
  // const handelOtp = () => {
  //   const { name, email, password, confirmPassword, otp } = userData;
  //   console.log(otp);
  //   if (name && email && password && password === confirmPassword) {
  //     setShowOtp(true);
  //     if (showOtp) {
  //       axios
  //         .post("http://localhost:9191/register", userData)
  //         .then((res) => alert(res.data.message))
  //         .catch((err) => alert(err));
  //     }
  //   } else alert("invalid");
  // };

  // const handelRegister = () => {
  //   const { name, email, password, confirmPassword } = userData;

  //   //to check all the conditions
  //   if (name && email && password && password === confirmPassword) {
  //     axios
  //       .post("http://localhost:9191/register", userData)
  //       .then((res) => alert(res.data.message))
  //       .catch((err) => alert(err));
  //     setShowOtp(true);
  //   } else alert("invalid");
  // };

  const generateOTP = () => {
    const { name, email, password, confirmPassword } = userData;
    if (name && email && password && password == confirmPassword) {
      axios
        .post("http://localhost:9191/generateotp", userData)
        .then((res) => {
          console.log(res);
          // alert(res.data.message);
          toast.success(res.data.message, {
            position: "top-center",
            autoClose: 1200,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          // console.log(res.data.isPresent);
          res.data.isPresent ? setShowOtp(false) : setShowOtp(true);
        })
        .catch((err) => console.log(err));
    } else {
      alert("Invalid");
    }
  };

  const verifyotp = () => {
    axios
      .post("http://localhost:9191/verifyotp", userData)
      .then((res) => {
        console.log(res);
        // alert(res.data.message);
        toast.success(res.data.message, {
          position: "top-center",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="lolo">
        <div className="registerMain">
          <div className="registerBoxHeading">
            <h4>Sign Up</h4>
          </div>
          <div className="registerForm">
            <label>Name</label>

            <input
              value={userData.name}
              name="name"
              type="text"
              placeholder="Enter your name"
              onChange={handelChange}
            />
            <br />
            <label>Email</label>
            <input
              value={userData.email}
              name="email"
              type="text"
              placeholder="Enter your mail id"
              onChange={handelChange}
            />
            <br />
            <label>Password</label>
            <input
              value={userData.password}
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={handelChange}
            />
            <br />
            <label>Confirm Password</label>
            <input
              value={userData.confirmPassword}
              name="confirmPassword"
              type="Password"
              placeholder="Enter again your Password"
              onChange={handelChange}
            />

            <div className="registerButton">
              <button onClick={toggleModal}>Buy Membership plan</button>
            </div>

            {modal && (
              <div className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content">
                  <h2>
                    Welcome to our membership plan for selling books on our
                    application. We have designed a special membership plan to
                    make selling books easier and more affordable for our
                    sellers.
                  </h2>
                  <p>
                    Under this membership plan, sellers can sell their books for
                    a period of 10 days by paying a nominal fee of just Rs. 10.
                    This means that you can list as many books as you want on
                    our platform and sell them to potential buyers within 10
                    days.
                    <br />
                    <br />
                    The membership plan is a great opportunity for sellers who
                    want to make quick sales without spending too much money on
                    advertising or listing fees. By paying just Rs. 10, you can
                    get your books in front of our large audience of book
                    lovers, who are always looking for new books to read.
                    <br />
                    <br />
                    So if you're a book seller who wants to sell your books
                    quickly and affordably, then our membership plan is perfect
                    for you. Sign up now and start selling your books on our
                    application today!
                  </p>
                  <br />
                  <br />
                  <button
                    onClick={() => {
                      toggleModal();
                      generateOTP();
                    }}
                  >
                    Buy
                  </button>
                  <button className="close-modal" onClick={toggleModal}>
                    CLOSE
                  </button>
                </div>
              </div>
            )}

            {showOtp ? (
              <>
                <div className="enterOTPMainBox">
                  <br />
                  <label>Enter OTP</label>
                  <input
                    name="otp"
                    value={userData.otp}
                    onChange={handelChange}
                    type="text"
                    placeholder="OTP"
                  />
                  <span>An otp is sent to your mail id</span>
                  <button onClick={verifyotp}>Verify</button>
                  <button onClick={generateOTP}>Resend otp</button>
                </div>
              </>
            ) : (
              <></>
            )}
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


export default RegisterPage;
