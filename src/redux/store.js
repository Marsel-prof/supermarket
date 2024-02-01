import {configureStore} from "@reduxjs/toolkit";
import userToken from "./Service/auth/userToken";

export default configureStore({
    reducer: {
        userToken: userToken
    }
})