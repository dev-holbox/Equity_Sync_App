import { useState } from "react"

const sampleInventory = [
  { id: 1, name: "Surgical Gloves (Size M)", category: "Consumable", stock: 12, status: "Low Stock" },
  { id: 2, name: "Arthroscopic Instruments", category: "Equipment", stock: 0, status: "Out of Stock" },
  { id: 3, name: "Sutures and Bandages", category: "Consumable", stock: 120, status: "In Stock" },
  { id: 4, name: "Sterile Drapes", category: "Consumable", stock: 8, status: "Low Stock" },
  { id: 5, name: "Surgical Masks", category: "Consumable", stock: 0, status: "Out of Stock" },
  { id: 6, name: "Scalpels", category: "Instrument", stock: 30, status: "In Stock" },
]

const InventoryMonitoringPage = () => {
  const [inventory] = useState(sampleInventory)

  // Stats
  const totalItems = inventory.length
  const lowStock = inventory.filter(i => i.status === "Low Stock").length
  const outOfStock = inventory.filter(i => i.status === "Out of Stock").length
  const deliveries = 1 // Example static value

  return (
  <div className="page-container">
    <div className="page-header">
        <h1>Stock and Supplies</h1>
      <p>Real-time tracking of surgical supplies and equipment</p>
    </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Items</h3>
          <div className="stat-number">{totalItems}</div>
          <div className="stat-change positive">+2 this week</div>
        </div>
        <div className="stat-card">
          <h3>Low Stock</h3>
          <div className="stat-number" style={{ color: '#f59e0b' }}>{lowStock}</div>
          <div className="stat-change negative">Check inventory</div>
        </div>
        <div className="stat-card">
          <h3>Out of Stock</h3>
          <div className="stat-number" style={{ color: '#dc2626' }}>{outOfStock}</div>
          <div className="stat-change negative">Immediate action</div>
        </div>
        <div className="stat-card">
          <h3>Upcoming Deliveries</h3>
          <div className="stat-number" style={{ color: '#2563eb' }}>{deliveries}</div>
          <div className="stat-change positive">On schedule</div>
        </div>
      </div>

      {/* Alert Cards */}
      <div className="inventory-alerts" style={{ 
        marginBottom: 32,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px'
      }}>
        <div className="alert-card warning" style={{
          padding: '16px',
          borderRadius: '8px',
          backgroundColor: '#fef3c7',
          border: '1px solid #fbbf24'
        }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#92400e' }}>Low Stock Alert</h3>
          <p style={{ margin: '0 0 12px 0', color: '#78350f' }}>Surgical Gloves (Size M) - 12 boxes remaining</p>
          <button className="reorder-btn" style={{
            padding: '6px 12px',
            backgroundColor: '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '13px',
            fontWeight: 500
          }}>Reorder Now</button>
        </div>
        <div className="alert-card info" style={{
          padding: '16px',
          borderRadius: '8px',
          backgroundColor: '#dbeafe',
          border: '1px solid #93c5fd'
        }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#1e40af' }}>Scheduled Delivery</h3>
          <p style={{ margin: '0 0 12px 0', color: '#1e3a8a' }}>Arthroscopic instruments - Arriving tomorrow</p>
        </div>
        <div className="alert-card success" style={{
          padding: '16px',
          borderRadius: '8px',
          backgroundColor: '#dcfce7',
          border: '1px solid #86efac'
        }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#166534' }}>Stock Replenished</h3>
          <p style={{ margin: '0 0 12px 0', color: '#14532d' }}>Sutures and bandages - Fully stocked</p>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="equity-table" style={{ 
        marginBottom: 40,
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        <div className="table-header" style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr',
          padding: '16px 24px',
          backgroundColor: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          fontWeight: 600,
          color: '#475569',
          fontSize: '14px'
        }}>
          <div>Item</div>
          <div>Category</div>
          <div>Stock</div>
          <div>Status</div>
          <div>Actions</div>
        </div>
        {inventory.map(item => (
          <div className="table-row" key={item.id} style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr',
            padding: '16px 24px',
            borderBottom: '1px solid #e2e8f0',
            alignItems: 'center',
            transition: 'background-color 0.2s ease',
            ':hover': {
              backgroundColor: '#f8fafc'
            }
          }}>
            <div style={{ fontWeight: 500, color: '#1e293b' }}>{item.name}</div>
            <div style={{ color: '#64748b' }}>{item.category}</div>
            <div style={{ 
              fontWeight: 600,
              color: item.stock === 0 ? '#dc2626' : item.stock < 20 ? '#f59e0b' : '#16a34a'
            }}>{item.stock}</div>
            <div>
              <span style={{
                padding: '6px 12px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: 500,
                backgroundColor: 
                  item.status === "Low Stock" ? '#fef3c7' :
                  item.status === "Out of Stock" ? '#fee2e2' :
                  '#dcfce7',
                color:
                  item.status === "Low Stock" ? '#92400e' :
                  item.status === "Out of Stock" ? '#991b1b' :
                  '#166534'
              }}>
                {item.status}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {item.status !== "In Stock" && (
                <button className="reorder-btn" style={{ 
                  padding: '8px 16px',
                  fontSize: 13,
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  ':hover': {
                    backgroundColor: '#1d4ed8'
                  }
                }}>Reorder</button>
              )}
              <button
                style={{
                  background: '#f1f5f9',
                  color: '#1e40af',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '8px 16px',
                  fontWeight: 500,
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  ':hover': {
                    backgroundColor: '#e2e8f0'
                  }
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
    </div>
  </div>
)
}

export default InventoryMonitoringPage
