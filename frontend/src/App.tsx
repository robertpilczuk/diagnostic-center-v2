import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import RegisterPage from "./pages/RegistrationPage";

import DoctorLayout from "./layouts/DoctorLayout";
import DoctorHome from "./pages/doctor/HomePage";

import LabLayout from "./layouts/LabLayout";
import LabHome from "./pages/lab/HomePage";
import LabTestDetailsPage from "./pages/lab/LabTestDetailPage";
import TestOrderDetailsPage from "./pages/lab/TestOrderDetailsPage";

import PatientLayout from "./layouts/PatientLayout";
import PatientHome from "./pages/patient/HomePage";
import PatientTestsPage from "./pages/patient/PatientTestsPage";
import PatientAppointmentsPage from "./pages/patient/PatientAppointmentsPage";
import PatientPrescriptionsPage from "./pages/patient/PatientPrescriptionsPage";
import PatientReportsPage from "./pages/patient/ReportsPage";

import type { ReactElement } from "react";

type PrivateRouteProps = {
  children: ReactElement;
  allowedRoles?: string[];
};

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && (!user || !allowedRoles.includes(user.role))) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public */}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />

        {/* Doctor */}
        <Route
          path="/doctor"
          element={
            <PrivateRoute allowedRoles={["Doctor"]}>
              <DoctorLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<DoctorHome />} />
          <Route path="home" element={<DoctorHome />} />
        </Route>

        {/* Laboratory */}
        <Route
          path="/lab"
          element={
            <PrivateRoute allowedRoles={["Laboratory"]}>
              <LabLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<LabHome />} />
          <Route path="home" element={<LabHome />} />
          <Route path="test-orders/:id" element={<TestOrderDetailsPage />} />
          <Route path="test/:id" element={<LabTestDetailsPage />} />
        </Route>

        {/* Patient */}
        <Route
          path="/patient"
          element={
            <PrivateRoute allowedRoles={["Patient"]}>
              <PatientLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<PatientHome />} />
          <Route path="home" element={<PatientHome />} />
          <Route path="tests" element={<PatientTestsPage />} />
          <Route path="appointments" element={<PatientAppointmentsPage />} />
          <Route path="prescriptions" element={<PatientPrescriptionsPage />} />
          <Route path="reports" element={<PatientReportsPage />} />
        </Route>

        {/* Unauthorized */}
        <Route
          path="/unauthorized"
          element={
            <div className="p-8 text-red-600 font-bold">
              Access denied
            </div>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
