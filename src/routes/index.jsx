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
import Profile from "../pages/Profile";
import Profil from "../pages/Profil";

// Import halaman Pomodoro baru
import Pomodoro from "../pages/Pomodoro";

// Komponen Tab Baru untuk Profil
import ProfileMainTab from "../components/Profile/profile/ProfileMainTab";
import PrivacyTab from "../components/Profile/privacy/PrivacyTab";
import ColorPresets from "../components/Profile/presets/ColorPresets";

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
            { path: "raid-deck", element: <RaidDeck /> },
            { path: "leaderboard", element: <Leaderboard /> },
            // Menambahkan route Pomodoro di dalam Dashboard
            { path: "pomodoro", element: <Pomodoro /> },
        ]
    },

    {
        path: "/profile",
        element: (
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        ),
        children: [
            // Redirect otomatis saat user mengakses "/profile" langsung
            { index: true, element: <Navigate to="account" replace /> },
            { path: "account", element: <ProfileMainTab /> },
            { path: "privacy", element: <PrivacyTab /> },
            { path: "color-presets", element: <ColorPresets /> }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
]);