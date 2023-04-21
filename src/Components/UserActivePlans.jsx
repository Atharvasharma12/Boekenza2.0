import React from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./UserActivePlans.css";

function UserActivePlans() {
  const { userItems } = useSelector((state) => state.userItems1);
  const { email, password } = useSelector((state) => state.custom);
  const userData = { email, password };
  const dispatch = useDispatch();

  axios
    .post("http://localhost:9191/loginpage", userData)
    .then((res) => {
      //logged in user total uploaded items according to plan

      dispatch({
        type: "setuserItems",
        payload: res.data.userItems,
      });
    })
    .catch((err) => console.log(err));

  return (
    <>
      <div className="mainProductDiv">
        {userItems.map((element) => {
          const currentTime = new Date().getTime();
          const diff = element.productExpiryDate - new Date().getTime();
          var days = Math.floor(diff / (1000 * 60 * 60 * 24));
          var hours = Math.floor(
            (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((diff % (1000 * 60)) / 1000);
          // console.log(element.productExpiryDate);
          return (
            <div className="singleProductDiv">
              <div className="imageDiv">
                <img src={element.productImageURL} alt="" />
              </div>
              <div>
                <h6>{element.productName}</h6>
              </div>
              <div>
                <h6>Rs.{element.productPrice}/-</h6>
              </div>
              <div>
                <h6>
                  {"0" + days} days {hours < 10 ? "0" + hours : hours} hours{" "}
                  {minutes < 10 ? "0" + minutes : minutes} minutes{" "}
                  {seconds < 10 ? "0" + seconds : seconds} seconds left
                </h6>
              </div>
              {/* <button>Renew</button> */}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default UserActivePlans;
