import { useParams } from 'react-router-dom';
import EquipmentDetail from '../components/Equipment/EquipmentDetail';
import { EquipmentProvider } from '../contexts/EquipmentContext';

function EquipmentDetailPage() {
  return (
    <EquipmentProvider>
      <EquipmentDetail />
    </EquipmentProvider>
  );
}

export default EquipmentDetailPage;
