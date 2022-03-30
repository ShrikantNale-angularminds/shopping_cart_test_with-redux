import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const HomeSlice = createSlice({
    name: 'home',
    initialState: {
        allProducts: [],
    },
    reducers: {
        setAllProducts: (state, { payload }) => {
            state.allProducts = payload;
        }
    }
})

export const getAllProducts = () => async (dispatch, getState) => {
    const res = await axios.get(
        `http://interviewapi.ngminds.com/api/getAllProducts`
    );
    console.log(res.data.products);
    dispatch(setAllProducts(res.data.products));
}

export const { setAllProducts } = HomeSlice.actions;

export default HomeSlice.reducer;