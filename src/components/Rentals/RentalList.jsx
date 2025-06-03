import { useState } from 'react';
import { useRentals } from '../../contexts/RentalsContext';
import { useEquipment } from '../../contexts/EquipmentContext';

function RentalList() {
  // FIXED: Changed updateRental to updateRentalStatus to match context
  const { rentals, updateRentalStatus, deleteRental } = useRentals();
  const { equipment } = useEquipment();
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState('');
  const [customerFilter, setCustomerFilter] = useState('');
  const [equipmentFilter, setEquipmentFilter] = useState('');

  // FIXED: Updated filter logic to handle both customerId and customerName
  const filteredRentals = rentals.filter(rental => {
    return (
      (!statusFilter || rental.status === statusFilter) &&
      (!customerFilter || 
        (rental.customerName && rental.customerName.toLowerCase().includes(customerFilter.toLowerCase())) ||
        (rental.customerId && rental.customerId.toLowerCase().includes(customerFilter.toLowerCase()))
      ) &&
      (!equipmentFilter || rental.equipmentId.toLowerCase().includes(equipmentFilter.toLowerCase()))
    );
  });

  // FIXED: Updated function name to match context
  const handleStatusUpdate = (rentalId, newStatus) => {
    updateRentalStatus(rentalId, newStatus);
  };

  // Get equipment name by ID
  const getEquipmentName = (equipmentId) => {
    const eq = equipment.find(e => e.id === equipmentId);
    return eq ? eq.name : equipmentId;
  };

  return (
    <div style={{ margin: '20px 0' }}>
      <h3>Rental Orders</h3>
      
      {/* Filters */}
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
        <h4>Filters:</h4>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <div>
            <label>Status: </label>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Statuses</option>
              <option value="Reserved">Reserved</option>
              <option value="Active">Active</option> {/* FIXED: Changed from "Ongoing" to "Active" */}
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          
          <div>
            <label>Customer: </label>
            <input 
              type="text" 
              placeholder="Search customer..." 
              value={customerFilter}
              onChange={(e) => setCustomerFilter(e.target.value)}
            />
          </div>
          
          <div>
            <label>Equipment: </label>
            <input 
              type="text" 
              placeholder="Search equipment..." 
              value={equipmentFilter}
              onChange={(e) => setEquipmentFilter(e.target.value)}
            />
          </div>
          
          <button 
            onClick={() => {
              setStatusFilter('');
              setCustomerFilter('');
              setEquipmentFilter('');
            }}
            style={{ padding: '5px 10px' }}
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Rental List */}
      <div>
        {filteredRentals.length === 0 ? (
          <p>No rentals found matching the filters.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Rental ID</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Equipment</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Customer</th> {/* FIXED: Changed header */}
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Start Date</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>End Date</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Total Cost</th> {/* ADDED: Cost column */}
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRentals.map((rental) => (
                <tr key={rental.id}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{rental.id}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    {getEquipmentName(rental.equipmentId)}
                  </td>
                  {/* FIXED: Display customerName instead of customerId */}
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    {rental.customerName || rental.customerId || 'N/A'}
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{rental.startDate}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{rental.endDate}</td>
                  {/* ADDED: Total cost display */}
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    ${rental.totalCost || 0}
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    <select 
                      value={rental.status} 
                      onChange={(e) => handleStatusUpdate(rental.id, e.target.value)}
                      style={{ 
                        padding: '5px',
                        backgroundColor: rental.status === 'Reserved' ? '#fff3cd' :
                                        rental.status === 'Active' ? '#d1ecf1' :
                                        rental.status === 'Completed' ? '#d4edda' : '#f8d7da',
                        border: '1px solid #ccc',
                        borderRadius: '3px'
                      }}
                    >
                      <option value="Reserved">Reserved</option>
                      <option value="Active">Active</option> {/* FIXED: Changed from "Ongoing" to "Active" */}
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                    <button 
                      onClick={() => deleteRental(rental.id)}
                      style={{ 
                        backgroundColor: '#dc3545', 
                        color: 'white', 
                        border: 'none', 
                        padding: '5px 10px', 
                        borderRadius: '3px',
                        cursor: 'pointer'
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      <p style={{ marginTop: '10px', color: '#666' }}>
        Showing {filteredRentals.length} of {rentals.length} rental orders
      </p>
    </div>
  );
}

export default RentalList;