import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TrackShipment from './pages/TrackShipment';
import Dashboard from './pages/Dashboard';
import Support from './pages/Support';
import Availability from './pages/Availability';
import JoinUs from './pages/JoinUs';
import ApiDocs from './pages/ApiDocs';
import ShippingCalculator from './pages/ShippingCalculator';
import CreateShipment from './pages/CreateShipment';
import MyShipments from './pages/MyShipments';
import Billing from './pages/Billing';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import About from './pages/About';
import Contact from './pages/Contact';
import { ROUTES } from './utils/constants';

// Layout wrapper to conditionally show Navbar/Footer
function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard') || 
                          location.pathname.startsWith('/shipments') ||
                          location.pathname.startsWith('/availability') ||
                          location.pathname.startsWith('/billing') ||
                          location.pathname.startsWith('/profile');

  if (isDashboardRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.SIGNUP} element={<Signup />} />
          <Route path={ROUTES.TRACK} element={<TrackShipment />} />
          <Route path={ROUTES.TRACK_ID} element={<TrackShipment />} />
          <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
          <Route path={ROUTES.SUPPORT} element={<Support />} />
          <Route path={ROUTES.AVAILABILITY} element={<Availability />} />
          <Route path={ROUTES.JOIN_US} element={<JoinUs />} />
          <Route path={ROUTES.API_DOCS} element={<ApiDocs />} />
          <Route path="/calculator" element={<ShippingCalculator />} />
          <Route path={ROUTES.CREATE_SHIPMENT} element={<CreateShipment />} />
          <Route path={ROUTES.MY_SHIPMENTS} element={<MyShipments />} />
          <Route path={ROUTES.BILLING} element={<Billing />} />
          <Route path={ROUTES.PROFILE} element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            iconTheme: {
              primary: '#FF6B35',
              secondary: '#fff',
            },
          },
        }}
      />
    </Router>
  );
}

export default App;
