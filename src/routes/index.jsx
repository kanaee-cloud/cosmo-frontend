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

// Import halaman
import Pomodoro from "../pages/Pomodoro";
import Forum from "../pages/Forum";
import AuthenticationPage from "../pages/AuthenticationPage";
import AchievementsPage from "../pages/AchievementsPage";
import Matriks from "../pages/Matriks"; // <-- IMPORT MATRIKS BARU

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
            },
        ]
    },
    {
        element: <AuthLayout />,
        children: [
            {
                path: "/login",
                element: (
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                )
            },
            {
                path: "/register",
                element: (
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
            { path: "pomodoro", element: <Pomodoro /> },
            { path: "forum", element: <Forum /> },
            { path: "achievements", element: <AchievementsPage /> },
            { path: "matriks", element: <Matriks /> }, // <-- ROUTE MATRIKS BARU
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
            { index: true, element: <Navigate to="account" replace /> },
            { path: "account", element: <ProfileMainTab /> },
            { path: "privacy", element: <PrivacyTab /> },
            { path: "color-presets", element: <ColorPresets /> },
        ]
    },
    {
        path: "*",
        element: <NotFound />
    },
    {
        path: "/success",
        element: <AuthenticationPage />
    }
]);