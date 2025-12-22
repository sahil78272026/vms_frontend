import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Entry from "./pages/visitor/Entry";
import VisitorLogin from "./pages/visitor/Login";
import VisitorDashboard from "./pages/visitor/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ResidentLogin from "./pages/residents/Login";
import ResidentDashboard from "./pages/residents/Dashboard";
import ResidentRegister from "./pages/residents/Register";
import GuardLogin from "./pages/guard/Login";
import GuardDashboard from "./pages/guard/Dashboard";
import GateQR from "./pages/admin/GateQR";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminGuards from "./pages/admin/Guards";
import PendingResidents from "./pages/admin/PendingResidents";
import Announcements from "./pages/admin/Announcements";
import ExpectedVisit from "./pages/residents/ExpectedVisit";

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
        <Route
          path="/residents/visits/expected"
          element={
            <ProtectedRoute roles={["resident"]}>
              <ExpectedVisit />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES */}

        <Route
          path="/admin/residents/pending"
          element={
            <ProtectedRoute role="admin">
              <PendingResidents />
            </ProtectedRoute>
          }
        />

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

        <Route
          path="/admin/residents/pending"
          element={
            <ProtectedRoute role="admin">
              <PendingResidents />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/announcements"
          element={
            <ProtectedRoute role="admin">
              <Announcements />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
