import { configureStore } from "@reduxjs/toolkit";
import { userLoginData, productDetails, productList } from "./BReducers";

const store = configureStore({
  reducer: {
    custom: userLoginData,
    pdetail: productDetails,
    pList: productList,
  },
});

export default store;
