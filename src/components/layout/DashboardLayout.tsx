import type { ReactNode } from 'react';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-neutral-50">
      <Sidebar />
      <main
        className="flex-1 min-w-0 p-6 md:p-8 transition-all duration-300"
        style={{ marginLeft: 'calc(var(--sidebar-width, 16rem) + var(--sidebar-gap, 1rem))' }}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
