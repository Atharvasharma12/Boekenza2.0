import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
function ProductList() {
  const dispatch = useDispatch();
  const [item, setItem] = useState([]);

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
      <h1>items</h1>

      {item.map((element, id) => {
        return (
          <div key={id}>
            <h6>
              itme name - {element.productName} , price - Rs.
              {element.productPrice}/-
            </h6>
          </div>
        );
      })}
    </>
  );
}

export default ProductList;
