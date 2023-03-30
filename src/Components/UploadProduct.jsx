import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./UploadProduct.css";

function UploadProduct() {
  //selecting name of logged in user from reducer
  const { name } = useSelector((state) => state.custom);

  //useDispatch for insert value using dispatcher
  const dispatch = useDispatch();

  const [productDetail, setProductDetail] = useState({
    productName: "",
    productCategory: "",
    productDiscription: "",
    productPrice: "",
  });

  const handelOnChange = (event) => {
    const { name, value } = event.target;
    setProductDetail({
      ...productDetail,
      [name]: value,
    });
  };
  console.log(productDetail);

  const handelSubmit = () => {
    dispatch({
      type: "setProductDetails",
      payload: productDetail,
    });

    //cheking for empty form
    const { productName, productCategory, productDiscription, productPrice } =
      productDetail;
    if (
      productName &&
      productCategory &&
      productDiscription &&
      productPrice > 0
    ) {
      //sending product detail to backendend using axios
      axios
        .post("http://localhost:9191/UploadProduct", productDetail)
        .then((res) => {
          console.log(res);
          alert(res.data.message);
        })
        .catch((err) => console.log(err));
    } else {
      alert("Invalid");
    }
  };

  return (
    <>
      <h1>Enter details of the Product</h1>
      <h1>hello {name}</h1>

      <div className="mainForm">
        <div>
          <div className="heading">
            <h5>fill the details of your product</h5>
          </div>
          <div className="itemDetails">
            <div>
              <label htmlFor="">Item Name</label>
              <br />
              <input
                type="text"
                placeholder="enter product name"
                name="productName"
                value={productDetail.productName}
                onChange={handelOnChange}
              />
            </div>
            <br />
            <div>
              <label htmlFor="">Category</label>
              <br />
              <select name="productCategory" id="" onChange={handelOnChange}>
                <option>Select category</option>
                <option value="book">book</option>
                <option value="electronic">Electronic</option>
                <option value="EDItem">Engineering Drawing item</option>
              </select>
            </div>
            <br />
            <div>
              <label htmlFor="">Description</label>
              <br />
              <input
                type="text"
                placeholder="Descripiton of Product"
                onChange={handelOnChange}
                value={productDetail.productDiscription}
                name="productDiscription"
              />
            </div>
            <br />
            <div>
              <label htmlFor="">Price of Product</label>
              <br />
              <input
                type="number"
                placeholder="Product Price"
                value={productDetail.productPrice}
                name="productPrice"
                onChange={handelOnChange}
              />
            </div>
            <button onClick={handelSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UploadProduct;
