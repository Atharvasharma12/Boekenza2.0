import React from "react";
import { Link } from "react-router-dom";
import LoginPage from "./LoginPage";
import { BiSearchAlt2 } from "react-icons/bi";
import { useSelector } from "react-redux";

function Home() {
  const { products } = useSelector((state) => state.pList);

  return (
    <>
      <h1>Boekenza</h1>
      <BiSearchAlt2 />
      <Link to="/LoginPage" element={LoginPage}>
        <button>Login</button>
      </Link>

      <div>
        {products.map((singleProduct, id) => {
          return (
            <div key={id}>
              <h4>{singleProduct.productName}</h4>
              <h4>{singleProduct.productCategory}</h4>
              <h4>{singleProduct.productDiscription}</h4>
              <h4>{singleProduct.productPrice}</h4>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Home;
