import { createBrowserRouter } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { LandingLayout } from "../layouts/LandingLayout";
import { AuthLayout } from "../layouts/AuthLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingLayout />,
        children: [
            {
                index: true,
                element: <Landing />
            }
        ]
    },
    {
        element: <AuthLayout />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            }
        ]
    }
])