import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/Dashboard/dashboard";
import SignupPage from "../pages/signUp/signUp";

const router  = createBrowserRouter( [
    {
        path: '/',
        element: <SignupPage/>
    },
    {
        path: '/dashboard',
        element: <Dashboard/>
    }
])

export default router