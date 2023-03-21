import React from "react";
import { Link } from "react-router-dom";
import LoginPage from "./LoginPage";
import { BiSearchAlt2 } from "react-icons/bi";
import { useSelector } from "react-redux";



function Home() {
  //use selector function of redux use to get values from reduxStore
  const { products } = useSelector((state) => state.pList);

  return (
    <>
      <h1>Boekenza</h1>
      <BiSearchAlt2 />
      <Link to="/LoginPage" element={LoginPage}>
        <button>Login</button>
      </Link>

      <div>
        {/* map is higher order fuction use to iterate every item present in object */}
        {products.map((singleProduct, id) => {
          return (
            //we have to give key to every div created from map to make evry item unique
            <div key={id}>
              <img src={singleProduct.productImg} alt="img" />
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
