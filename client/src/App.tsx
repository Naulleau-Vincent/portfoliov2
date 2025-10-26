import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./page/section_1";
import LegalNotice from "./page/LegalNotice";
import PrivacyPolicy from "./page/PrivacyPolicy";
import { AuthProvider } from "./auth/useAuth";
import Verify from './components/auth/Verify';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/legal-notice" element={<LegalNotice />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
