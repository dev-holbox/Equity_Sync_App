"use client"

import { useState } from "react"

// CPT code master list for dropdown
const CPT_CODE_LIST = [
  { code: "29827", description: "Arthroscopic Rotator Cuff Repair", revenuePerCase: 2500 },
  { code: "31231", description: "Nasal Endoscopy", revenuePerCase: 900 },
  { code: "47562", description: "Laparoscopic Cholecystectomy", revenuePerCase: 1800 },
  { code: "66984", description: "Cataract Surgery", revenuePerCase: 1200 },
  { code: "19325", description: "Breast Augmentation", revenuePerCase: 3500 },
  { code: "23410", description: "Shoulder Repair", revenuePerCase: 2200 },
  { code: "64721", description: "Carpal Tunnel Release", revenuePerCase: 1100 },
  { code: "20680", description: "Removal of Implant", revenuePerCase: 950 },
  { code: "42820", description: "Tonsillectomy", revenuePerCase: 800 },
  { code: "Other", description: "Other (Manual Entry)", revenuePerCase: 0 },
]

const SurgeonOnboardingPage = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Prospect Intake
    name: "",
    npiNumber: "",
    specialty: "",
    location: "",
    surgeryCenter: "",
    resume: null,
    adminNotes: "",
    status: "New",

    // Step 2: Volume Vetting
    expectedMonthlyCases: "",
    cptCodes: [],
    safeHarborPercentage: 33,

    // Step 3: Equity Offer
    monthlyVolumeTarget: 0,
    annualRevenue: 0,
    safeHarborCompliance: 0,
    recommendedEquity: 0,
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        resume: file,
      }))
    }
  }

  const handleAddCptCode = () => {
    setFormData((prev) => ({
      ...prev,
      cptCodes: [
        ...prev.cptCodes,
        {
          code: "",
          description: "",
          expectedCases: "",
          revenuePerCase: "",
        },
      ],
    }))
  }

  const handleCptCodeChange = (index, field, value) => {
    setFormData((prev) => {
      const newCptCodes = [...prev.cptCodes]
      newCptCodes[index] = {
        ...newCptCodes[index],
        [field]: value,
      }
      return {
        ...prev,
        cptCodes: newCptCodes,
      }
    })
  }

  const handleCptDropdownChange = (index, value) => {
    const selected = CPT_CODE_LIST.find((c) => c.code === value)
    setFormData((prev) => {
      const newCptCodes = [...prev.cptCodes]
      if (selected) {
        newCptCodes[index] = {
          ...newCptCodes[index],
          code: selected.code,
          description: selected.description,
          revenuePerCase: selected.revenuePerCase || "",
        }
      } else {
        newCptCodes[index] = {
          ...newCptCodes[index],
          code: value,
        }
      }
      return { ...prev, cptCodes: newCptCodes }
    })
  }

  const handleRemoveCptCode = (index) => {
    setFormData((prev) => {
      const newCptCodes = [...prev.cptCodes]
      newCptCodes.splice(index, 1)
      return { ...prev, cptCodes: newCptCodes }
    })
  }

  const getCptTotal = (cpt) => {
    const cases = parseInt(cpt.expectedCases || 0, 10)
    const revenue = parseFloat(cpt.revenuePerCase || 0)
    return cases * revenue
  }

  const totalCases = formData.cptCodes.reduce((sum, c) => sum + parseInt(c.expectedCases || 0, 10), 0)
  const totalRevenue = formData.cptCodes.reduce((sum, c) => sum + getCptTotal(c), 0)

  const validateStep1 = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.npiNumber.trim()) newErrors.npiNumber = "NPI Number is required"
    if (!formData.specialty.trim()) newErrors.specialty = "Specialty is required"
    if (!formData.location.trim()) newErrors.location = "Location is required"
    return newErrors
  }

  const validateStep2 = () => {
    const newErrors = {}
    if (!formData.expectedMonthlyCases) newErrors.expectedMonthlyCases = "Expected monthly cases is required"
    if (formData.cptCodes.length === 0) newErrors.cptCodes = "At least one CPT code is required"
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    let stepErrors = {}
    if (currentStep === 1) {
      stepErrors = validateStep1()
    } else if (currentStep === 2) {
      stepErrors = validateStep2()
    }

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      setIsSubmitting(false)
      return
    }

    if (currentStep < 3) {
      // Calculate values for Equity Offer page when moving from Step 2 to 3
      if (currentStep === 2) {
        const monthlyVolume = parseInt(formData.expectedMonthlyCases || 0)
        const annualRevenue = totalRevenue * 12
        const safeHarborCompliance = formData.safeHarborPercentage
        const recommendedEquity = Math.min(5, Math.max(1, (monthlyVolume / 100) * 2))

        setFormData(prev => ({
          ...prev,
          monthlyVolumeTarget: monthlyVolume,
          annualRevenue: annualRevenue,
          safeHarborCompliance: safeHarborCompliance,
          recommendedEquity: recommendedEquity
        }))
      }

      setTimeout(() => {
        setCurrentStep(currentStep + 1)
        setIsSubmitting(false)
      }, 1000)
    } else {
      // Handle final submission
      console.log("Form submitted:", formData)
      setIsSubmitting(false)
      onClose()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-panel" style={{ padding: '20px 28px 16px 28px', background: '#fff', borderRadius: '0 0 12px 12px', marginBottom: 0 }}>
            <div className="panel-header" style={{ marginBottom: 12 }}>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1e293b', margin: 0 }}>Surgeon details</h2>
              <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>Collect surgeon information & documents</p>
            </div>

            <form className="surgery-form" onSubmit={handleSubmit}>
              <div className="form-section" style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 0 }}>
                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 0 }}>
                  <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 0 }}>
                    <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', marginBottom: 1 }} htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Dr. John Smith"
                      className={errors.name ? "error" : ""}
                      style={{ fontSize: 13, padding: '6px 8px', borderRadius: 6, border: '1px solid #d1d5db', background: '#fff', height: 34 }}
                    />
                    {errors.name && <div className="error-text">{errors.name}</div>}
                  </div>

                  <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 0 }}>
                    <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', marginBottom: 1 }} htmlFor="npiNumber">NPI Number</label>
                    <input
                      type="text"
                      id="npiNumber"
                      name="npiNumber"
                      value={formData.npiNumber}
                      onChange={handleInputChange}
                      placeholder="1234567890"
                      className={errors.npiNumber ? "error" : ""}
                      style={{ fontSize: 13, padding: '6px 8px', borderRadius: 6, border: '1px solid #d1d5db', background: '#fff', height: 34 }}
                    />
                    {errors.npiNumber && <div className="error-text">{errors.npiNumber}</div>}
                  </div>
                </div>

                <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 0 }}>
                  <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 0 }}>
                    <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', marginBottom: 1 }} htmlFor="specialty">Specialty</label>
                    <select
                      id="specialty"
                      name="specialty"
                      value={formData.specialty}
                      onChange={handleInputChange}
                      className={errors.specialty ? "error" : ""}
                      style={{ fontSize: 13, padding: '6px 8px', borderRadius: 6, border: '1px solid #d1d5db', background: '#fff', height: 34 }}
                    >
                      <option value="">Select Specialty</option>
                      <option value="Orthopedic Surgery">Orthopedic Surgery</option>
                      <option value="General Surgery">General Surgery</option>
                      <option value="Neurosurgery">Neurosurgery</option>
                      <option value="Cardiothoracic Surgery">Cardiothoracic Surgery</option>
                      <option value="Plastic Surgery">Plastic Surgery</option>
                      <option value="Ophthalmology">Ophthalmology</option>
                      <option value="ENT (Otolaryngology)">ENT (Otolaryngology)</option>
                      <option value="Urology">Urology</option>
                      <option value="Gynecology">Gynecology</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.specialty && <div className="error-text">{errors.specialty}</div>}
                  </div>

                  <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 0 }}>
                    <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', marginBottom: 1 }} htmlFor="location">Location</label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, State"
                      className={errors.location ? "error" : ""}
                      style={{ fontSize: 13, padding: '6px 8px', borderRadius: 6, border: '1px solid #d1d5db', background: '#fff', height: 34 }}
                    />
                    {errors.location && <div className="error-text">{errors.location}</div>}
                  </div>
                </div>

                <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 0 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', marginBottom: 1 }} htmlFor="surgeryCenter">Attach to Surgery Center (Optional)</label>
                  <input
                    type="text"
                    id="surgeryCenter"
                    name="surgeryCenter"
                    value={formData.surgeryCenter}
                    onChange={handleInputChange}
                    placeholder="Select Surgery Center"
                    style={{ fontSize: 13, padding: '6px 8px', borderRadius: 6, border: '1px solid #d1d5db', background: '#fff', height: 34 }}
                  />
                </div>

                <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 0 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', marginBottom: 1 }} htmlFor="resume">Upload Documents</label>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx"
                    style={{ fontSize: 13, padding: '6px 8px', borderRadius: 6, border: '1px solid #d1d5db', background: '#fff', height: 34 }}
                  />
                </div>

                <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 0 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', marginBottom: 1 }} htmlFor="adminNotes">Admin Notes / Internal Tags</label>
                  <textarea
                    id="adminNotes"
                    name="adminNotes"
                    value={formData.adminNotes}
                    onChange={handleInputChange}
                    placeholder="Add any internal notes or tags"
                    rows="3"
                    style={{ fontSize: 13, padding: '6px 8px', borderRadius: 6, border: '1px solid #d1d5db', background: '#fff', minHeight: 34, maxHeight: 60 }}
                  />
                </div>
              </div>

              <button type="submit" className="continue-button" style={{ marginTop: 14, alignSelf: 'flex-end', padding: '8px 20px', fontSize: 15, borderRadius: 6, background: '#2563eb', color: '#fff', fontWeight: 600, border: 'none' }} disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Continue to Volume Vetting"}
              </button>
            </form>
          </div>
        )

      case 2:
        return (
          <div className="form-panel" style={{ padding: '16px 28px 16px 28px', background: '#fff', borderRadius: '0 0 12px 12px', marginBottom: 0 }}>
            <div className="panel-header">
              <h2>Volume Vetting</h2>
              <p>Evaluate surgeon's case volume and CPT codes</p>
            </div>

            <form className="surgery-form" onSubmit={handleSubmit}>
              <div className="form-section" style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 0 }}>
                <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 0 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', marginBottom: 2 }} htmlFor="expectedMonthlyCases">Expected Monthly Case Volume</label>
                  <input
                    type="number"
                    id="expectedMonthlyCases"
                    name="expectedMonthlyCases"
                    value={formData.expectedMonthlyCases}
                    onChange={handleInputChange}
                    placeholder="Enter expected cases per month"
                    className={errors.expectedMonthlyCases ? "error" : ""}
                    style={{ fontSize: 13, padding: '6px 8px', borderRadius: 6, border: '1px solid #d1d5db', background: '#fff' }}
                  />
                  {errors.expectedMonthlyCases && <div className="error-text">{errors.expectedMonthlyCases}</div>}
                </div>

                <div className="cpt-codes-section" style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 0, marginTop: 12 }}>
                  <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: 13, tableLayout: 'fixed' }}>
                    <colgroup>
                      <col style={{ width: '90px' }} />
                      <col style={{ width: '180px' }} />
                      <col style={{ width: '90px' }} />
                      <col style={{ width: '110px' }} />
                      <col style={{ width: '90px' }} />
                      <col style={{ width: '30px' }} />
                    </colgroup>
                    <thead style={{ background: '#f8fafc' }}>
                      <tr>
                        <th style={{ padding: '10px 6px', textAlign: 'left', fontWeight: 700, color: '#1e293b', fontSize: 12, letterSpacing: 0.1 }}>CPT Code</th>
                        <th style={{ padding: '10px 6px', textAlign: 'left', fontWeight: 700, color: '#1e293b', fontSize: 12, letterSpacing: 0.1 }}>Description</th>
                        <th style={{ padding: '10px 6px', textAlign: 'center', fontWeight: 700, color: '#1e293b', fontSize: 12, letterSpacing: 0.1 }}>Cases/Month</th>
                        <th style={{ padding: '10px 6px', textAlign: 'center', fontWeight: 700, color: '#1e293b', fontSize: 12, letterSpacing: 0.1 }}>Revenue/Case</th>
                        <th style={{ padding: '10px 6px', textAlign: 'right', fontWeight: 700, color: '#1e293b', fontSize: 12, letterSpacing: 0.1 }}>Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.cptCodes.map((cpt, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6', background: idx % 2 === 0 ? '#fff' : '#f9fafb' }}>
                          <td style={{ padding: '6px' }}>
                            <select
                              value={cpt.code}
                              onChange={e => handleCptDropdownChange(idx, e.target.value)}
                              style={{ width: '100%', padding: '5px 6px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: 13, fontWeight: 500, color: '#1e293b', background: '#fff' }}
                            >
                              <option value="">Select</option>
                              {CPT_CODE_LIST.map(opt => (
                                <option key={opt.code} value={opt.code}>{opt.code}</option>
                              ))}
                            </select>
                          </td>
                          <td style={{ padding: '6px', minWidth: 80, maxWidth: 180, overflow: 'hidden' }}>
                            <input
                              type="text"
                              value={cpt.description}
                              onChange={e => handleCptCodeChange(idx, 'description', e.target.value)}
                              style={{ width: '100%', border: 'none', background: 'transparent', fontSize: 13, color: '#334155', fontWeight: 500, overflow: 'hidden', whiteSpace: 'normal', lineHeight: 1.3, padding: 0, height: 'auto', minHeight: 18, maxHeight: 36, display: 'block' }}
                              placeholder="Description"
                              readOnly={cpt.code !== 'Other'}
                              maxLength={80}
                            />
                          </td>
                          <td style={{ padding: '6px', textAlign: 'center' }}>
                            <input
                              type="number"
                              min="0"
                              value={cpt.expectedCases}
                              onChange={e => handleCptCodeChange(idx, 'expectedCases', e.target.value)}
                              style={{ width: 48, textAlign: 'center', border: '1px solid #d1d5db', borderRadius: 6, padding: '3px', fontSize: 13 }}
                              placeholder="0"
                            />
                          </td>
                          <td style={{ padding: '6px', textAlign: 'center' }}>
                            <span style={{ color: '#64748b', marginRight: 2, fontWeight: 600, fontSize: 13 }}>$</span>
                            <input
                              type="number"
                              min="0"
                              value={cpt.revenuePerCase}
                              onChange={e => handleCptCodeChange(idx, 'revenuePerCase', e.target.value)}
                              style={{ width: 60, textAlign: 'center', border: '1px solid #d1d5db', borderRadius: 6, padding: '3px', fontSize: 13 }}
                              placeholder="0"
                              readOnly={cpt.code !== 'Other' && CPT_CODE_LIST.some(opt => opt.code === cpt.code)}
                            />
                          </td>
                          <td style={{ padding: '6px', textAlign: 'right', fontWeight: 700, color: '#1e293b', fontSize: 13 }}>
                            {getCptTotal(cpt).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                          </td>
                          <td style={{ padding: '6px', textAlign: 'center' }}>
                            <button type="button" onClick={() => handleRemoveCptCode(idx)} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: 16, cursor: 'pointer', fontWeight: 700, lineHeight: 1 }}>&times;</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px 8px 8px', borderTop: '1px solid #f3f4f6', background: '#f8fafc', borderRadius: '0 0 10px 10px' }}>
                    <button type="button" className="add-button" style={{ background: 'none', color: '#2563eb', border: 'none', fontWeight: 700, fontSize: 13, padding: 0, cursor: 'pointer' }} onClick={handleAddCptCode}>
                      + Add CPT Code
                    </button>
                    <div style={{ fontWeight: 700, color: '#1e293b', fontSize: 13 }}>
                      {totalCases}
                      <span style={{ color: '#64748b', fontWeight: 500, marginLeft: 4 }}>Total</span>
                      <span style={{ marginLeft: 12, color: '#1e293b', fontWeight: 700 }}>{totalRevenue.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}</span>
                    </div>
                  </div>
                </div>

                <div className="form-field" style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 0 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: '#374151', marginBottom: 2 }} htmlFor="safeHarborPercentage">Safe Harbor Percentage</label>
                  <input
                    type="number"
                    id="safeHarborPercentage"
                    name="safeHarborPercentage"
                    value={formData.safeHarborPercentage}
                    onChange={handleInputChange}
                    placeholder="Enter safe harbor percentage"
                    style={{ fontSize: 13, padding: '6px 8px', borderRadius: 6, border: '1px solid #d1d5db', background: '#fff' }}
                  />
                </div>
              </div>

              <div className="form-actions" style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 16 }}>
                <button type="button" onClick={handleBack} style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #d1d5db', background: '#fff', color: '#374151', fontWeight: 500, cursor: 'pointer' }}>
                  Back
                </button>
                <button type="submit" className="continue-button" style={{ padding: '8px 16px', borderRadius: 6, background: '#2563eb', color: '#fff', fontWeight: 500, cursor: 'pointer', border: 'none' }} disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : "Continue to Equity Offer"}
                </button>
              </div>
            </form>
          </div>
        )

      case 3:
        return (
          <div className="form-panel" style={{ padding: '16px 28px 16px 28px', background: '#fff', borderRadius: '0 0 12px 12px', marginBottom: 0 }}>
            <div className="panel-header">
              <h2>Equity Offer Generation</h2>
              <p>Review and finalize equity offer for the surgeon</p>
            </div>

            <form className="surgery-form" onSubmit={handleSubmit}>
              <div className="form-section" style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 0 }}>
                <div className="summary-card" style={{ background: '#f8fafc', borderRadius: 12, padding: 20, border: '1px solid #e2e8f0' }}>
                  <h3 style={{ fontSize: 16, fontWeight: 600, color: '#1e293b', marginBottom: 16 }}>Volume & Revenue Summary</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div className="summary-item">
                      <label style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>Monthly Volume Target</label>
                      <div style={{ fontSize: 20, fontWeight: 600, color: '#1e293b' }}>{formData.monthlyVolumeTarget} cases</div>
                    </div>
                    <div className="summary-item">
                      <label style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>Annual Revenue</label>
                      <div style={{ fontSize: 20, fontWeight: 600, color: '#1e293b' }}>
                        {formData.annualRevenue.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                      </div>
                    </div>
                    <div className="summary-item">
                      <label style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>Safe Harbor Compliance</label>
                      <div style={{ fontSize: 20, fontWeight: 600, color: '#1e293b' }}>{formData.safeHarborCompliance}%</div>
                    </div>
                    <div className="summary-item">
                      <label style={{ fontSize: 13, color: '#64748b', marginBottom: 4 }}>Recommended Equity</label>
                      <div style={{ fontSize: 20, fontWeight: 600, color: '#1e293b' }}>{formData.recommendedEquity}%</div>
                    </div>
                  </div>
                </div>

                <div className="form-actions" style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                  <button type="button" onClick={handleBack} style={{ padding: '8px 16px', borderRadius: 6, border: '1px solid #d1d5db', background: '#fff', color: '#374151', fontWeight: 500, cursor: 'pointer' }}>
                    Back
                  </button>
                  <button type="button" className="generate-offer-button" style={{ padding: '8px 16px', borderRadius: 6, background: '#2563eb', color: '#fff', fontWeight: 500, cursor: 'pointer', border: 'none' }}>
                    Generate Offer Letter
                  </button>
                  <button type="button" className="send-email-button" style={{ padding: '8px 16px', borderRadius: 6, background: '#059669', color: '#fff', fontWeight: 500, cursor: 'pointer', border: 'none' }}>
                    Send Email to Surgeon
                  </button>
                </div>
              </div>

              <button type="submit" className="continue-button" style={{ marginTop: 10, alignSelf: 'flex-end' }} disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Complete Onboarding"}
              </button>
            </form>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="onboarding-modal">
      <div className="onboarding-content" style={{ maxWidth: 760, width: 760 }}>
        <div className="onboarding-header">
          <h2>Surgeon Onboarding</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>

        <div className="onboarding-steps" style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '32px 28px 16px 28px',
          background: '#fff',
          borderBottom: '1px solid #e5e7eb',
          position: 'relative',
          userSelect: 'none',
        }}>
          {/* No progress line at all */}
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
            {[1,2,3].map((step) => {
              const isCompleted = currentStep > step;
              const isCurrent = currentStep === step;
              return (
                <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: isCompleted ? 'linear-gradient(135deg, #4f9cf9 0%, #2563eb 60%, #1e40af 100%)' : isCurrent ? '#fff' : '#f3f4f6',
                    border: isCurrent ? '3px solid #2563eb' : '3px solid #e5e7eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: isCurrent ? '0 2px 8px rgba(37, 99, 235, 0.10)' : 'none',
                    transition: 'all 0.3s',
                  }}>
                    {isCompleted ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="12" fill="white" fillOpacity="0.08"/>
                        <path d="M7 13.5L11 17L17 10.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <span style={{
                        color: isCurrent ? '#2563eb' : '#a1a1aa',
                        fontWeight: 700,
                        fontSize: 20,
                        transition: 'color 0.3s',
                      }}>{step}</span>
                    )}
                  </div>
                  <span style={{
                    marginTop: 10,
                    fontWeight: isCurrent ? 700 : 500,
                    color: isCurrent ? '#2563eb' : '#64748b',
                    fontSize: 15,
                    letterSpacing: 0.1,
                    transition: 'color 0.3s',
                    textAlign: 'center',
                    minWidth: 80,
                  }}>
                    {step === 1 ? 'Surgeon Details' : step === 2 ? 'Volume Vetting' : 'Equity Offer'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {renderStepContent()}
      </div>
    </div>
  )
}

export default SurgeonOnboardingPage 