const CentersPage = () => (
  <div className="page-container">
    <div className="page-header">
      <h1>Surgery Centers Management</h1>
      <p>Manage and monitor all ambulatory surgery centers in your network</p>
    </div>
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Total Centers</h3>
        <div className="stat-number">8</div>
        <div className="stat-change positive">+1 this quarter</div>
      </div>
      <div className="stat-card">
        <h3>Active Centers</h3>
        <div className="stat-number">7</div>
        <div className="stat-change positive">87.5% operational</div>
      </div>
      <div className="stat-card">
        <h3>Total Procedures</h3>
        <div className="stat-number">3,247</div>
        <div className="stat-change positive">+15% this month</div>
      </div>
      <div className="stat-card">
        <h3>Network Revenue</h3>
        <div className="stat-number">$12.8M</div>
        <div className="stat-change positive">+8% this quarter</div>
      </div>
    </div>
    <div className="equity-table">
      <div className="table-header">
        <div>Center Name</div>
        <div>Location</div>
        <div>Procedures (Month)</div>
        <div>Status</div>
      </div>
      <div className="table-row">
        <div>Capital Surgery Center</div>
        <div>Austin, TX</div>
        <div>456</div>
        <div>
          <span className="status active">Active</span>
        </div>
      </div>
      <div className="table-row">
        <div>Metro Surgical Institute</div>
        <div>Dallas, TX</div>
        <div>523</div>
        <div>
          <span className="status active">Active</span>
        </div>
      </div>
      <div className="table-row">
        <div>Houston Medical Center</div>
        <div>Houston, TX</div>
        <div>612</div>
        <div>
          <span className="status active">Active</span>
        </div>
      </div>
      <div className="table-row">
        <div>San Antonio Surgery Hub</div>
        <div>San Antonio, TX</div>
        <div>389</div>
        <div>
          <span className="status active">Active</span>
        </div>
      </div>
      <div className="table-row">
        <div>Fort Worth Surgical</div>
        <div>Fort Worth, TX</div>
        <div>298</div>
        <div>
          <span className="status standby">Maintenance</span>
        </div>
      </div>
      <div className="table-row">
        <div>El Paso Surgery Center</div>
        <div>El Paso, TX</div>
        <div>267</div>
        <div>
          <span className="status active">Active</span>
        </div>
      </div>
      <div className="table-row">
        <div>Plano Medical Surgical</div>
        <div>Plano, TX</div>
        <div>445</div>
        <div>
          <span className="status active">Active</span>
        </div>
      </div>
      <div className="table-row">
        <div>Corpus Christi ASC</div>
        <div>Corpus Christi, TX</div>
        <div>257</div>
        <div>
          <span className="status active">Active</span>
        </div>
      </div>
    </div>
  </div>
)

export default CentersPage
