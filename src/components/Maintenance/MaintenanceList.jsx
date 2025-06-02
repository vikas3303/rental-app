// src/components/Maintenance/MaintenanceList.jsx
import { useState, useMemo } from 'react';
import { useMaintenance } from '../../contexts/MaintenanceContext';

function MaintenanceList() {
  const { maintenanceRecords } = useMaintenance();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Get unique maintenance types and statuses for filter options
  const maintenanceTypes = useMemo(() => {
    if (!maintenanceRecords) return [];
    return [...new Set(maintenanceRecords.map(record => record.type))].sort();
  }, [maintenanceRecords]);

  const statuses = useMemo(() => {
    if (!maintenanceRecords) return [];
    return [...new Set(maintenanceRecords.map(record => record.status))].sort();
  }, [maintenanceRecords]);

  // Filter and sort records
  const filteredAndSortedRecords = useMemo(() => {
    if (!maintenanceRecords) return [];

    let filtered = maintenanceRecords.filter(record => {
      const matchesSearch = !searchTerm || 
        record.equipmentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.technician?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.notes?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = !filterType || record.type === filterType;
      const matchesStatus = !filterStatus || record.status === filterStatus;
      
      return matchesSearch && matchesType && matchesStatus;
    });

    // Sort records
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Handle different data types
      if (sortBy === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      } else if (sortBy === 'cost') {
        aValue = parseFloat(aValue) || 0;
        bValue = parseFloat(bValue) || 0;
      } else if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [maintenanceRecords, searchTerm, filterType, filterStatus, sortBy, sortOrder]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return '#28a745';
      case 'in progress':
        return '#ffc107';
      case 'scheduled':
        return '#007bff';
      default:
        return '#6c757d';
    }
  };

  if (!maintenanceRecords) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '40px',
        fontSize: '16px',
        color: '#666'
      }}>
        Loading maintenance records...
      </div>
    );
  }

  if (maintenanceRecords.length === 0) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '40px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        margin: '20px'
      }}>
        <h3 style={{ color: '#6c757d', marginBottom: '16px' }}>No Maintenance Records</h3>
        <p style={{ color: '#6c757d' }}>No maintenance records have been added yet.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: '600' }}>
          Maintenance Records ({filteredAndSortedRecords.length})
        </h3>
        
        {/* Search and Filter Controls */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '16px',
          marginBottom: '20px',
          padding: '16px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
              Search
            </label>
            <input
              type="text"
              placeholder="Search equipment, technician, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
              Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            >
              <option value="">All Types</option>
              {maintenanceTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
              Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            >
              <option value="">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '500' }}>
              Sort By
            </label>
            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field);
                setSortOrder(order);
              }}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            >
              <option value="date-desc">Date (Newest)</option>
              <option value="date-asc">Date (Oldest)</option>
              <option value="equipmentName-asc">Equipment (A-Z)</option>
              <option value="equipmentName-desc">Equipment (Z-A)</option>
              <option value="type-asc">Type (A-Z)</option>
              <option value="cost-desc">Cost (High-Low)</option>
              <option value="cost-asc">Cost (Low-High)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Records List */}
      <div style={{ display: 'grid', gap: '16px' }}>
        {filteredAndSortedRecords.map((record) => (
          <div 
            key={record.id} 
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: 'white',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'box-shadow 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
            }}
          >
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '16px',
              marginBottom: '16px'
            }}>
              <div>
                <strong style={{ color: '#333', fontSize: '16px' }}>
                  {record.equipmentName || 'Unknown Equipment'}
                </strong>
                <div style={{ color: '#666', fontSize: '14px', marginTop: '4px' }}>
                  ID: {record.id}
                </div>
              </div>
              
              <div>
                <strong style={{ color: '#333' }}>Date:</strong>
                <div style={{ color: '#666', marginTop: '2px' }}>
                  {formatDate(record.date)}
                </div>
              </div>
              
              <div>
                <strong style={{ color: '#333' }}>Type:</strong>
                <div style={{ color: '#666', marginTop: '2px' }}>
                  {record.type}
                </div>
              </div>
              
              <div>
                <strong style={{ color: '#333' }}>Status:</strong>
                <div style={{ 
                  marginTop: '4px',
                  display: 'inline-block',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '500',
                  color: 'white',
                  backgroundColor: getStatusColor(record.status)
                }}>
                  {record.status}
                </div>
              </div>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '16px',
              marginBottom: '16px'
            }}>
              <div>
                <strong style={{ color: '#333' }}>Technician:</strong>
                <div style={{ color: '#666', marginTop: '2px' }}>
                  {record.technician}
                </div>
              </div>
              
              {record.cost > 0 && (
                <div>
                  <strong style={{ color: '#333' }}>Cost:</strong>
                  <div style={{ color: '#666', marginTop: '2px', fontSize: '16px', fontWeight: '500' }}>
                    {formatCurrency(record.cost)}
                  </div>
                </div>
              )}
            </div>
            
            {record.description && (
              <div style={{ marginBottom: '12px' }}>
                <strong style={{ color: '#333' }}>Description:</strong>
                <div style={{ color: '#666', marginTop: '4px', lineHeight: '1.4' }}>
                  {record.description}
                </div>
              </div>
            )}
            
            {record.notes && (
              <div>
                <strong style={{ color: '#333' }}>Notes:</strong>
                <div style={{ color: '#666', marginTop: '4px', lineHeight: '1.4' }}>
                  {record.notes}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredAndSortedRecords.length === 0 && maintenanceRecords.length > 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '40px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          <h4 style={{ color: '#6c757d', marginBottom: '8px' }}>No matching records found</h4>
          <p style={{ color: '#6c757d' }}>Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
}

export default MaintenanceList;