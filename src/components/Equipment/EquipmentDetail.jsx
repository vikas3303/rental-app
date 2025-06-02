import { useParams } from 'react-router-dom';
import { useEquipment } from '../../contexts/EquipmentContext';
import { Calendar, Clock, User, ArrowLeft, Package, AlertCircle } from 'lucide-react';

function useEquipmentmock() {
  return {
    equipment: [
      {
        id: '1',
        name: 'Professional Camera',
        category: 'Photography',
        condition: 'Excellent',
        status: 'Available',
        description: 'Canon EOS R5 with 24-70mm lens',
        dailyRate: 150,
        rentalHistory: [
          { renter: 'John Smith', date: '2024-01-15', duration: '3 days', returnDate: '2024-01-18' },
          { renter: 'Sarah Johnson', date: '2024-02-20', duration: '1 week', returnDate: '2024-02-27' },
          { renter: 'Mike Wilson', date: '2024-03-10', duration: '2 days', returnDate: '2024-03-12' }
        ]
      }
    ]
  };
}

function EquipmentDetail() {
  // Mock data for demonstration - replace with your actual useParams and useEquipment
  const id = '1';
  const { equipment } = useEquipment();
  const item = equipment.find((eq) => eq.id === id);

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-500 p-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Equipment Not Found</h2>
            <p className="text-gray-600 mb-6">The equipment you're looking for doesn't exist or may have been removed.</p>
            <button 
              onClick={() => console.log('Navigate to equipment list')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Equipment List
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'rented': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition) => {
    switch (condition.toLowerCase()) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button 
            onClick={() => console.log('Navigate back')}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Equipment Details</h1>
        </div>

        {/* Equipment Info Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              <Package className="w-8 h-8 text-blue-600 mr-3" />
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{item.name}</h2>
                <p className="text-gray-600">{item.category}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
              {item.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Equipment ID</label>
              <p className="text-lg font-semibold text-gray-800">{item.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Condition</label>
              <p className={`text-lg font-semibold ${getConditionColor(item.condition)}`}>
                {item.condition}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Daily Rate</label>
              <p className="text-lg font-semibold text-gray-800">
                ${item.dailyRate || 'Not specified'}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Total Rentals</label>
              <p className="text-lg font-semibold text-gray-800">
                {item.rentalHistory ? item.rentalHistory.length : 0}
              </p>
            </div>
          </div>

          {item.description && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-500 mb-2">Description</label>
              <p className="text-gray-700">{item.description}</p>
            </div>
          )}
        </div>

        {/* Rental History Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Rental History
          </h3>

          {item.rentalHistory && item.rentalHistory.length > 0 ? (
            <div className="space-y-4">
              {item.rentalHistory.map((entry, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Renter</p>
                        <p className="font-semibold text-gray-800">{entry.renter}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Rental Date</p>
                        <p className="font-semibold text-gray-800">{entry.date}</p>
                        {entry.returnDate && (
                          <p className="text-sm text-gray-600">Returned: {entry.returnDate}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-semibold text-gray-800">{entry.duration}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No rental history available</p>
              <p className="text-gray-400 text-sm">This equipment hasn't been rented yet.</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {item.status === 'Available' && (
          <div className="mt-6 flex gap-4">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Rent Equipment
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Add to Watchlist
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default EquipmentDetail;

