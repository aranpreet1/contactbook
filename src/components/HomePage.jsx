// src/components/HomePage.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css"; // reused styles

function HomePage() {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center homepage-container">
      <div className="col-10 col-md-8 p-5 rounded-4 shadow homepage-card">
        {/* Heading */}
        <h2 className="text-center mb-4 fw-bold text-dark">
          🚀 Welcome to Contact Book Application
        </h2>
        <p className="text-center text-dark">
          This is a sample landing page where you can showcase your
          application's features, add images, or display some data. Feel free to
          customize this section.
        </p>

        {/* Bootstrap Carousel */}
        <div id="homeCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
          <div className="carousel-inner rounded-4 shadow homepage-carousel">
            <div className="carousel-item active">
              <img
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=400&fit=crop"
                className="d-block w-100"
                alt="Team collaboration"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Slide 1 Title</h5>
                <p>Some quick example text for Slide 1.</p>
              </div>
            </div>

            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=400&fit=crop"
                className="d-block w-100"
                alt="Data analytics dashboard"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Slide 2 Title</h5>
                <p>Some quick example text for Slide 2.</p>
              </div>
            </div>

            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=400&fit=crop"
                className="d-block w-100"
                alt="Technology workspace"
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>Slide 3 Title</h5>
                <p>Some quick example text for Slide 3.</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#homeCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#homeCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>

        {/* Features Section */}
        <div className="row text-center mt-4">
          <div className="col-md-4 mb-3">
            <div className="p-3 rounded shadow-sm bg-light h-100">
              <h5>📂 Upload Excel Files</h5>
              <p>
                Easily upload and validate Excel files with our simple
                interface.
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="p-3 rounded shadow-sm bg-light h-100">
              <h5>📂 Export Excel Files</h5>
              <p>
                Easily export the contact list you have created in our application in excel format
              </p>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="p-3 rounded shadow-sm bg-light h-100">
              <h5>🔒 Secure</h5>
              <p>
                Your data is processed locally and never leaves your browser.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
