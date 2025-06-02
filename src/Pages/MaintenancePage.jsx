// src/pages/MaintenancePage.jsx
import MaintenanceForm from '../components/Maintenance/MaintenanceForm';
import MaintenanceList from '../components/Maintenance/MaintenanceList';

function MaintenancePage() {
  return (
    <div className='bg-gray-600'>
      <h2 className='text-4xl mx-4 text-center px-120'>Maintenance Dashboard</h2>
      <MaintenanceForm />
      <MaintenanceList />
    </div>
  );
}

export default MaintenancePage;
