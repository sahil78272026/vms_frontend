import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Entry from "./pages/visitor/Entry";
import VisitorLogin from "./pages/visitor/Login";
import VisitorDashboard from "./pages/visitor/Dashboard";

import ResidentLogin from "./pages/residents/Login";
import ResidentDashboard from "./pages/residents/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import GateQR from "./pages/admin/GateQR";
import Home from "./pages/Home";
import ResidentRegister from "./pages/residents/Register";
import GuardLogin from "./pages/guard/Login";
import GuardDashboard from "./pages/guard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* home page */}

        <Route path="/" element={<Home />} />

        {/* Visitor */}
        <Route path="/visitor-entry" element={<Entry />} />
        <Route path="/visitor/login" element={<VisitorLogin />} />
        <Route path="/admin/gate-qr" element={<GateQR />} />
        <Route path="/residents/register" element={<ResidentRegister />} />

        <Route path="/guard/login" element={<GuardLogin />} />

        <Route
          path="/guard/dashboard"
          element={
            <ProtectedRoute role="guard">
              <GuardDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/visitor/dashboard"
          element={
            <ProtectedRoute role="visitor">
              <VisitorDashboard />
            </ProtectedRoute>
          }
        />

        {/* Resident */}
        <Route path="/residents/login" element={<ResidentLogin />} />

        <Route
          path="/residents/dashboard"
          element={
            <ProtectedRoute role="resident">
              <ResidentDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
