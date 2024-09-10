import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosErrorHandler from "@utils/axiosErrorHandler";

type TFormData = {
    email: string;
    password: string;
}

type TResponse = {
    accessToken: string;
    user: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    }
}

const actAuthLogin = createAsyncThunk("auth/actAuthlogin", async (formData: TFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
        const res = await axios.post<TResponse>("/login", formData);
        return res.data
    } catch (error) {
        return rejectWithValue(axiosErrorHandler(error));
    }
})

export default actAuthLogin;