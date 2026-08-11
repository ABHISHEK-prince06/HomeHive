import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage';
import ProviderProfilePage from './pages/ProviderProfilePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProviderOnboardingPage from './pages/ProviderOnboardingPage';
import DashboardPage from './pages/DashboardPage';
import PricingPage from './pages/PricingPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.08),_transparent_38%),linear-gradient(180deg,#f8f5f0_0%,#f8fafc_100%)] text-slate-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/provider/:id" element={<ProviderProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/join-provider" element={<ProviderOnboardingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
    </div>
  );
}

export default App;
