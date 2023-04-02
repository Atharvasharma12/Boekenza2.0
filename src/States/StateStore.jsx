import { configureStore } from "@reduxjs/toolkit";
import {
  userLoginData,
  productDetails,
  productList,
  searchProduct,
} from "./BReducers";

const store = configureStore({
  reducer: {
    custom: userLoginData,
    pdetail: productDetails,
    pList: productList,
    searchProduct1: searchProduct,
  },
});

export default store;
