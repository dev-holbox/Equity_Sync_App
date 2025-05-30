const PromiseDeliveredPage = () => (
  <div className="page-container">
    <div className="page-header">
      <h1>Promise vs. Delivered</h1>
      <p>Track performance against commitments and expectations</p>
    </div>
    <div className="metrics-grid">
      <div className="metric-card">
        <h3>Procedure Time</h3>
        <div className="metric-comparison">
          <div className="promised">Promised: 45 min</div>
          <div className="delivered">Delivered: 42 min</div>
          <div className="variance positive">-3 min (Better)</div>
        </div>
      </div>
      <div className="metric-card">
        <h3>Recovery Time</h3>
        <div className="metric-comparison">
          <div className="promised">Promised: 2 hours</div>
          <div className="delivered">Delivered: 1.8 hours</div>
          <div className="variance positive">-0.2 hours (Better)</div>
        </div>
      </div>
      <div className="metric-card">
        <h3>Cost Estimate</h3>
        <div className="metric-comparison">
          <div className="promised">Promised: $8,500</div>
          <div className="delivered">Delivered: $8,200</div>
          <div className="variance positive">-$300 (Better)</div>
        </div>
      </div>
    </div>
  </div>
)

export default PromiseDeliveredPage
