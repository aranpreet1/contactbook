import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as XLSX from "xlsx";
import "../styles/style.css"; // reused styles

function ContactUploader() {
  const [errors, setErrors] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = evt.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = XLSX.utils.sheet_to_json(
        workbook.Sheets[sheetName],
        { defval: "" }
      );

      const validationErrors = [];

      worksheet.forEach((row, index) => {
        const rowNum = index + 2;
        const username = String(row.username ?? row.Username ?? row.USERNAME ?? "").trim();
        const email = String(row.email ?? row.Email ?? row.EMAIL ?? "").trim();
        const phone = String(row.phone ?? row.Phone ?? row.PHONE ?? "").trim();

        if (!username) {
          validationErrors.push({ row: rowNum, message: "Username is missing" });
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          validationErrors.push({ row: rowNum, message: "Invalid or missing email" });
        }
        if (!phone || !/^\d{10}$/.test(phone)) {
          validationErrors.push({ row: rowNum, message: "Phone must be a 10-digit number" });
        }
      });

      setErrors(validationErrors);
    };

    reader.readAsBinaryString(file);
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

        {errors.length > 0 && (
          <div className="mt-4 error-box">
            <h5 className="error-title">Invalid Rows Found:</h5>
            <ul className="mb-0 error-list">
              {errors.map((err, index) => (
                <li key={index}>
                  Row {err.row}: {err.message}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-center mt-4">
          <button
            className="btn btn-primary px-4 py-2 fw-semibold"
            disabled={errors.length > 0}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactUploader;
