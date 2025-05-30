"use client"

import { useState } from "react"
import "./Dashboard.css"

// Import all page components
import DashboardPage from "./pages/DashboardPage"
import SpatialMonitoringPage from "./pages/SpatialMonitoringPage"
import SurgeonEquityPage from "./pages/SurgeonEquityPage"
import SurgeonsPage from "./pages/SurgeonsPage"
import CentersPage from "./pages/CentersPage"
import LabelingTrainingPage from "./pages/LabelingTrainingPage"
import InventoryMonitoringPage from "./pages/InventoryMonitoringPage"
import PromiseDeliveredPage from "./pages/PromiseDeliveredPage"
import EquityOnboardingPage from "./pages/EquityOnboardingPage"
import CenterOnboardingPage from "./pages/CenterOnboardingPage"

const Dashboard = ({ user, onLogout }) => {
  const [activePage, setActivePage] = useState("dashboard")

  const handleNavigation = (pageId) => {
    setActivePage(pageId)
  }

  const navigationItems = [
    { id: "dashboard", title: "Dashboard", icon: "📊" },
    // { id: "spatial-monitoring", title: "Spatial Monitoring", icon: "📍" },
    // { id: "surgeon-equity", title: "Surgeon Equity", icon: "📈" },
    { id: "surgeons", title: "Surgeons", icon: "👨‍⚕️" },
    { id: "centers", title: "Centers", icon: "🏥" },
    // { id: "labeling-training", title: "Labeling & Training", icon: "🏷️" },
    { id: "inventory-monitoring", title: "Stock & Supplies", icon: "📦" },
    // { id: "promise-delivered", title: "Promise vs. Delivered", icon: "📋" },
    // { id: "equity-onboarding", title: "Equity Onboarding", icon: "👥" },
    { id: "asc-onboarding", title: "Center Onboarding", icon: "🏢" },
  ]

  // Get current page title
  const getCurrentPageTitle = () => {
    const currentItem = navigationItems.find((item) => item.id === activePage)
    return currentItem ? currentItem.title : " "
  }

  const renderPageContent = () => {
    switch (activePage) {
      case "dashboard":
        return <DashboardPage />
      case "spatial-monitoring":
        return <SpatialMonitoringPage />
      case "surgeon-equity":
        return <SurgeonEquityPage />
      case "surgeons":
        return <SurgeonsPage />
      case "centers":
        return <CentersPage />
      case "labeling-training":
        return <LabelingTrainingPage />
      case "inventory-monitoring":
        return <InventoryMonitoringPage />
      case "promise-delivered":
        return <PromiseDeliveredPage />
      case "equity-onboarding":
        return <EquityOnboardingPage />
      case "asc-onboarding":
        return <CenterOnboardingPage />
      default:
        return <DashboardPage />
    }
  }

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-left">
          <img src="/images/sigmatic-logo.png" alt="Sigmatic Logo" style={{ height: "32px", width: "auto" }} />
          <h1 className="page-title" style={{ marginLeft: "60px" }}>
            {getCurrentPageTitle()}
          </h1>
        </div>
        <div className="header-right">
          <div className="header-icons">
            <button className="icon-btn settings">⚙️</button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Sidebar */}
        <aside className="sidebar">
          <nav className="sidebar-nav">
            {navigationItems.map((item) => (
              <div
                key={item.id}
                className={`nav-item ${activePage === item.id ? "active" : ""}`}
                onClick={() => handleNavigation(item.id)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span>{item.title}</span>
              </div>
            ))}
          </nav>

          {/* User Profile and Logout */}
          <div
            className="chat-interface"
            style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              padding: "12px 16px", /* Add padding similar to original */
              borderTop: "1px solid #e1e5e9" /* Add a top border */
            }}
          >
            <div className="user-profile">
              <div className="profile-avatar">SE</div>
              <div className="profile-details">
                <div className="profile-name">Sigmatic Engineer</div>
                <div className="profile-role">Super Admin</div>
              </div>
              <button className="profile-menu" onClick={onLogout}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16,17 21,12 16,7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main-content">{renderPageContent()}</main>
      </div>

      {/* Bottom Chat Interface (Keep copyright and chat container here) */}
      <div
        className="chat-interface"
        style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px" }}
      >
        <div className="chat-container"></div>
        <div style={{ fontSize: "13px", color: "#64748b", fontWeight: "500" }}>© 2025 ASC All Rights Reserved.</div>
      </div>
    </div>
  )
}

export default Dashboard
