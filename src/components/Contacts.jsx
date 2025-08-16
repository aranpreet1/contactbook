import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css"; // reused styles
import axios from "axios";
import { useNavigate } from "react-router-dom";

// inside Contacts()

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 10;

  // Update modal state
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateData, setUpdateData] = useState({
    id: null,
    username: "",
    email: "",
    phonenumber: "",
  });

  // ✅ Fetch from backend with pagination + search
  const navigate = useNavigate();
  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/contact", {
        params: { page: currentPage, limit: pageSize, search },
      });
      setContacts(res.data.data || []);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error("Failed to fetch contacts", err);
    }
  };

  // ✅ Delete from backend
  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/contact/${id}`);
      fetchContacts();
    } catch (err) {
      console.error("Failed to delete contact", err);
    }
  };

  // ✅ Open update modal with existing data
  const handleUpdateClick = (contact) => {
    setUpdateData(contact);
    setShowUpdateModal(true);
  };

  // ✅ Submit update API call
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/api/contact/${updateData.id}`,
        updateData
      );
      setShowUpdateModal(false);
      fetchContacts();
    } catch (err) {
      console.error("Failed to update contact", err);
    }
  };

  // Fetch when page/search changes
  useEffect(() => {
    fetchContacts();
  }, [currentPage, search]);

  const totalPages = Math.ceil(total / pageSize);

  // ✅ Select handlers
  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === contacts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(contacts.map((c) => c.id));
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-start py-5 page-background">
      <div className="col-12 col-md-10 p-4 glass-container shadow">
        <h2 className="text-center mb-4 fw-bold text-dark">📇 Contact List</h2>

        {/* Search */}
        <div className="d-flex justify-content-between mb-3">
          <input
            type="text"
            className="form-control contacts-search"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Table */}
        <table className="table table-hover table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={
                    selectedIds.length === contacts.length &&
                    contacts.length > 0
                  }
                  onChange={toggleSelectAll}
                />
              </th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(c.id)}
                    onChange={() => toggleSelect(c.id)}
                  />
                </td>
                <td>{c.username}</td>
                <td>{c.email}</td>
                <td>{c.phonenumber}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm me-2"
                    onClick={() => navigate(`/api/contact/${c.id}`)}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleUpdateClick(c)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteContact(c.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No contacts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="d-flex justify-content-center mt-3">
          <nav>
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                  Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* ✅ Update Modal */}
      {showUpdateModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ zIndex: 10000 }}
        >
          <div className="modal-dialog" style={{ zIndex: 100000 }}>
            <div className="modal-content p-3">
              <h5 className="mb-3">Update Contact</h5>
              <form onSubmit={handleUpdateSubmit}>
                <div className="mb-3">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={updateData.username}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, username: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={updateData.email}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, email: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label>Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    value={updateData.phonenumber}
                    onChange={(e) =>
                      setUpdateData({
                        ...updateData,
                        phonenumber: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-secondary me-2"
                    onClick={() => setShowUpdateModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* backdrop */}
          <div className="modal-backdrop fade show"></div>
        </div>
      )}
    </div>
  );
}

export default Contacts;
