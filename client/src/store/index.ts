import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { rootReducer } from "./reducers";

const configureStoreWrapper = () =>
  configureStore({
    reducer: rootReducer,
  });

const store = configureStoreWrapper();

export const wrapper = createWrapper(configureStoreWrapper, {
  debug: true,
});

export default store;
