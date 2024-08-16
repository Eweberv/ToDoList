import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Layout from "../components/Layout/Layout";
import PageNotFound from "../components/PageNotFound.tsx";
import Register from "../components/Register.tsx";
import Login from "../components/Login.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <App />
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/register",
                element: <Register/>
            },
            {
                path: "*",
                element: <PageNotFound/>
            },
        ]
    },
]);

export default router;