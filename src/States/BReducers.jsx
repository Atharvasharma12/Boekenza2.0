import { createReducer } from "@reduxjs/toolkit";

//
const initialUserLogin = {
  name: "logged in user",
  _id: "logged in user id",
};

export const userLoginData = createReducer(initialUserLogin, {
  setUerData: (state, action) => {
    state.name = action.payload.name;
    state._id = action.payload._id;
    console.log(action.payload);
  },
});

//product details
const initialProductDetails = {
  productName: "",
  productCategory: "",
  productDiscription: "",
  productPrice: "",
};

export const productDetails = createReducer(initialProductDetails, {
  setProductDetails: (state, action) => {
    state.productName = action.payload.productName;
    state.productCategory = action.payload.productCategory;
    state.productDiscription = action.payload.productDiscription;
    state.productPrice = action.payload.productPrice;
  },
});

const initialProductList = {
  products: [
    {
      productName: "item 1",
      productCategory: "book",
      productDiscription: "this is discription of a product",
      productPrice: 399,
      productImg: "book5.png",
    },
    {
      productName: "item 2",
      productCategory: "book",
      productDiscription: "this is discription of a product",
      productPrice: 399,
      productImg: "book5.png",
    },
    {
      productName: "item 3",
      productCategory: "book",
      productDiscription: "this is discription of a product",
      productPrice: 399,
      productImg: "book5.png",
    },
    {
      productName: "item 4",
      productCategory: "book",
      productDiscription: "this is discription of a product",
      productPrice: 399,
      productImg: "book5.png",
    },
    {
      productName: "item 5",
      productCategory: "book",
      productDiscription: "this is discription of a product",
      productPrice: 399,
      productImg: "book5.png",
    },
    {
      productName: "item 6",
      productCategory: "book",
      productDiscription: "this is discription of a product",
      productPrice: 399,
      productImg: "book5.png",
    },
  ],
};

export const productList = createReducer(initialProductList, {
  setProductList: (state, action) => {
    state.products = action.payload;
  },
});
