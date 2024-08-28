import React, { createContext, useContext, ReactNode, useState } from 'react';

interface Admin {
  name: string;
  role: string;
}

interface AdminContextType {
  admin: Admin;
  setAdmin: React.Dispatch<React.SetStateAction<Admin>>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<Admin>({
    name: 'John Doe',
    role: 'Administrator',
  });

  return (
    <AdminContext.Provider value={{ admin, setAdmin }}>
      {children}
    </AdminContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
