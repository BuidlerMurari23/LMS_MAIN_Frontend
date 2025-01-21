import { data } from "react-router-dom";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast";
import axiosInstance from "../Helpers/axiosInstance.js"


const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    data: (() => {
        try {
            const storeData = localStorage.getItem('data');
            return (storeData) ? JSON.parse(storeData) : {};
        } catch (e) {
            console.error("Error in parsing localStorage data", e);
            return {};
        }
    }),
    role: localStorage.getItem('role') || "",
    };


export const createAccount = createAsyncThunk("/user/register", async (data) => {
    try {
        const res = axiosInstance.post("/user/register", data);
        toast.promise(res, {
            loading: "Wait! Creating your account.",
            success: (data) => {
                return (data)?.data?.message;
            },
            error: "Sorry! Failed to create account."
        });

        return (await res).data;
    } catch (e) {
        toast.error(e?.response?.data?.message);
    }
});


export const login = createAsyncThunk('/user/login', async (data) => {
    try {
       const res = axiosInstance.post('/user/login', data);
       toast.promise(res, {
        loading: "Wait! Logging in.",
        success: (data) => {
            return (data)?.data?.message;
        },
        error: "Sorry! Failed to login."
       });

       return (await res).data;
    } catch (e) {
        toast.error(e.message);
    }
});

export const logout = createAsyncThunk("/user/logout", async (data) => {
    try {
        const res = axiosInstance.post('/user/logout', data);
        toast.promise(res, {
            loading: "Wait! Logging out.",
            success: (data) => {
                return (data)?.data?.message;
            },
            error: "Sorry! Failed to logout."
        })
    } catch (e) {
        toast.error(e.message)
    }
});


export const getUserData = createAsyncThunk("/user/details", async () => {
    try {
        const res = await axiosInstance.get('/user/me');
        return res?.data;
    } catch (e) {
        toast.error(e.message)
    }
});


export const changePassword = createAsyncThunk("/user/changePassword", async (userPassword) => {
    try {
        const res = axiosInstance.post("/user/changePassword", userPassword);
        toast.promise(res, {
            loading: "loading....",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Sorry! Failed to change password."
        });

        return (await res).data;
    } catch (e) {
        toast.error(e.message);
    }
});


export const forgotPassword = createAsyncThunk("/user/forgotPassword", async (email) => {
    try {
        const res = axiosInstance.post('/user/reset', {email});
        toast.promise(res, {
            loading: "loading...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Sorry! Failed to send verification email."
        });

        return (await res).data;
    } catch (e) {
        toast.error(e.message);   
    }
});


export const resetPassword = createAsyncThunk("/user/resetPassword", async (data) => {
    try {
        const res = axiosInstance.post(`/user/reset/${data.resetToken}`, {password: data.password});
        toast.promise(res, {
            loading: "Resetting...",
            success: (data) => {
                return (data)?.data?.message;
            },
            error: "Sorry! Failed to reset password."
        });

        return (await res).data;
    } catch (e) {
        toast.error(e.message);
    }
});

export const updateProfile = createAsyncThunk("/user/updateProfile", async (data) => {
    try {
        const res = axiosInstance.put(`/user/update/${data[0]}`, data[1]);
        toast.promise(res, {
            loading: "Wait! Updating...",
            success: (data) => {
                return (data)?.data?.message;
            },
            error: "Sorry! Failed to update profile."
        })
    } catch (e) {
        toast.error(e.message);
    }
});




const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(login.fulfilled, (state, action) => {
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("role", action?.payload?.user?.role);

            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })
        .addCase(logout.fulfilled, (state) => {
            localStorage.clear();
            state.isLoggedIn = false;
            state.data = {};
            state.role = "";
        })
        .addCase(getUserData.fulfilled, (state, action) => {
            localStorage.setItem('isLoggedIn', true);
            localStorage.setItem("data", JSON.stringify(action?.payload?.user));
            localStorage.setItem("role", action?.payload?.user?.role);

            state.isLoggedIn = true;
            state.data = action?.payload?.user;
            state.role = action?.payload?.user?.role;
        })
    }
});


export default authSlice.reducer;

