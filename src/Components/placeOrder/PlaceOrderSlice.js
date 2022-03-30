import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const PlaceOrderSlice = createSlice({
    name: 'placeOrder',
    initialState: {
        result: {}
    },
    reducers: {
        setResult: (state, { payload }) => {
            state.result = payload;
        }
    }
})

export const placeOrder = (payload) => async (dispatch, getState) => {
    await axios
        .post(`http://interviewapi.ngminds.com/api/placeOrder`, payload)
        .then((res) => dispatch(setResult(res.data)))
        .catch(err => console.log(err))
}

export const { setResult } = PlaceOrderSlice.actions;

export default PlaceOrderSlice.reducer;