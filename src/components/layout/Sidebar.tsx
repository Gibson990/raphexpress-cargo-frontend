import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  Search,
  Calendar,
  CreditCard,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { ROUTES } from '../../utils/constants';

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      path: ROUTES.DASHBOARD,
    },
    {
      title: 'Create Shipment',
      icon: PlusCircle,
      path: ROUTES.CREATE_SHIPMENT,
      highlight: true,
    },
    {
      title: 'My Shipments',
      icon: Package,
      path: ROUTES.MY_SHIPMENTS,
    },
    {
      title: 'Track Shipment',
      icon: Search,
      path: ROUTES.TRACK,
    },
    {
      title: 'Availability',
      icon: Calendar,
      path: ROUTES.AVAILABILITY,
    },
    {
      title: 'Billing',
      icon: CreditCard,
      path: ROUTES.BILLING,
    },
    {
      title: 'Profile',
      icon: User,
      path: ROUTES.PROFILE,
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-neutral-200 transition-all duration-300 z-40 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 w-6 h-6 bg-white border border-neutral-200 rounded-full flex items-center justify-center hover:bg-neutral-50 transition-colors"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4 text-neutral-600" />
        ) : (
          <ChevronLeft className="h-4 w-4 text-neutral-600" />
        )}
      </button>

      <div className="flex flex-col h-full py-6">
        {/* Menu Items */}
        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group ${
                  active
                    ? 'bg-primary text-white'
                    : item.highlight
                    ? 'bg-primary/10 text-primary hover:bg-primary/20'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
                title={isCollapsed ? item.title : ''}
              >
                <Icon
                  className={`h-5 w-5 flex-shrink-0 ${
                    active ? 'text-white' : item.highlight ? 'text-primary' : 'text-neutral-500'
                  } ${active ? '' : 'group-hover:scale-110 transition-transform'}`}
                />
                {!isCollapsed && (
                  <span className="font-medium">{item.title}</span>
                )}
                {!isCollapsed && item.highlight && (
                  <span className="ml-auto bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                    New
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="px-3 space-y-1 border-t border-neutral-200 pt-4">
          <Link
            to="/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors group"
            title={isCollapsed ? 'Settings' : ''}
          >
            <Settings className="h-5 w-5 flex-shrink-0 text-neutral-500 group-hover:rotate-90 transition-transform duration-300" />
            {!isCollapsed && <span className="font-medium">Settings</span>}
          </Link>

          <button
            onClick={() => {
              // Handle logout
              window.location.href = ROUTES.HOME;
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors group"
            title={isCollapsed ? 'Logout' : ''}
          >
            <LogOut className="h-5 w-5 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
            {!isCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
