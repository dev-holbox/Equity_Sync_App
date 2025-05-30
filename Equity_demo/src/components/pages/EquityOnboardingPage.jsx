const EquityOnboardingPage = () => (
  <div className="page-container">
    <div className="page-header">
      <h1>Equity Onboarding</h1>
    </div>
    <div className="onboarding-pipeline">
      <div className="pipeline-stage">
        <h3>Application Review</h3>
        <div className="candidate-list">
          <div className="candidate">Dr. James Wilson - Orthopedic</div>
          <div className="candidate">Dr. Lisa Park - Cardiothoracic</div>
        </div>
      </div>
      <div className="pipeline-stage">
        <h3>Due Diligence</h3>
        <div className="candidate-list">
          <div className="candidate">Dr. Robert Kim - Neurosurgery</div>
        </div>
      </div>
      <div className="pipeline-stage">
        <h3>Contract Negotiation</h3>
        <div className="candidate-list">
          <div className="candidate">Dr. Maria Garcia - General Surgery</div>
        </div>
      </div>
    </div>
  </div>
)

export default EquityOnboardingPage
