import React from 'react';
import Navbar from "../Navbar/Navbar";
import {Outlet} from "react-router-dom";
import Footer from "../Footer/Footer";

function Layout() {
    return (
        <div>
            <Navbar/>
            <div className={`container`}>
            <Outlet></Outlet>
            </div>
            <Footer/>
        </div>
    );
}

export default Layout;
