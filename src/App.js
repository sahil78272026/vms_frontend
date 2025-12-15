import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from "./pages/Home";
import Entry from "./pages/visitor/Entry";
import VisitorLogin from "./pages/visitor/Login";
import VisitorDashboard from "./pages/visitor/Dashboard";
import ResidentLogin from "./pages/residents/Login";
import ResidentDashboard from "./pages/residents/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import GateQR from "./pages/admin/GateQR";

import ResidentRegister from "./pages/residents/Register";
import GuardLogin from "./pages/guard/Login";
import GuardDashboard from "./pages/guard/Dashboard";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminGuards from "./pages/admin/Guards";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* home page */}

        <Route path="/" element={<Home />} />


        {/* Visitor */}
        <Route path="/visitor-entry" element={<Entry />} />
        <Route path="/visitor/login" element={<VisitorLogin />} />
        <Route
          path="/visitor/dashboard"
          element={
            <ProtectedRoute role="visitor">
              <VisitorDashboard />
            </ProtectedRoute>
          }
        />



        {/* GUARD ROUTES */}
        <Route path="/guard/login" element={<GuardLogin />} />
        <Route
          path="/guard/dashboard"
          element={
            <ProtectedRoute role="guard">
              <GuardDashboard />
            </ProtectedRoute>
          }
        />



        {/* Resident Routes*/}
        <Route path="/residents/login" element={<ResidentLogin />} />
        <Route path="/residents/register" element={<ResidentRegister />} />

        <Route
          path="/residents/dashboard"
          element={
            <ProtectedRoute role="resident">
              <ResidentDashboard />
            </ProtectedRoute>
          }
        />


        {/* ADMIN ROUTES */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/guards"
          element={
            <ProtectedRoute role="admin">
              <AdminGuards />
            </ProtectedRoute>
          }
        />
      <Route path="/admin/gate-qr" element={<GateQR />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
