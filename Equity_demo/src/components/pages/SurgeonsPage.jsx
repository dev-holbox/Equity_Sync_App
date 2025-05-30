"use client"

import { useState } from "react"
import SurgeonOnboardingPage from "./SurgeonOnboardingPage"

const SurgeonsPage = () => {
  const [showOnboarding, setShowOnboarding] = useState(false)

  return (
  <div className="page-container">
    <div className="page-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
      <h1>Surgeons Directory</h1>
      <p>Manage surgeon profiles, credentials, and performance metrics</p>
          </div>
          <button
            className="onboard-button"
            onClick={() => setShowOnboarding(true)}
            style={{
              background: "#1e40af",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>+</span>
            Surgeon Onboarding
          </button>
        </div>
    </div>
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Total Surgeons</h3>
        <div className="stat-number">24</div>
        <div className="stat-change positive">+2 this month</div>
      </div>
      <div className="stat-card">
        <h3>Active Surgeons</h3>
        <div className="stat-number">22</div>
        <div className="stat-change positive">92% active rate</div>
      </div>
      <div className="stat-card">
        <h3>Avg. Procedures/Month</h3>
        <div className="stat-number">18.5</div>
        <div className="stat-change positive">+1.2 from last month</div>
      </div>
      <div className="stat-card">
        <h3>Patient Satisfaction</h3>
        <div className="stat-number">4.9/5</div>
        <div className="stat-change positive">+0.1 from last month</div>
      </div>
    </div>
    <div className="equity-table">
      <div className="table-header">
        <div>Surgeon</div>
        <div>Specialty</div>
        <div>Procedures (Month)</div>
        <div>Status</div>
      </div>
      <div className="table-row">
        <div>Dr. Sarah Johnson</div>
        <div>Orthopedic Surgery</div>
        <div>24</div>
        <div>
          <span className="status active">Active</span>
        </div>
      </div>
      <div className="table-row">
        <div>Dr. Michael Chen</div>
        <div>Cardiothoracic Surgery</div>
        <div>18</div>
        <div>
          <span className="status active">Active</span>
        </div>
      </div>
      <div className="table-row">
        <div>Dr. Emily Rodriguez</div>
        <div>General Surgery</div>
        <div>22</div>
        <div>
          <span className="status active">Active</span>
        </div>
      </div>
      <div className="table-row">
        <div>Dr. James Wilson</div>
        <div>Neurosurgery</div>
        <div>15</div>
        <div>
          <span className="status active">Active</span>
        </div>
      </div>
      <div className="table-row">
        <div>Dr. Lisa Park</div>
        <div>Plastic Surgery</div>
        <div>20</div>
        <div>
          <span className="status standby">On Leave</span>
        </div>
      </div>
      <div className="table-row">
        <div>Dr. Robert Kim</div>
        <div>Ophthalmology</div>
        <div>16</div>
        <div>
          <span className="status active">Active</span>
        </div>
      </div>
    </div>

      {showOnboarding && <SurgeonOnboardingPage onClose={() => setShowOnboarding(false)} />}
  </div>
)
}

export default SurgeonsPage
