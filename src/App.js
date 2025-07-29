import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import JobListings from './pages/JobListings';
import CompanyProfile from './pages/CompanyProfile';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import ApplicationTracking from './pages/ApplicationTracking';
import AdminPanel from './pages/AdminPanel';
import PaymentsBilling from './pages/PaymentsBilling';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/company-profile" element={<CompanyProfile />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;