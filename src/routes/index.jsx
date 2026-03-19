import { createBrowserRouter, Navigate } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { LandingLayout } from "../layouts/LandingLayout";
import { AuthLayout } from "../layouts/AuthLayout";
import { ProtectedRoute } from "../components/common/ProtectedRoute";
import { PublicRoute } from "../components/common/PublicRoute";
import NotFound from "../pages/NotFound";
import RaidDeck from "../pages/RaidDeck";
import Leaderboard from "../pages/Leaderboard";
import { DashboardLayout } from "../layouts/DashboardLayout";
import Home from "../pages/Home";
import Theme from "../pages/Theme"; // Import Theme Page
import Profile from "../pages/Profile";

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
    
    // 2. TAMBAHKAN ROUTE THEME DI SINI
    // Diletakkan di luar AuthLayout/DashboardLayout agar bisa diakses siapa saja
    {
        path: "/theme",
        element: <Theme />
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
            { path: "raid-deck", element: <RaidDeck /> },
            // legacy dashboard profile removed (use top-level /profile)
            { path: "leaderboard", element: <Leaderboard /> },
        ]
    },

    // Canonical standalone profile route (no Sidebar/DashboardLayout)
    {
        path: "/profile",
        element: (
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        )
    },
    {
        path: "*",
        element: <NotFound />
    }
]);