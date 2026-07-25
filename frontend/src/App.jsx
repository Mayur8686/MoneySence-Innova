import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard';
import Transactions from './Transactions';
import Copilot from './Copilot';
import Insights from './Insights';
import Login from './Login';
import Register from './Register'; // <-- 1. Import Register page
import Profile from './Profile';
import UploadStatement from './UploadStatement';
import Analytics from './Analytics';
import FinancialHealth from './FinancialHealth';
import Budget from './Budget';
import Subscriptions from './Subscriptions';
import Settings from './Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* <-- 2. Add route */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/copilot" element={<Copilot />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/upload" element={<UploadStatement />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/health" element={<FinancialHealth />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;