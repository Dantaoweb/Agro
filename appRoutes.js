// routes.js
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import FarmerDashboard from './pages/FarmerDashboard';
import InvestorDashboard from './pages/InvestorDashboard';
import ConsultantDashboard from './pages/ConsultantDashboard';
import ValidatorDashboard from './pages/ValidatorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PartnerDashboard from './pages/PartnerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import guardWorker from './pages/guardWorkerDashbord';

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard/farmer" element={<ProtectedRoute role="Farmer"><FarmerDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/investor" element={<ProtectedRoute role="Investor"><InvestorDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/validator" element={<ProtectedRoute role="Validator"><ValidatorDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/partner" element={<ProtectedRoute role="partner"><PartnerDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/consultant" element={<ProtectedRoute role="consultant"><ConsultantDashboardDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/buyer" element={<ProtectedRoute role="buyer"><BuyerDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/guardWorker" element={<ProtectedRoute role="guardWorker"><guardWorkerDashboard /></ProtectedRoute>} />
                <Route path="/dashboard/admin" element={<ProtectedRoute role="Admin"><AdminDashboard /></ProtectedRoute>} />

                {/* ... more routes */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
}