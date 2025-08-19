import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css"; // reused styles

function ContactUploader() {
  const [errors, setErrors] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setErrors([]);
      setSummary(null);

      // ✅ Get token from localStorage
      const token = localStorage.getItem("authToken");

      const response = await fetch("http://localhost:8000/api/contact/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      setLoading(false);

      // ✅ Handle special case: status 300 => buffer download
      if (response.status === 300) {
        const blob = await response.blob();

        // Create a temporary download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "InvalidContacts.xlsx"; // name for the file
        document.body.appendChild(a);
        a.click();
        a.remove();

        // Clean up URL
        window.URL.revokeObjectURL(url);

        setSummary({ message: "⚠️ Some rows were invalid. Download generated." });
        return;
      }

      // ✅ Otherwise, parse as JSON
      const data = await response.json();

      if (!response.ok) {
        setSummary({ message: data.message || "Upload failed" });
        return;
      }

      setSummary({
        message: data.message,
        inserted: data.inserted,
        failed: data.failed,
      });

      if (data.errors && data.errors.length > 0) {
        setErrors(data.errors);
      }
    } catch (err) {
      setLoading(false);
      setSummary({ message: "Something went wrong. Try again!" });
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center page-background">
      <div className="col-10 col-md-5 p-5 rounded-4 shadow glass-container">
        <h2 className="text-center mb-4 fw-bold text-dark">
          📇 Contact Book Application
        </h2>

        <div className="mb-3">
          <label htmlFor="formFile" className="form-label fw-semibold text-dark">
            Select a file
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
          />
        </div>

        {/* Uploading spinner */}
        {loading && <p className="text-info text-center">⏳ Uploading...</p>}

        {/* Summary message */}
        {summary && (
          <div className="mt-3 alert alert-info">
            <strong>{summary.message}</strong>
            {summary.inserted !== undefined && (
              <div>
                ✅ Inserted: {summary.inserted} <br />
                ❌ Failed: {summary.failed}
              </div>
            )}
          </div>
        )}

        {/* Error list */}
        {errors.length > 0 && (
          <div className="mt-4 error-box">
            <h5 className="error-title">Invalid Rows Found:</h5>
            <ul className="mb-0 error-list">
              {errors.map((err, index) => (
                <li key={index}>
                  Row {err.row}: {err.error}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContactUploader;
