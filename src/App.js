import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Layout from "./my-component/Layout/Layout";
import Home from "./my-component/Home/Home";
import NotFound from "./my-component/NotFound/NotFound";
import Register from "./my-component/Register/Register";
import Login from "./my-component/Login/Login";
import Cart from "./my-component/Cart/Cart";
import ProductDetails from "./my-component/ProductDetails/ProductDetails";
import ProtectedRouter from "./my-component/ProtectedRouter/ProtectedRouter";
import Category from "./my-component/Category/Category";

function App() {
    const router = createBrowserRouter([
        {path: '', element: <Layout />, children: [
                {index: true, element: <Home />},
                {path: '/home', element: <Home/>},
                {path: '/cart', element:<ProtectedRouter><Cart/></ProtectedRouter>},
                {path: '/product/:id', element: <ProductDetails/>},
                {path: '/register', element: <Register/>},
                {path: '/categories/:name', element:<Category/>},
                {path: '/login', element: <Login/>},
                {path: '*', element: <NotFound/>}

            ]}
    ])
    return (
        <div><RouterProvider router={router}></RouterProvider></div>
    );
}

export default App;
