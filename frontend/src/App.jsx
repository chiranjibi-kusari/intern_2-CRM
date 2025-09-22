import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./router/ProtectedRoute";

import RegisterEmployee from "./pages/RegisterEmployee";
import ViewById from "./pages/ViewById";
import EditEmo from "./pages/EditEmo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Package from "./pages/Package";
import PackageDetails from "./components/package/PackageDetails";
import CreatePackage from "./components/package/CreatePackage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/emp/:id"
            element={
              <ProtectedRoute>
                <ViewById />
              </ProtectedRoute>
            }
          />
          <Route
            path="/emp/:id/edit"
            element={
              <ProtectedRoute>
                <EditEmo />
              </ProtectedRoute>
            }
          />

          <Route
            path="/createPackage"
            element={
              <ProtectedRoute>
                <CreatePackage />
              </ProtectedRoute>
            }
          />
          <Route path="/tour-package" element={<Package />} />
          <Route
            path="/tour-package/:id"
            element={
              <ProtectedRoute>
                <PackageDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tour-package/:id/edit"
            element={
              <ProtectedRoute>
                <CreatePackage />
              </ProtectedRoute>
            }
          />
          <Route path="/unauthorize" element={<Unauthorized />} />

          {/*//remove later*/}
          {/*<Route path="/" element={<AdminDashboard />} />
          <Route path="/register" element={<RegisterEmployee />} />
          <Route path="/emp/:id" element={<ViewById />} />
          <Route path="/emp/:id/edit" element={<EditEmo />} />
          <Route path="/createPackage" element={<Package />} />
          <Route path="/viewPackage" element={<Package />} />
          <Route path="/viewPackage/:id" element={<ViewById />} />
          <Route path="/viewPackage/:id/edit" element={<EditEmo />} />*/}
        </Routes>
      </Router>
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
