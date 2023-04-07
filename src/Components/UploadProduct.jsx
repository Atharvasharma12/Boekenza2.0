import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./UploadProduct.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UploadProduct() {
  //selecting name of logged in user from reducer
  const { name, email } = useSelector((state) => state.custom);

  //useDispatch for insert value using dispatcher
  const dispatch = useDispatch();
  console.log(email);
  const [productDetail, setProductDetail] = useState({
    productName: "",
    productCategory: "",
    productDiscription: "",
    productPrice: "",
    productImageURL: "",
    SellerName: name,
    SellerEmailID: email,
  });

  const [image, setImage] = useState();

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
    const {
      productName,
      productCategory,
      productDiscription,
      productPrice,
      productImageURL,
    } = productDetail;
    if (
      productName &&
      productCategory &&
      productDiscription &&
      productImageURL != "" &&
      productPrice > 0
    ) {
      //sending product detail to backendend using axios
      axios
        .post("http://localhost:9191/UploadProduct", {
          productDetail,
          name,
          email,
        })
        .then((res) => {
          console.log(res);
          // alert(res.data.message);
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
        })
        .catch((err) => console.log(err));
    } else {
      // alert("Invalid");
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
    }

    console.log(productDetail);
  };

  const handelImageUpload = () => {
    const imageForm = new FormData();
    imageForm.append("file", image);
    imageForm.append("upload_preset", "Boekenza");
    // console.log(imageForm);
    const id = toast.loading("uploading...", { closeButton: true });
    axios
      .post("https://api.cloudinary.com/v1_1/diyl2r9z2/image/upload", imageForm)
      .then((res) => {
        //do something else
        toast.update(id, {
          render: "All is good",
          type: "success",
          isLoading: false,
          autoClose: 3000,
          hideProgressBar: false,
          closeButton: true,
        });
        console.log(res.status);
        console.log("uploaded to cloudinary");
        // console.log(res.data.secure_url);
        // alert("image uploaded successfully");
        setProductDetail({
          ...productDetail,
          productImageURL: res.data.secure_url,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h1>Enter details of the Product</h1>
      <h1>hello {name}</h1>

      <div className="mainForm">
        <div>
          {/* <div className="heading">
            <h5>fill the details of your product</h5>
          </div> */}
          <div className="itemDetails">
            <div>
              <label htmlFor="">Item Name</label>
              <br />
              <input
                type="text"
                placeholder="Enter Product Name"
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
              <div>
                <input
                  class="choose_file"
                  type="file"
                  name=""
                  id=""
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <br />
                <button class="btn" onClick={handelImageUpload}>
                  Upload Image
                </button>
              </div>
            </div>
            <button class="submit_btn" onClick={handelSubmit}>
              Submit
            </button>
          </div>
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

export default UploadProduct;
