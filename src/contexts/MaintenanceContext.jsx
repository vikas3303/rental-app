import { createContext, useContext, useState } from 'react';

const MaintenanceContext = createContext();

export const MaintenanceProvider = ({ children }) => {
  const [maintenanceLogs, setMaintenanceLogs] = useState([
    {
      id: 'm1',
      equipmentId: 'eq1',
      date: '2025-05-20',
      type: 'Routine Check',
      notes: 'No issues found',
    },
  ]);

  return (
    <MaintenanceContext.Provider value={{ maintenanceLogs, setMaintenanceLogs }}>
      {children}
    </MaintenanceContext.Provider>
  );
};

export const useMaintenance = () => useContext(MaintenanceContext);
