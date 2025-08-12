
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import ContactUploader from "./components/ContactUploader";
import Contacts from "./components/Contacts";

function App() {
  return (
    <Router>
      {/* Navbar always visible */}
      <Navbar />

      {/* Routes for pages */}
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/upload" element={<ContactUploader />} />
        <Route path="/contact" element={<Contacts/>}/>
      </Routes>
    </Router>
  );
}

export default App;
