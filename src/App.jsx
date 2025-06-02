import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import DashboardPage from "./Pages/DashboardPage";
import EquipmentPage from "./Pages/EquipmentPage";
import EquipmentDetailPage from "./Pages/EquipmentDetailPage";
import RentalsPage from "./Pages/RentalsPage";
import MaintenancePage from "./Pages/MaintenancePage";

import { AuthProvider } from "./contexts/AuthContext";
import { EquipmentProvider } from "./contexts/EquipmentContext";
import { RentalsProvider } from "./contexts/RentalsContext";
import { MaintenanceProvider } from "./contexts/MaintenanceContext";

function App() {
  return (
    <AuthProvider>
      <EquipmentProvider>
        <RentalsProvider>
          <MaintenanceProvider>
            <Router>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/equipment" element={<EquipmentPage />} />
                <Route
                  path="/equipment/:id"
                  element={<EquipmentDetailPage />}
                />
                <Route path="/rentals" element={<RentalsPage />} />
                <Route path="/maintenance" element={<MaintenancePage />} />
              </Routes>
            </Router>
          </MaintenanceProvider>
        </RentalsProvider>
      </EquipmentProvider>
    </AuthProvider>
  );
}

export default App;
