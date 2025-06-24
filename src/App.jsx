import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    favoriteColor: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [formFocus, setFormFocus] = useState("");
  const [formError, setFormError] = useState("");

  // Debug - log the current step to help diagnose issues
  useEffect(() => {
    console.log("Current step:", formStep);
  }, [formStep]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      age: "",
      favoriteColor: "",
    });
    setSubmitted(false);
    setFormStep(0);
    setFormError("");
  };

  const handleFocus = (field) => {
    setFormFocus(field);
  };

  const handleBlur = () => {
    setFormFocus("");
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setFormError("Name is required");
      setFormStep(0);
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setFormError("Valid email is required");
      setFormStep(1);
      return false;
    }
    if (!formData.age || parseInt(formData.age) < 1) {
      setFormError("Age is required");
      setFormStep(2);
      return false;
    }
    if (!formData.favoriteColor) {
      setFormError("Please select a favorite color");
      setFormStep(3);
      return false;
    }
    return true;
  };

  const nextStep = () => {
    let canProceed = true;

    // Validate current step before proceeding
    switch (formStep) {
      case 0:
        canProceed = !!formData.name.trim();
        if (!canProceed) setFormError("Please enter your name");
        break;
      case 1:
        canProceed = !!formData.email.trim() && formData.email.includes("@");
        if (!canProceed) setFormError("Please enter a valid email");
        break;
      case 2:
        canProceed = !!formData.age && parseInt(formData.age) >= 1;
        if (!canProceed) setFormError("Please enter a valid age");
        break;
      default:
        break;
    }

    if (canProceed) {
      if (formStep < 3) {
        setFormStep(formStep + 1);
        setFormError("");
      }
    }
  };

  const prevStep = () => {
    if (formStep > 0) {
      setFormStep(formStep - 1);
      setFormError("");
    }
  };

  // Add option for single-page form view
  const [singlePageView, setSinglePageView] = useState(true);

  const toggleView = () => {
    setSinglePageView(!singlePageView);
  };

  const renderFormStep = () => {
    if (singlePageView) {
      return (
        <div className="form-step">
          <h2>Enter Your Information</h2>

          {formError && <div className="form-error">{formError}</div>}

          <div
            className={`form-group ${formFocus === "name" ? "focused" : ""}`}
          >
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => handleFocus("name")}
              onBlur={handleBlur}
              placeholder="Enter your name"
              required
              autoComplete="off"
            />
            <label htmlFor="name" className="floating-label">
              Name
            </label>
          </div>

          <div
            className={`form-group ${formFocus === "email" ? "focused" : ""}`}
          >
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFocus("email")}
              onBlur={handleBlur}
              placeholder="Enter your email"
              required
              autoComplete="off"
            />
            <label htmlFor="email" className="floating-label">
              Email
            </label>
          </div>

          <div className={`form-group ${formFocus === "age" ? "focused" : ""}`}>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              onFocus={() => handleFocus("age")}
              onBlur={handleBlur}
              placeholder="Enter your age"
              required
              min="1"
              autoComplete="off"
            />
            <label htmlFor="age" className="floating-label">
              Age
            </label>
          </div>

          <h3 className="color-selection-title">What's your favorite color?</h3>
          <div className="color-options">
            {[
              "red",
              "blue",
              "green",
              "yellow",
              "purple",
              "orange",
              "pink",
              "teal",
            ].map((color) => (
              <div
                key={color}
                className={`color-option ${
                  formData.favoriteColor === color ? "selected" : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() =>
                  setFormData({ ...formData, favoriteColor: color })
                }
              >
                {formData.favoriteColor === color && (
                  <span className="checkmark">✓</span>
                )}
              </div>
            ))}
          </div>

          <div className="form-nav">
            <button
              type="submit"
              className="submit-btn"
              disabled={
                !formData.name ||
                !formData.email ||
                !formData.age ||
                !formData.favoriteColor
              }
            >
              Submit
            </button>
          </div>
        </div>
      );
    }

    switch (formStep) {
      case 0:
        return (
          <div className="form-step">
            <h2>What's your name?</h2>
            {formError && <div className="form-error">{formError}</div>}
            <div
              className={`form-group ${formFocus === "name" ? "focused" : ""}`}
            >
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => handleFocus("name")}
                onBlur={handleBlur}
                placeholder="Enter your name"
                required
                autoComplete="off"
              />
              <label htmlFor="name" className="floating-label">
                Name
              </label>
            </div>
            <div className="form-nav">
              <button
                type="button"
                onClick={nextStep}
                className="next-btn"
                disabled={!formData.name}
              >
                Continue
              </button>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="form-step">
            <h2>What's your email?</h2>
            {formError && <div className="form-error">{formError}</div>}
            <div
              className={`form-group ${formFocus === "email" ? "focused" : ""}`}
            >
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => handleFocus("email")}
                onBlur={handleBlur}
                placeholder="Enter your email"
                required
                autoComplete="off"
              />
              <label htmlFor="email" className="floating-label">
                Email
              </label>
            </div>
            <div className="form-nav">
              <button type="button" onClick={prevStep} className="back-btn">
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="next-btn"
                disabled={!formData.email}
              >
                Continue
              </button>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="form-step">
            <h2>How old are you?</h2>
            {formError && <div className="form-error">{formError}</div>}
            <div
              className={`form-group ${formFocus === "age" ? "focused" : ""}`}
            >
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                onFocus={() => handleFocus("age")}
                onBlur={handleBlur}
                placeholder="Enter your age"
                required
                min="1"
                autoComplete="off"
              />
              <label htmlFor="age" className="floating-label">
                Age
              </label>
            </div>
            <div className="form-nav">
              <button type="button" onClick={prevStep} className="back-btn">
                Back
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="next-btn"
                disabled={!formData.age}
              >
                Continue
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="form-step">
            <h2>What's your favorite color?</h2>
            {formError && <div className="form-error">{formError}</div>}
            <div className="color-options">
              {[
                "red",
                "blue",
                "green",
                "yellow",
                "purple",
                "orange",
                "pink",
                "teal",
              ].map((color) => (
                <div
                  key={color}
                  className={`color-option ${
                    formData.favoriteColor === color ? "selected" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() =>
                    setFormData({ ...formData, favoriteColor: color })
                  }
                >
                  {formData.favoriteColor === color && (
                    <span className="checkmark">✓</span>
                  )}
                </div>
              ))}
            </div>
            <div className="form-nav">
              <button type="button" onClick={prevStep} className="back-btn">
                Back
              </button>
              <button
                type="submit"
                className="submit-btn"
                disabled={!formData.favoriteColor}
              >
                Submit
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      {!submitted ? (
        <>
          <div className="view-toggle">
            <button onClick={toggleView} className="toggle-btn">
              {singlePageView ? "Switch to Step by Step" : "Show All Fields"}
            </button>
          </div>

          {!singlePageView && (
            <div className="progress-container">
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${(formStep + 1) * 25}%` }}
                ></div>
              </div>
              <div className="step-indicators">
                {[0, 1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`step-indicator ${
                      formStep >= step ? "active" : ""
                    }`}
                    onClick={() => {
                      // Allow clicking on previous completed steps
                      if (step < formStep) setFormStep(step);
                    }}
                  ></div>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="info-form">
            {renderFormStep()}
          </form>
        </>
      ) : (
        <div className="greeting-container">
          <div
            className="greeting-card"
            style={{ borderTop: `4px solid ${formData.favoriteColor}` }}
          >
            <div
              className="user-avatar"
              style={{ backgroundColor: formData.favoriteColor }}
            >
              {formData.name.charAt(0).toUpperCase()}
            </div>
            <h2>Hello, {formData.name}!</h2>
            <div className="user-info">
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{formData.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Age:</span>
                <span className="info-value">{formData.age}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Favorite Color:</span>
                <span
                  className="info-value color-dot"
                  style={{ backgroundColor: formData.favoriteColor }}
                ></span>
                <span className="color-name">{formData.favoriteColor}</span>
              </div>
            </div>
            <button onClick={handleReset} className="reset-btn">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path
                  fill="currentColor"
                  d="M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"
                />
              </svg>
              Start Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
