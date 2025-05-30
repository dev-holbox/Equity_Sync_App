"use client"

import { useState } from "react"

const CenterOnboardingPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [extractedText, setExtractedText] = useState("")
  const [formData, setFormData] = useState({
    surgeryCenter: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    contactEmail: "",
    stateOfIncorporation: "",
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [surgeons, setSurgeons] = useState([
    { id: 1, name: "Dr. James Williams", selected: false },
    { id: 2, name: "Dr. Sarah Johnson", selected: true },
    { id: 3, name: "Dr. Michael Brown", selected: true },
  ])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.surgeryCenter.trim()) {
      newErrors.surgeryCenter = "Center Name is required"
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required"
    }

    if (!formData.zip.trim()) {
      newErrors.zip = "ZIP Code is required"
    }

    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = "Please enter a valid email address"
    }

    if (!formData.stateOfIncorporation) {
      newErrors.stateOfIncorporation = "State is required"
    }

    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    if (currentStep === 1) {
      const formErrors = validateForm()

      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors)
        setIsSubmitting(false)
        return
      }

      // Clear any existing errors and move to next step
      setErrors({})
      setTimeout(() => {
        setCurrentStep(2)
        setIsSubmitting(false)
      }, 1000)
    } else if (currentStep === 2) {
      // Handle document upload step
      setTimeout(() => {
        setCurrentStep(3)
        setIsSubmitting(false)
      }, 1000)
    } else if (currentStep === 3) {
      // Handle final step
      setTimeout(() => {
        console.log("Onboarding completed!")
        setIsSubmitting(false)
      }, 1000)
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (file && file.type === "application/pdf") {
      setUploadedFile(file)

      const formData = new FormData()
      formData.append("file", file)

      try {
        const response = await fetch("http://127.0.0.1:8000/extract-text", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) throw new Error("Failed to extract text")

        const data = await response.json()
        setExtractedText(data.safe_harbour_value || "")
      } catch (err) {
        console.error("Error uploading PDF:", err)
        setExtractedText("Failed to extract text from PDF.")
      }
    } else {
      setExtractedText("Please upload a valid PDF file.")
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const handleSurgeonSelection = (surgeonId) => {
    setSurgeons((prev) =>
      prev.map((surgeon) => (surgeon.id === surgeonId ? { ...surgeon, selected: !surgeon.selected } : surgeon)),
    )
  }

  const setupSteps = [
    { id: 1, title: "Center Details", active: currentStep === 1, completed: currentStep > 1 },
    { id: 2, title: "Upload Documents", active: currentStep === 2, completed: currentStep > 2 },
    { id: 3, title: "Add Surgeons", active: currentStep === 3, completed: false },
  ]

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-panel">
            <div className="panel-header">
              <h2>Center Details</h2>
              <p>Fill the following information regarding center</p>
            </div>

            <form className="surgery-form" onSubmit={handleSubmit}>
              <div className="form-section">
                <div className="form-field">
                  <label htmlFor="surgeryCenter">Center Name</label>
                  <input
                    type="text"
                    id="surgeryCenter"
                    name="surgeryCenter"
                    value={formData.surgeryCenter}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className={errors.surgeryCenter ? "error" : ""}
                  />
                  {errors.surgeryCenter && <div className="error-text">{errors.surgeryCenter}</div>}
                </div>

                <div className="form-field">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street Address"
                    className={errors.address ? "error" : ""}
                  />
                  {errors.address && <div className="error-text">{errors.address}</div>}
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                      className={errors.city ? "error" : ""}
                    />
                    {errors.city && <div className="error-text">{errors.city}</div>}
                  </div>
                  <div className="form-field">
                    <label htmlFor="zip">ZIP Code</label>
                    <input
                      type="text"
                      id="zip"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      placeholder="Code"
                      className={errors.zip ? "error" : ""}
                    />
                    {errors.zip && <div className="error-text">{errors.zip}</div>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="contactEmail">Email</label>
                    <input
                      type="email"
                      id="contactEmail"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      placeholder="Email address"
                      className={errors.contactEmail ? "error" : ""}
                    />
                    {errors.contactEmail && <div className="error-text">{errors.contactEmail}</div>}
                  </div>
                  <div className="form-field">
                    <label htmlFor="stateOfIncorporation">State</label>
                    <select
                      id="stateOfIncorporation"
                      name="stateOfIncorporation"
                      value={formData.stateOfIncorporation}
                      onChange={handleInputChange}
                      className={errors.stateOfIncorporation ? "error" : ""}
                    >
                      <option value="">Select state</option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="AZ">Arizona</option>
                      <option value="AR">Arkansas</option>
                      <option value="CA">California</option>
                      <option value="CO">Colorado</option>
                      <option value="CT">Connecticut</option>
                      <option value="DE">Delaware</option>
                      <option value="FL">Florida</option>
                      <option value="GA">Georgia</option>
                      <option value="TX">Texas</option>
                    </select>
                    {errors.stateOfIncorporation && <div className="error-text">{errors.stateOfIncorporation}</div>}
                  </div>
                </div>
              </div>

              <button type="submit" className="continue-button" disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Continue"}
              </button>
            </form>
          </div>
        )

      case 2:
        return (
          <div className="form-panel">
            <div className="panel-header">
              <h2>Upload Operating Agreement</h2>
              <p>Upload and tag your operating agreement</p>
            </div>

            <div className="upload-section">
              <div className="upload-dropzone" onDragOver={handleDragOver} onDrop={handleDrop}>
                <div className="upload-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17,8 12,3 7,8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <div className="upload-text">
                  <span>Drag & Drop here, or </span>
                  <button type="button" className="browse-link">
                    browse files
                  </button>
                </div>
                <div className="upload-info">PDF, DOC, or DOCX (Max 50MB)</div>
                <input
                  type="file"
                  id="fileUpload"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="file-input"
                />
                <label htmlFor="fileUpload" className="file-button">
                  Choose file {uploadedFile ? uploadedFile.name : "No file chosen"}
                </label>
              </div>

              <div className="clauses-section">
                <h3>Things to note :</h3>

                {extractedText ? (
                  <div className="extracted-notes" style={{
                    background: '#f8fafc',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '16px',
                    marginTop: '12px'
                  }}>
                    <div style={{
                      fontSize: '14px',
                      lineHeight: '1.6',
                      color: '#1f2937',
                      whiteSpace: 'pre-wrap',
                      fontFamily: 'inherit'
                    }}>
                      {extractedText}
                    </div>
                  </div>
                ) : (
                  <div className="no-notes" style={{
                    background: '#f8fafc',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    padding: '16px',
                    marginTop: '12px',
                    textAlign: 'center',
                    color: '#6b7280',
                    fontSize: '14px'
                  }}>
                    No notes extracted yet. Upload a document to see extracted information.
                  </div>
                )}
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
                <button
                  type="button"
                  className="back-button"
                  onClick={() => setCurrentStep(1)}
                  style={{
                    background: "#f3f4f6",
                    color: "#374151",
                    border: "1px solid #d1d5db",
                    padding: "10px 20px",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                  }}
                >
                  Back
                </button>
                <button
                  type="button"
                  className="continue-button"
                  onClick={handleSubmit}
                  disabled={isSubmitting || !uploadedFile}
                >
                  {isSubmitting ? "Processing..." : "Continue"}
                </button>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="form-panel">
            <div className="panel-header">
              <h2>Add Surgeon</h2>
              <p>Invite surgeons to view their profile</p>
            </div>

            <div className="surgeons-section">
              <div className="welcome-message-section" style={{ marginBottom: "32px" }}>
                <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#1f2937", marginBottom: "12px" }}>
                  Mail message template
                </h3>
                <textarea
                  placeholder="Hello from team Sigmatic. You are invited to Surgery Center. Follow the link and do the needful. 
                  asc.segmatic.com/surgeons"
                  rows="4"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontFamily: "inherit",
                    resize: "vertical",
                    background: "#f9fafb",
                  }}
                />
              </div>

              <div className="surgeons-invite-section">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                  }}
                >
                  <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#1f2937", margin: "0" }}>
                    Select Surgeons to Invite
                  </h3>
                  <button
                    type="button"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "none",
                      border: "none",
                      color: "#1e40af",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      transition: "background-color 0.2s",
                    }}
                    onMouseOver={(e) => (e.target.style.background = "#f0f9ff")}
                    onMouseOut={(e) => (e.target.style.background = "none")}
                  >
                    <span style={{ fontSize: "16px" }}>+</span>
                    Add Surgeon
                  </button>
                </div>

                <div
                  className="surgeon-list"
                  style={{ border: "1px solid #e5e7eb", borderRadius: "8px", overflow: "hidden" }}
                >
                  {surgeons.map((surgeon, index) => (
                    <div
                      key={surgeon.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "16px",
                        borderBottom: index < surgeons.length - 1 ? "1px solid #f3f4f6" : "none",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <input
                          type="checkbox"
                          checked={surgeon.selected}
                          onChange={() => handleSurgeonSelection(surgeon.id)}
                          style={{ width: "16px", height: "16px", accentColor: "#1e40af" }}
                        />
                        <div>
                          <div style={{ fontWeight: "600", color: "#1f2937", fontSize: "14px" }}>{surgeon.name}</div>
                        </div>
                      </div>
                      {/* <button
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          background: "#f3f4f6",
                          border: "1px solid #d1d5db",
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "#374151",
                          cursor: "pointer",
                        }}
                        onClick={() => handleSurgeonSelection(surgeon.id)}
                      >
                        <span>👤</span>
                        {surgeon.selected ? "Uninvite" : "Invite"}
                      </button> */}
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "32px" }}
              >
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#6b7280",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    padding: "10px 0",
                  }}
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  style={{
                    background: "#1e40af",
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                  }}
                >
                  {isSubmitting ? "Completing..." : "Sent & Complete"}
                </button>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="content-grid">
      {/* Setup Steps */}
      <div className="setup-steps-panel">
        <div className="panel-header">
          <h2>Setup Steps</h2>
          <p>Complete all steps to finish onboarding</p>
        </div>
        <div className="steps-container">
          {setupSteps.map((step) => (
            <div
              key={step.id}
              className={`step-item ${step.active ? "active" : ""} ${step.completed ? "completed" : ""}`}
            >
              <div className="step-number">{step.completed ? "✓" : step.id}</div>
              <div className="step-content">
                <div className="step-title">{step.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Step Content */}
      {renderStepContent()}
    </div>
  )
}

export default CenterOnboardingPage
