import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css";

function ContactView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/contact/${id}`);
        setContact(res.data.data[0] || null);
        console.log(res)
      } catch (err) {
        console.error("Failed to fetch contact", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, [id]);

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  if (!contact) {
    return (
      <div className="container mt-5 text-center">
        <h4 className="text-danger">Contact not found</h4>
        <button className="btn btn-secondary mt-3" onClick={() => navigate('/api/contact')}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="mb-3 text-center">📇 Contact Details</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"><strong>ID:</strong> {contact.id}</li>
          <li className="list-group-item"><strong>Username:</strong> {contact.username}</li>
          <li className="list-group-item"><strong>Email:</strong> {contact.email}</li>
          <li className="list-group-item"><strong>Phone:</strong> {contact.phonenumber}</li>
        </ul>
        <div className="d-flex justify-content-center mt-4">
          <button className="btn btn-primary me-2" onClick={() => navigate(`/api/contact`)}>Back to List</button>
         
        </div>
      </div>
    </div>
  );
}

export default ContactView;
