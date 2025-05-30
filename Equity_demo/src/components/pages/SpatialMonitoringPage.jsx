const SpatialMonitoringPage = () => (
  <div className="page-container">
    <div className="page-header">
      <h1>Spatial Monitoring</h1>
      <p>Real-time tracking of surgical instruments and equipment</p>
    </div>
    <div className="monitoring-grid">
      <div className="monitor-card">
        <h3>Operating Room 1</h3>
        <div className="status active">Active</div>
        <p>Current Procedure: Arthroscopy</p>
        <p>Instruments Tracked: 24/24</p>
      </div>
      <div className="monitor-card">
        <h3>Operating Room 2</h3>
        <div className="status standby">Standby</div>
        <p>Next Procedure: 2:30 PM</p>
        <p>Instruments Ready: 18/18</p>
      </div>
      <div className="monitor-card">
        <h3>Operating Room 3</h3>
        <div className="status maintenance">Maintenance</div>
        <p>Scheduled Cleaning</p>
        <p>Available: 4:00 PM</p>
      </div>
    </div>
  </div>
)

export default SpatialMonitoringPage
