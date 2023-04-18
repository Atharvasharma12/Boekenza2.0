import "./ProductList.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

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
                <img src={element.productImageURL} alt="img" />
                <h2>{element.productName}</h2>
                <p>{element.productDiscription}</p>
                <h6>{element.productPrice}/-</h6>
                {/* <button class="add_to_cart">Add to Cart</button> */}
              </div>
            );
          })}
      </div>
    </>
  );
}

export default ProductList;
