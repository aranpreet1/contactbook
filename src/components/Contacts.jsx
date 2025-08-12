import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css"; // reused styles


function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "username", direction: "asc" });
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    const dummy = Array.from({ length: 22 }, (_, i) => ({
      id: i + 1,
      username: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      phone: `98765432${(i % 10).toString().padStart(2, "0")}`,
    }));
    setContacts(dummy);
  }, []);

  const filteredContacts = contacts
    .filter(
      (c) =>
        c.username.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.includes(search)
    )
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

  const totalPages = Math.ceil(filteredContacts.length / pageSize);
  const paginatedContacts = filteredContacts.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const toggleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedContacts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedContacts.map((c) => c.id));
    }
  };

  const handleDeleteSelected = () => {
    setContacts(contacts.filter((c) => !selectedIds.includes(c.id)));
    setSelectedIds([]);
  };

  const handleExportSelected = () => {
    const selectedContacts = contacts.filter((c) => selectedIds.includes(c.id));
    console.log("Exporting contacts:", selectedContacts);
    alert(`Exporting ${selectedContacts.length} contacts`);
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-start py-5 page-background">
      <div className="col-12 col-md-10 p-4 glass-container shadow">
        <h2 className="text-center mb-4 fw-bold text-dark">📇 Contact List</h2>

        {/* Search & Actions */}
        <div className="d-flex justify-content-between mb-3">
          <input
            type="text"
            className="form-control contacts-search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {selectedIds.length > 0 && (
            <div>
              <button className="btn btn-danger me-2" onClick={handleDeleteSelected}>
                Delete Selected
              </button>
              <button className="btn btn-success" onClick={handleExportSelected}>
                Export Selected
              </button>
            </div>
          )}
        </div>

        {/* Table */}
        <table className="table table-hover table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selectedIds.length === paginatedContacts.length && paginatedContacts.length > 0}
                  onChange={toggleSelectAll}
                />
              </th>
              <th onClick={() => toggleSort("username")} className="sortable">
                Username {sortConfig.key === "username" && (sortConfig.direction === "asc" ? "▲" : "▼")}
              </th>
              <th onClick={() => toggleSort("email")} className="sortable">
                Email {sortConfig.key === "email" && (sortConfig.direction === "asc" ? "▲" : "▼")}
              </th>
              <th onClick={() => toggleSort("phone")} className="sortable">
                Phone {sortConfig.key === "phone" && (sortConfig.direction === "asc" ? "▲" : "▼")}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedContacts.map((c) => (
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
                <td>{c.phone}</td>
                <td>
                  <button className="btn btn-info btn-sm action-btn">View</button>
                  <button className="btn btn-warning btn-sm action-btn">Update</button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => setContacts(contacts.filter((x) => x.id !== c.id))}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {paginatedContacts.length === 0 && (
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
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage((p) => p - 1)}>Previous</button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                  <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage((p) => p + 1)}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
