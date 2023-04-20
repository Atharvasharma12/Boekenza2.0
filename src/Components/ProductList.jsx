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

    dispatch({
      type: "setSeletedProduct",
      payload: selectedProduct,
    });
  };

  
  
  return (
    <>
      <h1 class="items">Items</h1>

      <div className="mainProductsDiv">
        {item

          .filter((element) => {
            return (
              element.productName
                .toLowerCase()
                .includes(productNameForSearch) &&
              element.productCategory
                .toLowerCase()
                .includes(productNameForSearch)
            );
          })
          .map((element, id) => {
            return (
              <div class="product-card">
                <div class="badge">Hot</div>
                <div class="product-tumb">
                  <img src={element.productImageURL} alt="" />
                </div>
                <div class="product-details">
                  <span class="product-catagory">
                    {element.productCategory}
                  </span>
                  <h4>
                    <a href="">{element.productName}</a>
                  </h4>

                  <div class="product-bottom-details">
                    <div class="product-price">Rs.{element.productPrice}/-</div>
                    <div class="product-links">
                      <Link to="/BuyerPage" element={<BuyerPage />}>
                        <div className="InterestedButton">
                          <button
                            class="add_to_cart"
                            onClick={() => handelIAmIntersted(element)}
                          >
                            BUY
                          </button>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default ProductList;
