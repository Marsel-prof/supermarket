import React, {useEffect, useState} from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./my-component/Layout/Layout";
import Home from "./my-component/Home/Home";
import Product from "./my-component/Products/Product";
import NotFound from "./my-component/NotFound/NotFound";
import Register from "./my-component/Register/Register";
import Login from "./my-component/Login/Login";
import Cart from "./my-component/Cart/Cart";

function App() {
    const router = createBrowserRouter([
        {path: '', element: <Layout />, children: [
                {index: true, element: <Home />},
                {path: '/home', element: <Home/>},
                {path: '/cart', element: <Cart/>},
                {path: '/product', element: <Product/>},
                {path: '/register', element: <Register/>},
                {path: '/login', element: <Login/>},
                {path: '*', element: <NotFound/>}

            ]}
    ])
    return (
        <div><RouterProvider router={router}></RouterProvider></div>
    );
}

export default App;
