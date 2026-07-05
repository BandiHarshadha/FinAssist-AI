import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

import FinancialProfile from "./pages/FinancialProfile";

import Savings from "./pages/services/Savings";
import CreditCards from "./pages/services/CreditCards";
import HomeLoans from "./pages/services/HomeLoans";
import VehicleLoans from "./pages/services/VehicleLoans";
import Investments from "./pages/services/Investments";
import FixedDeposits from "./pages/services/FixedDeposits";
import Insurance from "./pages/services/Insurance";
import FinancialPlanning from "./pages/services/FinancialPlanning";

import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* NEW Financial Profile */}

        <Route
          path="/financial-profile"
          element={
            <ProtectedRoute>
              <FinancialProfile />
            </ProtectedRoute>
          }
        />

        {/* Services */}

        <Route
          path="/services/savings"
          element={
            <ProtectedRoute>
              <Savings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/services/credit-cards"
          element={
            <ProtectedRoute>
              <CreditCards />
            </ProtectedRoute>
          }
        />

        <Route
          path="/services/home-loans"
          element={
            <ProtectedRoute>
              <HomeLoans />
            </ProtectedRoute>
          }
        />

        <Route
          path="/services/vehicle-loans"
          element={
            <ProtectedRoute>
              <VehicleLoans />
            </ProtectedRoute>
          }
        />

        <Route
          path="/services/investments"
          element={
            <ProtectedRoute>
              <Investments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/services/fixed-deposits"
          element={
            <ProtectedRoute>
              <FixedDeposits />
            </ProtectedRoute>
          }
        />

        <Route
          path="/services/insurance"
          element={
            <ProtectedRoute>
              <Insurance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/services/financial-planning"
          element={
            <ProtectedRoute>
              <FinancialPlanning />
            </ProtectedRoute>
          }
        />

        {/* 404 */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;