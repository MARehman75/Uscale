import { createBrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../../paths/Dashboard/Dashboard";
import SideBar from "../../paths/Dashboard/SideBar";
import LandingPage from "../../paths/homepage/LandingPage";
import LogIn from "../../paths/register/LogIn";
import SignUp from "../../paths/register/SignUp";
import RequireAuth from "../../RequireAuth";
import ResetPassword from "../../utils/modals/ResetPassword";
import SocialAc from "../../paths/Dashboard/SocialAc";
import CalenderView from "../../paths/Dashboard/CalenderView";
const router = createBrowserRouter([
    {
        path: "/",
        element: <LandingPage />
    },
    {
        path: "/test",
        element: <SideBar />
    },
    {
        path: "/reset-password/:id/:token",
        element: <ResetPassword />
    },
    {
        path: "/dashboard/*",
        element:
            <Routes>
                <Route element={<RequireAuth />}>
                    <Route path="/" element={<Dashboard />} />
                </Route>
            </Routes>
    },
    {
        path: "/SocialAc",
        element: <SocialAc />
    },
    {
        path: "/CalenderView",
        element: <CalenderView />
    },
])
export default router;