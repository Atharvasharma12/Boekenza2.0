import { createReducer } from "@reduxjs/toolkit";

//
const initialUserLogin = {
  name: "Profile",
  email: "",
  _id: "",
};
// const initialIsUser = {
//   isPresent: false,
// };

export const userLoginData = createReducer(
  { name: "Profile", _id: "logged in user id", isPresent: false },
  {
    setUerData: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state._id = action.payload._id;
      // console.log(initialUserLogin.name);
      // console.log(action.payload);
    },
    isUser: (state, action) => {
      state.isPresent = action.payload;
    },
  }
);

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

const initialSearch = {
  productNameForSearch: "",
};

export const searchProduct = createReducer(initialSearch, {
  setSearchProduct: (state, action) => {
    state.productNameForSearch = action.payload;
  },
});