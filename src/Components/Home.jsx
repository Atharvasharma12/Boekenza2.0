import React from "react";

import { useSelector } from "react-redux";
import ProductList from "./ProductList";

import Slider from "./Slider";
import Categories from "./Categories";
import Products from "./Products";
import Contact from "./Contact";
import Footer from "./Footer";

function Home() {
  //use selector function of redux use to get values from reduxStore
  const { products } = useSelector((state) => state.pList);

  return (
    <>
      <Slider />
      <Categories />
      <Products />
      <Contact />
      <Footer />

      <div>
        {/* map is higher order fuction use to iterate every item present in object
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
        })} */}
      </div>

      <ProductList />
    </>
  );
}

export default Home;
