import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define a thunk action creator
export const fetchCategory = () => async (dispatch) => {
    try {
        const response = await axios.get('https://dummyjson.com/products/categories');
        dispatch(setCategory(response.data)); // Dispatch a synchronous action with the fetched data
    } catch (error) {
        // Handle error
        console.error('Error fetching category:', error);
    }
};

const initialState = {
    category: []
};

const CategorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload;
        }
    }
});

export const { setCategory } = CategorySlice.actions;

export default CategorySlice.reducer;
