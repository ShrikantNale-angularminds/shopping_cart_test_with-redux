import { createSlice } from "@reduxjs/toolkit";

const PaginationSlice = createSlice({
    name: 'pagination',
    initialState: {
        page: 1,
        currentPage: 1,
        itemsPerPage: 5,
        displayPages: 3,
    },
    reducers: {
        setPage: (state, { payload }) => {
            state.page = payload;
        },
        setCurrentPage: (state, { payload }) => {
            state.currentPage = payload;
        },
        setItemsPerPage: (state, { payload }) => {
            state.itemsPerPage = payload;
        },

    }
})

export const { setPage, setCurrentPage, setItemsPerPage } = PaginationSlice.actions;

export default PaginationSlice.reducer;