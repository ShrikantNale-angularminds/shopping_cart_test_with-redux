import { configureStore } from "@reduxjs/toolkit";
import CartSlice from "../Components/cart/CartSlice";
import HomeSlice from "../Components/home/HomeSlice";
import PaginationSlice from "../Components/pagination/PaginationSlice";
import PlaceOrderSlice from "../Components/placeOrder/PlaceOrderSlice";

export default configureStore({
    reducer: {
        products: HomeSlice,
        pagination: PaginationSlice,
        cart: CartSlice,
        placeOrder: PlaceOrderSlice,
    }
})