import { createReducer } from "@reduxjs/toolkit";

//
// const initialUserLogin = {
//   name: "Profile",
//   email: "",
//   _id: "",
// };
// const initialIsUser = {
//   isPresent: false,
// };

export const userLoginData = createReducer(
  { name: "Profile", _id: "logged in user id", isPresent: false, password: "" },
  {
    setUerData: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state._id = action.payload._id;
      state.password = action.payload.password;
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
  productId: "",
  productUploadDate: "",
};

export const productDetails = createReducer(initialProductDetails, {
  setProductDetails: (state, action) => {
    state.productName = action.payload.productName;
    state.productCategory = action.payload.productCategory;
    state.productDiscription = action.payload.productDiscription;
    state.productPrice = action.payload.productPrice;
    state.productImageURL = action.payload.productImageURL;
    state.productId = action.payload.productId;
    state.productUploadDate = action.payload.productUploadDate;
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

//product details that buyer selected from the list of product
const initialSelectedProduct = {
  productName: "",
  productCategory: "",
  productDiscription: "",
  productPrice: "",
  productImageURL: "",
};
export const interestedProduct = createReducer(initialSelectedProduct, {
  setSeletedProduct: (state, action) => {
    state.productName = action.payload.productName;
    state.productCategory = action.payload.productCategory;
    state.productDiscription = action.payload.productDiscription;
    state.productPrice = action.payload.productPrice;
    state.productImageURL = action.payload.productImageURL;
  },
});

const initialUserItems = {
  userItems: [],
};
export const userItems = createReducer(initialUserItems, {
  setuserItems: (state, action) => {
    state.userItems = action.payload;
  },
}); 