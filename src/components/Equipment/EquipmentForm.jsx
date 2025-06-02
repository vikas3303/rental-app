import React,{ useState,useEffect} from 'react';
import { useEquipment } from '../../contexts/EquipmentContext';

function EquipmentForm ({ editingEquipment, setEditingEquipment }){
  const { addEquipment, updateEquipment } = useEquipment();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    condition: '',
    status: 'Available'
  });

  useEffect(() => {
    if (editingEquipment) {
      setFormData(editingEquipment);
    } else {
      setFormData({
        name: '',
        category: '',
        condition: '',
        status: 'Available'
      });
    }
  }, [editingEquipment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.category || !formData.condition) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingEquipment) {
      updateEquipment(editingEquipment.id, formData);
      setEditingEquipment(null);
    } else {
      addEquipment(formData);
    }

    setFormData({
      name: '',
      category: '',
      condition: '',
      status: 'Available'
    });
  };

  const handleCancel = () => {
    setEditingEquipment(null);
    setFormData({
      name: '',
      category: '',
      condition: '',
      status: 'Available'
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-gray-200 border border-gray-200 rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-5">
        {editingEquipment ? 'Edit Equipment' : 'Add New Equipment'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Equipment Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter equipment name"
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white"
          >
            <option value="">Select Category</option>
            <option value="Heavy Machinery">Heavy Machinery</option>
            <option value="Power Equipment">Power Equipment</option>
            <option value="Hand Tools">Hand Tools</option>
            <option value="Safety Equipment">Safety Equipment</option>
            <option value="Vehicles">Vehicles</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Condition *
          </label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            required
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white"
          >
            <option value="">Select Condition</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white"
          >
            <option value="Available">Available</option>
            <option value="Rented">Rented</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Out of Service">Out of Service</option>
          </select>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
        >
          {editingEquipment ? 'Update Equipment' : 'Add Equipment'}
        </button>
        {editingEquipment && (
          <button
            onClick={handleCancel}
            className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors font-medium"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default EquipmentForm;