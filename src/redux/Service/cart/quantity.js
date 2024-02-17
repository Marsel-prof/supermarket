import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quantity: 1
};

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        incrementQuantity: (state) => {
            state.quantity++;
        },
        decrementQuantity: (state) => {
            state.quantity--;
        }
    }
});
export default CartSlice.reducer
export const { incrementQuantity, decrementQuantity } = CartSlice.actions;