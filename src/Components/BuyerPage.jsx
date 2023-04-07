import React from "react";
import "./BuyerPage.css";
import { useSelector } from "react-redux";
function BuyerPage() {
  const {
    productName,
    productCategory,
    productDiscription,
    productPrice,
    productImageURL,
  } = useSelector((state) => state.interestedProduct1);

  const handelContactBuyer = () => {};

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
    </>
  );
}

export default BuyerPage;
