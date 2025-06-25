import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import RoleRouter from "./pages/RoleRouter";
import DoctorLayout from "./layouts/DoctorLayout";
import DoctorHome from "./pages/doctor/HomePage";
import PatientHome from "./pages/patient/HomePage";
import LabHome from "./pages/lab/HomePage";
import LabLayout from "./layouts/LabLayout";
import PatientLayout from "./layouts/PatientLayout";
import RegisterPage from "./pages/RegistrationPage";

import type { ReactElement } from "react";

const PrivateRoute = ({ children }: { children: ReactElement }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/doctor"
            element={
              <PrivateRoute>
                <DoctorLayout />
              </PrivateRoute>
            }
          />
          <Route index element={<DoctorHome />} />

          <Route
            path="/lab"
            element={
              <PrivateRoute>
                <LabLayout />
              </PrivateRoute>
            }
          />
          <Route index element={<LabHome />}>
          </Route>
          <Route
            path="/patient"
            element={
              <PrivateRoute>
                <PatientLayout />
              </PrivateRoute>
            }
          />
          <Route index element={<PatientHome />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
