import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // initially no user

  const login = (email, password) => {
    // Mock login logic (you can later fetch from backend or localStorage)
    if (email === 'admin@entnt.in' && password === 'admin123') {
      setUser({ email, role: 'Admin' });
      return true;
    } else if (email === 'staff@entnt.in' && password === 'staff123') {
      setUser({ email, role: 'Staff' });
      return true;
    } else if (email === 'customer@entnt.in' && password === 'cust123') {
      setUser({ email, role: 'Customer' });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
