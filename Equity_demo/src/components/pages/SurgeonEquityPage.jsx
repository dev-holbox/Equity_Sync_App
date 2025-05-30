const SurgeonEquityPage = () => (
  <div className="page-container">
    <div className="page-header">
      <h1>Surgeon Equity Management</h1>
      <p>Track and manage surgeon ownership and equity distribution</p>
    </div>
    <div className="equity-table">
      <div className="table-header">
        <div>Surgeon</div>
        <div>Equity %</div>
        <div>Procedures</div>
        <div>Revenue Share</div>
      </div>
      <div className="table-row">
        <div>Dr. Sarah Johnson</div>
        <div>25%</div>
        <div>156</div>
        <div>$600,000</div>
      </div>
      <div className="table-row">
        <div>Dr. Michael Chen</div>
        <div>20%</div>
        <div>134</div>
        <div>$480,000</div>
      </div>
      <div className="table-row">
        <div>Dr. Emily Rodriguez</div>
        <div>18%</div>
        <div>98</div>
        <div>$432,000</div>
      </div>
    </div>
  </div>
)

export default SurgeonEquityPage
