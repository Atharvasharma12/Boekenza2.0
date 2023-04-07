import "./ProductList.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import BuyerPage from "./BuyerPage";
import { Link } from "react-router-dom";

function ProductList() {
  const dispatch = useDispatch();
  const [item, setItem] = useState([]);
  const { productNameForSearch } = useSelector((state) => state.searchProduct1);

  // console.log(productNameForSearch);
  useEffect(() => {
    const gettingData = () => {
      axios
        .get("http://localhost:9191/products")
        .then((res) => {
          setItem(res.data);
          dispatch({
            type: "setProductList",
            payload: res.data,
          });
        })
        .catch((err) => console.log(err));
    };
    gettingData();
  }, [dispatch]);

  const handelIAmIntersted = (selectedProduct) => {
    console.log(selectedProduct);
  };

  return (
    <>
      <h1 class="items">Items</h1>

      <div className="mainProductsDiv">
        {item
          .filter((element) =>
            element.productName.toLowerCase().includes(productNameForSearch)
          )
          .map((element, id) => {
            return (
              <div key={id} className="productDiv">
                <div className="imageDiv">
                  <img src={element.productImageURL} alt="img" />
                </div>
                <div>
                  <span>{element.productCategory}</span>
                  <div className="ProductNamePrice">
                    <h2>{element.productName}</h2>
                    <h6>Rs.{element.productPrice}/-</h6>
                  </div>
                  <p>{element.productDiscription}</p>
                  <Link to="/BuyerPage" element={<BuyerPage />}>
                    <div className="InterestedButton">
                      <button
                        class="add_to_cart"
                        onClick={() => handelIAmIntersted(element)}
                      >
                        I Am Interested
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default ProductList;
