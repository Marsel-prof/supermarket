import { configureStore } from "@reduxjs/toolkit";
import userToken from "./Service/auth/userToken";
import CategorySlice from "./Service/Category/GetCategory";
import { dummyJsonApi } from "./Apis/dummyJson";
import CartSlice from "./Service/cart/quantity";

export default configureStore({
  reducer: {
    userToken: userToken,
    categories: CategorySlice,
    cart: CartSlice,
    // API routes
    dummyJsonApi: dummyJsonApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat([dummyJsonApi.middleware]);
  },
});