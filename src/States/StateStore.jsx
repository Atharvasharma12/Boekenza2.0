import { configureStore } from "@reduxjs/toolkit";
import {
  userLoginData,
  productDetails,
  productList,
  searchProduct,
  interestedProduct,
  userItems,
} from "./BReducers";

const store = configureStore({
  reducer: {
    custom: userLoginData,
    pdetail: productDetails,
    pList: productList,
    searchProduct1: searchProduct,
    interestedProduct1: interestedProduct,
    userItems1: userItems,
  },
});

export default store;
