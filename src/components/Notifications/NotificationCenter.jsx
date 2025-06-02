import { useState } from 'react';

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New Rental Created', type: 'rental' },
    { id: 2, message: 'Rental Returned', type: 'return' },
    { id: 3, message: 'Maintenance Scheduled', type: 'maintenance' },
  ]);

  const dismissNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className='text-lg' style={{ marginBottom: '20px' }}>
      <h2 className='text-white mx-50 text-2xl'>Notifications</h2>
      {notifications.length === 0 && <p>No new notifications.</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {notifications.map(n => (
          <li
            key={n.id}
            style={{
              marginBottom: '10px',
              backgroundColor: 'gray-400',
              padding: '10px',
              borderRadius: '5px',
              position: 'relative'
            }}
          >
            {n.message}
            <button
              onClick={() => dismissNotification(n.id)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '10px',
                background: 'transparent',
                border: 'none',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
              title="Dismiss"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationCenter;
