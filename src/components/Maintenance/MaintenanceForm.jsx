import { useState } from 'react';

// Mock contexts for demo - replace with real imports in your app
const useMaintenance = () => ({
  maintenanceRecords: [],
  addMaintenanceRecord: (record) => {
    console.log("Maintenance record added:", record);
    alert(`Maintenance record added for ${record.equipmentName}`);
  }
});

const useEquipment = () => ({
  equipment: [
    { id: "eq1", name: "Excavator", category: "Heavy Machinery" },
    { id: "eq2", name: "Concrete Mixer", category: "Construction" },
    { id: "eq3", name: "Bulldozer", category: "Heavy Machinery" },
    { id: "eq4", name: "Crane", category: "Heavy Machinery" },
    { id: "eq5", name: "Forklift", category: "Material Handling" },
    { id: "eq6", name: "Compactor", category: "Compaction Equipment" },
  ]
});

const maintenanceTypes = [
  "Routine Inspection",
  "Oil Change", 
  "Filter Replacement",
  "Brake Service",
  "Engine Repair",
  "Hydraulic Service",
  "Tire Replacement",
  "Battery Service",
  "Preventive Maintenance",
  "Emergency Repair"
];

function MaintenanceForm() {
  const { addMaintenanceRecord } = useMaintenance();
  const { equipment } = useEquipment();
  
  const [form, setForm] = useState({
    equipmentId: '',
    date: '',
    type: '',
    description: '',
    cost: '',
    technician: '',
    status: 'Completed',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.equipmentId) newErrors.equipmentId = "Equipment is required";
    if (!form.date) newErrors.date = "Date is required";
    if (!form.type) newErrors.type = "Maintenance type is required";
    if (!form.description.trim()) newErrors.description = "Description is required";
    if (!form.technician.trim()) newErrors.technician = "Technician name is required";
    if (form.cost && isNaN(form.cost)) newErrors.cost = "Cost must be a valid number";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const selectedEquipment = equipment.find(eq => eq.id === form.equipmentId);
    const newRecord = {
      id: `m${Date.now()}`,
      ...form,
      equipmentName: selectedEquipment?.name || 'Unknown',
      cost: form.cost ? parseFloat(form.cost) : 0,
      createdAt: new Date().toISOString()
    };

    addMaintenanceRecord(newRecord);
    
    // Reset form
    setForm({
      equipmentId: '',
      date: '',
      type: '',
      description: '',
      cost: '',
      technician: '',
      status: 'Completed',
      notes: ''
    });
    setErrors({});
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px" }}>
      <h3 style={{ marginBottom: "20px" }}>Add Maintenance Record</h3>
      
      <div style={{ display: "grid", gap: "16px" }}>
        {/* Equipment Selection */}
        <div>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
            Equipment <span style={{ color: "red" }}>*</span>
          </label>
          <select
            name="equipmentId"
            value={form.equipmentId}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              border: errors.equipmentId ? "2px solid red" : "1px solid #ccc",
              borderRadius: "4px"
            }}
          >
            <option value="">-- Select Equipment --</option>
            {equipment.map((eq) => (
              <option key={eq.id} value={eq.id}>
                {eq.name} ({eq.category})
              </option>
            ))}
          </select>
          {errors.equipmentId && (
            <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
              {errors.equipmentId}
            </div>
          )}
        </div>

        {/* Date */}
        <div>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
            Maintenance Date <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              border: errors.date ? "2px solid red" : "1px solid #ccc",
              borderRadius: "4px"
            }}
          />
          {errors.date && (
            <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
              {errors.date}
            </div>
          )}
        </div>

        {/* Maintenance Type */}
        <div>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
            Maintenance Type <span style={{ color: "red" }}>*</span>
          </label>
          <select
            name="type"
            value={form.type}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              border: errors.type ? "2px solid red" : "1px solid #ccc",
              borderRadius: "4px"
            }}
          >
            <option value="">-- Select Type --</option>
            {maintenanceTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.type && (
            <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
              {errors.type}
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
            Description <span style={{ color: "red" }}>*</span>
          </label>
          <textarea
            name="description"
            placeholder="Describe the maintenance work performed..."
            value={form.description}
            onChange={handleChange}
            rows="3"
            style={{
              width: "100%",
              padding: "8px",
              border: errors.description ? "2px solid red" : "1px solid #ccc",
              borderRadius: "4px",
              resize: "vertical"
            }}
          />
          {errors.description && (
            <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
              {errors.description}
            </div>
          )}
        </div>

        {/* Technician */}
        <div>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
            Technician <span style={{ color: "red" }}>*</span>
          </label>
          <input
            type="text"
            name="technician"
            placeholder="Enter technician name"
            value={form.technician}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              border: errors.technician ? "2px solid red" : "1px solid #ccc",
              borderRadius: "4px"
            }}
          />
          {errors.technician && (
            <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
              {errors.technician}
            </div>
          )}
        </div>

        {/* Cost */}
        <div>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
            Cost ($)
          </label>
          <input
            type="number"
            name="cost"
            placeholder="0.00"
            value={form.cost}
            onChange={handleChange}
            min="0"
            step="0.01"
            style={{
              width: "100%",
              padding: "8px",
              border: errors.cost ? "2px solid red" : "1px solid #ccc",
              borderRadius: "4px"
            }}
          />
          {errors.cost && (
            <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
              {errors.cost}
            </div>
          )}
        </div>

        {/* Status */}
        <div>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
            Status
          </label>
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px"
            }}
          >
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
            <option value="Scheduled">Scheduled</option>
          </select>
        </div>

        {/* Additional Notes */}
        <div>
          <label style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
            Additional Notes
          </label>
          <textarea
            name="notes"
            placeholder="Any additional notes or observations..."
            value={form.notes}
            onChange={handleChange}
            rows="2"
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              resize: "vertical"
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          style={{
            padding: "12px 24px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "500",
            marginTop: "8px"
          }}
        >
          Add Maintenance Record
        </button>
      </div>
    </div>
  );
}

export default MaintenanceForm;