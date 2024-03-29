import React from 'react';
import {Navigate} from "react-router-dom";

function ProtectedRouter({children}) {
    if(localStorage.getItem('token')){
        return <>{children}</>
    }
    else { return <Navigate to={'/login'}/>}
}

export default ProtectedRouter;
