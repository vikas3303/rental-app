import { useEquipment } from '../../contexts/EquipmentContext';
import { Link,useNavigate } from 'react-router-dom';
const EquipmentList = ({ setEditingEquipment }) => {
  const { equipment, deleteEquipment } = useEquipment();

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteEquipment(id);
    }
  };

  const getStatusBadgeClasses = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case 'Available': return `${baseClasses} bg-green-100 text-green-800`;
      case 'Rented': return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Maintenance': return `${baseClasses} bg-orange-100 text-orange-800`;
      case 'Out of Service': return `${baseClasses} bg-red-100 text-red-800`;
      default: return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const getConditionClasses = (condition) => {
    switch (condition) {
      case 'Excellent': return 'text-green-600 font-medium';
      case 'Good': return 'text-blue-600 font-medium';
      case 'Fair': return 'text-yellow-600 font-medium';
      case 'Poor': return 'text-red-600 font-medium';
      default: return 'text-gray-600 font-medium';
    }
  };

  return (
    <div className="bg-gray-200 border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex justify-between items-center px-6 py-4 bg-gray-200 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-700">Equipment Inventory</h2>
        <div className="text-sm text-gray-600">
          Total Equipment: <span className="font-semibold text-blue-600">{equipment.length}</span>
        </div>
      </div>

      {equipment.length === 0 ? (
        <div className="text-center py-16 px-4">
          <div className="text-gray-500">
            <p className="text-lg mb-2">No equipment items found.</p>
            <p>Add some equipment to get started!</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          {equipment.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <div className="flex justify-between items-start p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 flex-1 mr-3">
                  {item.name}
                </h3>
                <span className={getStatusBadgeClasses(item.status)}>
                  {item.status}
                </span>
              </div>
              
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Category:</span>
                  <span className="text-sm font-medium text-gray-800">{item.category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Condition:</span>
                  <span className={`text-sm ${getConditionClasses(item.condition)}`}>
                    {item.condition}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">ID:</span>
                  <span className="text-sm font-mono text-gray-800">{item.id}</span>
                </div>
              </div>

              <div className="flex gap-2 p-4 bg-gray-50 border-t border-gray-200">
                <button 
                  onClick={() => setEditingEquipment(item)}
                  className="flex-1 px-3 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transition-colors text-sm font-medium"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(item.id, item.name)}
                  className="flex-1 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default EquipmentList;

