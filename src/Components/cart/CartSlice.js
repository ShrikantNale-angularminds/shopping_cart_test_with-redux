import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: localStorage.getItem("cartItems") === null ? [] : JSON.parse(localStorage.getItem("cartItems")),
        totalAmount: 0,
    },
    reducers: {
        addProduct: (state, { payload }) => {
            const cartItems = JSON.parse(localStorage.getItem("cartItems"));
            if (cartItems === null) {
                let arr = [];
                payload = { ...payload, quantity: 1 };
                arr.push(payload);
                localStorage.setItem("cartItems", JSON.stringify(arr));
                state.cartItems = arr;
            } else {
                let arr = JSON.parse(localStorage.getItem("cartItems"));
                const item = arr.filter((item) => item._id === payload._id);
                if (item.length > 0) {
                    arr = arr.map((item) =>
                        item._id !== payload._id
                            ? item
                            : { ...item, quantity: item.quantity ? item.quantity + 1 : 2 }
                    );
                    localStorage.setItem("cartItems", JSON.stringify(arr));
                    state.cartItems = arr;
                } else {
                    payload = { ...payload, quantity: 1 };
                    arr.push(payload);
                    localStorage.setItem("cartItems", JSON.stringify(arr));
                    state.cartItems = arr;
                }
            }
        },
        decrementQuantity: (state, { payload }) => {
            state.cartItems = state.cartItems.map((product) =>
                product._id !== payload._id
                    ? product
                    : { ...product, quantity: product.quantity - 1 }
            )
        },
        incrementQuantity: (state, { payload }) => {
            state.cartItems = state.cartItems.map((product) =>
                product._id !== payload._id
                    ? product
                    : { ...product, quantity: product.quantity + 1 }
            )
        },
        rmvItem: (state, { payload }) => {
            state.cartItems = state.cartItems.filter((product) => product._id !== payload._id);
        }
    }
})

export const { addProduct, decrementQuantity, incrementQuantity, rmvItem } = CartSlice.actions;

export default CartSlice.reducer;