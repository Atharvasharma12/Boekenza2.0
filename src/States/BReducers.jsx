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
    // console.log(action.payload);
  },
});

//product details
const initialProductDetails = {
  productName: "",
  productCategory: "",
  productDiscription: "",
  productPrice: "",
  productImageURL: "",
};

export const productDetails = createReducer(initialProductDetails, {
  setProductDetails: (state, action) => {
    state.productName = action.payload.productName;
    state.productCategory = action.payload.productCategory;
    state.productDiscription = action.payload.productDiscription;
    state.productPrice = action.payload.productPrice;
    state.productImageURL = action.payload.productImageURL;
  },
});

const initialProductList = {
  products: [],
};

export const productList = createReducer(initialProductList, {
  setProductList: (state, action) => {
    state.products = action.payload;
  },
});
