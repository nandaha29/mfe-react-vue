import React from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full " style={{ paddingTop: '80px' }}>
      {children}
    </div>
  );
};

export default MainLayout;