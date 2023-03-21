import SignUp from "pages/SignUp";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { SESSION_ROUTES } from "./routes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={SESSION_ROUTES.SIGN_UP} element={<SignUp />} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  );
};

export default AppRoutes;
