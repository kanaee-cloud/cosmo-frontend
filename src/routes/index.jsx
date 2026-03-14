import { createBrowserRouter, Navigate } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { LandingLayout } from "../layouts/LandingLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { ProtectedRoute } from "../components/common/ProtectedRoute";
import { PublicRoute } from "../components/common/PublicRoute";
import RaidDeck from "../pages/RaidDeck";
import { DashboardLayout } from "../layouts/DashboardLayout";
import Home from "../pages/Home";


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
                element: 
                (
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                )
            },
            {
                path: "/register",
                element: 
                (
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                )
            }
        ]
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <Navigate to="home" replace /> },
            { path: "home", element: <Home /> },
            { path: "raid-deck", element: <RaidDeck /> }
        ]
    }
])