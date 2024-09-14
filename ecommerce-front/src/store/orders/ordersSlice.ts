import { createSlice } from "@reduxjs/toolkit"
import { TOrderItem, TLoading, isString } from "@types";
import actPlaceOrder from "./act/actPlaceOrder";
import actGetOrders from "./act/actGetOrders";

interface IOrderSlice {
    orderList: TOrderItem[];
    loading: TLoading;
    error: null | string;
}

const initialState: IOrderSlice = {
    orderList: [],
    loading: "idle",
    error: null,
};


const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        resetOrderStatus: (state) => {
            state.loading = "idle";
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(actPlaceOrder.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        })
        builder.addCase(actPlaceOrder.fulfilled, (state) => {
            state.loading = "succeeded";
            state.error = null;
        })
        builder.addCase(actPlaceOrder.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        })
        //get order
        builder.addCase(actGetOrders.pending, (state) => {
            state.loading = "pending";
            state.error = null;
        })
        builder.addCase(actGetOrders.fulfilled, (state, action) => {
            state.loading = "succeeded";
            state.orderList = action.payload;
        })
        builder.addCase(actGetOrders.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
                state.error = action.payload;
            }
        })
    }
});


export { actPlaceOrder, actGetOrders };
export const { resetOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
