import { useState } from "react"
import { ChartContainer } from "../../../components/ui/chart"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Dot, BarChart, Bar, Legend } from "recharts"

const patientDataWeekly = [
  { day: "Mon", count: 31 },
  { day: "Tue", count: 28 },
  { day: "Wed", count: 34 },
  { day: "Thu", count: 31 },
  { day: "Fri", count: 41 },
  { day: "Sat", count: 17 },
  { day: "Sun", count: 0 },
]

const patientDataMonthly = [
  { month: "Jan", count: 150 },
  { month: "Feb", count: 165 },
  { month: "Mar", count: 180 },
  { month: "Apr", count: 175 },
  { month: "May", count: 190 },
  { month: "Jun", count: 205 },
  { month: "Jul", count: 195 },
]

const patientDataYearly = [
  { year: 2019, count: 1800 },
  { year: 2020, count: 1750 },
  { year: 2021, count: 1900 },
  { year: 2022, count: 2100 },
  { year: 2023, count: 2350 },
  { year: 2024, count: 1247 }, // YTD
]

const todayCount = 41
const weeklyAvg = 26

// Sample Data for Surgeon Chart
const surgeonDataWeekly = [
  { name: 'James', actualCases: 10, expectedCases: 9, equityTarget: 8 },
  { name: 'Maria', actualCases: 7, expectedCases: 8, equityTarget: 7 },
  { name: 'Alex', actualCases: 8, expectedCases: 9, equityTarget: 8 },
]

const surgeonDataMonthly = [
  { name: 'James', actualCases: 42, expectedCases: 40, equityTarget: 35 },
  { name: 'Maria', actualCases: 29, expectedCases: 30, equityTarget: 31 },
  { name: 'Alex', actualCases: 33, expectedCases: 35, equityTarget: 34 },
]

const surgeonDataYearly = [
  { name: 'James', actualCases: 450, expectedCases: 480, equityTarget: 420 },
  { name: 'Maria', actualCases: 350, expectedCases: 360, equityTarget: 340 },
  { name: 'Alex', actualCases: 400, expectedCases: 420, equityTarget: 380 },
]

const DashboardPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Month') // Default to Month

  const getSurgeonData = () => {
    switch (selectedPeriod) {
      case 'Week':
        return surgeonDataWeekly
      case 'Month':
        return surgeonDataMonthly
      case 'Year':
        return surgeonDataYearly
      default:
        return surgeonDataMonthly // Default
    }
  }

  const surgeonData = getSurgeonData()

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Dashboard Overview</h1>
        <p>Monitor your surgery center's key performance indicators</p>
      </div>
      <div className="stats-grid" style={{ marginBottom: 32 }}>
        <div className="stat-card">
          <h3>Total Procedures</h3>
          <div className="stat-number">1,247</div>
          <div className="stat-change positive">+12% from last month</div>
        </div>
        <div className="stat-card">
          <h3>Revenue</h3>
          <div className="stat-number">$2.4M</div>
          <div className="stat-change positive">+8% from last month</div>
        </div>
        <div className="stat-card">
          <h3>Patient Satisfaction</h3>
          <div className="stat-number">4.8/5</div>
          <div className="stat-change positive">+0.2 from last month</div>
        </div>
        <div className="stat-card">
          <h3>Efficiency Score</h3>
          <div className="stat-number">94%</div>
          <div className="stat-change positive">+3% from last month</div>
        </div>
      </div>
      
      {/* Patient Throughput Charts */}
      <div style={{
        background: 'white',
        borderRadius: 12,
        boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
        padding: 24,
        marginBottom: 40,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0, marginRight: 8 }}>Patient Throughput</h2>
        </div>

        {/* Charts Layout */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}>
          {/* Weekly Chart */}
          <div style={{
            background: 'white',
            borderRadius: 12,
            boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
            padding: 24,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
            </div>
            <div style={{ color: '#6b7280', fontSize: 15, marginBottom: 12 }}>Patients processed per day (Weekly)</div>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={patientDataWeekly} margin={{ top: 8, right: 24, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="day" fontSize={14} tick={{ fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 60]} fontSize={14} tick={{ fill: '#6b7280' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', background: 'white', fontSize: 15 }}
                  labelStyle={{ fontWeight: 700, color: '#111827', fontSize: 16 }}
                  formatter={(value) => [value, 'count']}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 5, stroke: '#fff', strokeWidth: 2, fill: '#6366f1' }}
                  activeDot={{ r: 8, fill: '#6366f1', stroke: '#fff', strokeWidth: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
            {/* Weekly Stats */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
              <span style={{ color: '#6b7280', fontSize: 15 }}>Today's Count: <span style={{ fontWeight: 700, color: '#111827', fontSize: 18 }}>{todayCount}</span></span>
              <button style={{
                background: '#f3f4f6',
                color: '#1e40af',
                border: 'none',
                borderRadius: 8,
                padding: '6px 18px',
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                margin: '0 8px',
              }}>Today vs 7-Day</button>
              <span style={{ color: '#6b7280', fontSize: 15 }}>Weekly Average: <span style={{ fontWeight: 700, color: '#111827', fontSize: 18 }}>{weeklyAvg}</span></span>
            </div>
          </div>

          {/* Monthly and Yearly Charts Container */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
          }}>

            {/* Monthly Chart */}
            <div style={{
              background: 'white',
              borderRadius: 12,
              boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
              padding: 24,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
              </div>
              <div style={{ color: '#6b7280', fontSize: 15, marginBottom: 12 }}>Patients processed per day (Monthly)</div>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={patientDataMonthly} margin={{ top: 8, right: 24, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" fontSize={14} tick={{ fill: '#6b7280' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 250]} fontSize={14} tick={{ fill: '#6b7280' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', background: 'white', fontSize: 15 }}
                    labelStyle={{ fontWeight: 700, color: '#111827', fontSize: 16 }}
                    formatter={(value) => [value, 'count']}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={{ r: 5, stroke: '#fff', strokeWidth: 2, fill: '#6366f1' }}
                    activeDot={{ r: 8, fill: '#6366f1', stroke: '#fff', strokeWidth: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Yearly Chart */}
            <div style={{
              background: 'white',
              borderRadius: 12,
              boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
              padding: 24,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
              </div>
              <div style={{ color: '#6b7280', fontSize: 15, marginBottom: 12 }}>Patients processed per year (Yearly)</div>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={patientDataYearly} margin={{ top: 8, right: 24, left: 0, bottom: 8 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="year" fontSize={14} tick={{ fill: '#6b7280' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 3000]} fontSize={14} tick={{ fill: '#6b7280' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', background: 'white', fontSize: 15 }}
                    labelStyle={{ fontWeight: 700, color: '#111827', fontSize: 16 }}
                    formatter={(value) => [value, 'count']}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#6366f1"
                    strokeWidth={3}
                    dot={{ r: 5, stroke: '#fff', strokeWidth: 2, fill: '#6366f1' }}
                    activeDot={{ r: 8, fill: '#6366f1', stroke: '#fff', strokeWidth: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Surgeon Case Volume vs. Equity Milestones Chart */}
      <div style={{
        background: 'white',
        borderRadius: 12,
        boxShadow: '0 1px 3px rgba(0,0,0,0.07)',
        padding: 24,
        marginBottom: 40,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Surgeon Case Volumne Actual vs. Expected</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button 
              onClick={() => setSelectedPeriod('Week')}
              style={{
                background: selectedPeriod === 'Week' ? '#2563eb' : '#f3f4f6',
                color: selectedPeriod === 'Week' ? 'white' : '#1e40af',
                border: 'none',
                borderRadius: 6,
                padding: '6px 16px',
                fontWeight: 500,
                fontSize: 14,
                cursor: 'pointer',
                transition: 'background-color 0.2s ease, color 0.2s ease'
              }}
            >Week</button>
             <button
               onClick={() => setSelectedPeriod('Month')}
               style={{
                background: selectedPeriod === 'Month' ? '#2563eb' : '#f3f4f6',
                color: selectedPeriod === 'Month' ? 'white' : '#1e40af',
                border: 'none',
                borderRadius: 6,
                padding: '6px 16px',
                fontWeight: 500,
                fontSize: 14,
                cursor: 'pointer',
                transition: 'background-color 0.2s ease, color 0.2s ease'
              }}
            >Month</button>
             <button
               onClick={() => setSelectedPeriod('Year')}
               style={{
                background: selectedPeriod === 'Year' ? '#2563eb' : '#f3f4f6',
                color: selectedPeriod === 'Year' ? 'white' : '#1e40af',
                border: 'none',
                borderRadius: 6,
                padding: '6px 16px',
                fontWeight: 500,
                fontSize: 14,
                cursor: 'pointer',
                transition: 'background-color 0.2s ease, color 0.2s ease'
              }}
            >Year</button>
             <button style={{
              background: 'none',
              color: '#1e40af',
              border: '1px solid #d1d5db',
              borderRadius: 6,
              padding: '6px 16px',
              fontWeight: 500,
              fontSize: 14,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center', 
              gap: 4,
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{ width: 16, height: 16 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Export
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={surgeonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
            <XAxis dataKey="name" fontSize={14} tick={{ fill: '#6b7280' }} axisLine={false} tickLine={false} padding={{ left: 20, right: 20 }} />
            <YAxis domain={[0, selectedPeriod === 'Year' ? 500 : selectedPeriod === 'Month' ? 60 : 15]} fontSize={14} tick={{ fill: '#6b7280' }} axisLine={false} tickLine={false} label={{ value: 'Case Count', angle: -90, position: 'insideLeft', fill: '#6b7280', fontSize: 14 }} />
            <Tooltip
              contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb', background: 'white', fontSize: 14 }}
              labelStyle={{ fontWeight: 700, color: '#111827' }}
            />
            <Legend
              wrapperStyle={{ paddingTop: 16 }}
              iconType="circle"
              formatter={(value) => <span style={{ color: '#374151', fontSize: 14, fontWeight: 500 }}>{value}</span>}
            />
            <Bar dataKey="actualCases" fill="#2563eb" name="Actual Cases" barSize={30} radius={[4, 4, 0, 0]} />
            <Bar dataKey="expectedCases" fill="#10b981" name="Expected Cases" barSize={30} radius={[4, 4, 0, 0]} />
            <Line
              type="monotone"
              dataKey="equityTarget"
              stroke="#0d9488"
              strokeWidth={2}
              dot={{ r: 4, stroke: '#0d9488', strokeWidth: 2, fill: '#fff' }}
              name="Equity Target"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default DashboardPage
