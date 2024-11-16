import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import UserReducer from "./toolkit/UserSlicer.jsx";
import ProductReducer from "./toolkit/ProductsSlicer.jsx";

const store = configureStore({
    reducer: {
        user: UserReducer,
        products: ProductReducer,
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
    </Provider>
);
