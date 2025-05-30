const LabelingTrainingPage = () => (
  <div className="page-container">
    <div className="page-header">
      <h1>Labeling & Training</h1>
      <p>AI-powered surgical procedure labeling and staff training modules</p>
    </div>
    <div className="training-modules">
      <div className="module-card">
        <h3>Instrument Recognition</h3>
        <div className="progress-bar">
          <div className="progress" style={{ width: "85%" }}></div>
        </div>
        <p>85% Complete - 12 staff members trained</p>
      </div>
      <div className="module-card">
        <h3>Procedure Documentation</h3>
        <div className="progress-bar">
          <div className="progress" style={{ width: "92%" }}></div>
        </div>
        <p>92% Complete - 15 staff members trained</p>
      </div>
      <div className="module-card">
        <h3>Safety Protocols</h3>
        <div className="progress-bar">
          <div className="progress" style={{ width: "78%" }}></div>
        </div>
        <p>78% Complete - 10 staff members trained</p>
      </div>
    </div>
  </div>
)

export default LabelingTrainingPage
