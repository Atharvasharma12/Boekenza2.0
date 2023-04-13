import React from "react";
import "./BuyerPage.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function BuyerPage() {
  const {
    productName,
    productCategory,
    productDiscription,
    productPrice,
    productImageURL,
  } = useSelector((state) => state.interestedProduct1);

  const { name, email, _id, isPresent } = useSelector((state) => state.custom);

  const handelContactBuyer = () => {
    const buyersProduct = {
      productName,
      productCategory,
      productDiscription,
      productPrice,
      productImageURL,
    };

    const id = toast.loading("Sending mail to Seller...", {
      closeButton: true,
    });
    axios
      .post("http://localhost:9191/buyerPage", {
        name,
        email,
        _id,
        isPresent,
        buyersProduct,
      })
      .then((res) => {
        if (res.data.message == "user not logged in") {
          toast.update(id, {
            render: "User not logged in",
            type: "error",
            isLoading: false,
            autoClose: 3000,
            hideProgressBar: false,
            closeButton: true,
          });
        } else {
          toast.update(id, {
            render: "Mail sent",
            type: "success",
            isLoading: false,
            autoClose: 3000,
            hideProgressBar: false,
            closeButton: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="selectedProduct">
        <div className="displayImage">
          <img src={productImageURL} alt="img" />
        </div>
        <div className="ProductDetails">
          <h1>{productName}</h1>
          <span>{productCategory}</span>
          <p>{productDiscription}</p>
          <h6>{productPrice}</h6>
          <button onClick={() => handelContactBuyer()}>contact buyer</button>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default BuyerPage;
