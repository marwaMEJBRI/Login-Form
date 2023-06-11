import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import DashboardPage from "../Dashboard/DashboardPage";

const ProtectedRouter = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    return isAuthenticated ? <DashboardPage /> : <Navigate to="/" />;
};
export default ProtectedRouter;
