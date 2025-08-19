import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import ContactUploader from "./components/ContactUploader";
import Contacts from "./components/Contacts";
import ContactView from "./components/ContactView";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      {/* Navbar should always show but will hide links based on login */}
      <Navbar />
      
      <Routes>
         <Route path="/signup" element={<SignUp />} />
        {/* Default route - protected */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        {/* Login is always open */}
        <Route path="/login" element={<Login />} />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <ContactUploader />
            </ProtectedRoute>
          }
        />

        <Route
          path="/api/contact"
          element={
            <ProtectedRoute>
              <Contacts />
            </ProtectedRoute>
          }
        />

        <Route
          path="/api/contact/:id"
          element={
            <ProtectedRoute>
              <ContactView />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
