import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../Redux/authSlice.js";


const store = configureStore({
    reducer: {
        auth: authReducers,
    }
});

export default store;