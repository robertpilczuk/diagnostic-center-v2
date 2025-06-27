import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import RegisterPage from "./pages/RegistrationPage";

import DoctorLayout from "./layouts/DoctorLayout";
import DoctorHome from "./pages/doctor/HomePage";

import LabLayout from "./layouts/LabLayout";
import LabHome from "./pages/lab/HomePage";

import PatientLayout from "./layouts/PatientLayout";
import PatientHome from "./pages/patient/HomePage";
import PatientTestsPage from "./pages/patient/PatientTestsPage";
import PatientAppointmentsPage from "./pages/patient/PatientAppointmentsPage";
import type { ReactElement } from "react";

const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard after login */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        {/* Doctor routes */}
        <Route
          path="/doctor"
          element={
            <PrivateRoute>
              <DoctorLayout />
            </PrivateRoute>
          }
        />
        <Route
          path="/doctor/home"
          element={
            <PrivateRoute>
              <DoctorHome />
            </PrivateRoute>
          }
        />

        {/* Laboratory routes */}
        <Route
          path="/lab"
          element={
            <PrivateRoute>
              <LabLayout />
            </PrivateRoute>
          }
        />
        <Route
          path="/lab/home"
          element={
            <PrivateRoute>
              <LabHome />
            </PrivateRoute>
          }
        />

        {/* Patient routes */}
        <Route
          path="/patient"
          element={
            <PrivateRoute>
              <PatientLayout />
            </PrivateRoute>
          }
        >
          <Route
            index
            element={
              <PrivateRoute>
                <PatientHome />
              </PrivateRoute>
            }
          />
          <Route
            path="home"
            element={
              <PrivateRoute>
                <PatientHome />
              </PrivateRoute>
            }
          />
          <Route
            path="/patient/tests"
            element={
              <PrivateRoute>
                <PatientTestsPage />
              </PrivateRoute>
            }
          >
          </Route>
          <Route
            path="/patient/appointments"
            element={
              <PrivateRoute>
                <PatientAppointmentsPage />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
