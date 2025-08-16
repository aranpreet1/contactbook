
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import ContactUploader from "./components/ContactUploader";
import Contacts from "./components/Contacts";
import ContactView from "./components/ContactView";
function App() {
  return (
    <Router>
      {/* Navbar always visible */}
      <Navbar />

      {/* Routes for pages */}
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/upload" element={<ContactUploader />} />
        <Route path="/api/contact" element={<Contacts/>}/>
        <Route path="/api/contact/:id" element={<ContactView />} />
      </Routes>
    </Router>
  );
}

export default App;
