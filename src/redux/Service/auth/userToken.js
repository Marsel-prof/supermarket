import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: null
}
const userToken = createSlice({
    name: 'userToken',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const {setUser} = userToken.actions
export default userToken.reducer