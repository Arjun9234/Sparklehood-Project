import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiTrendingUp, FiAlertCircle, FiAlertTriangle, FiInfo } from 'react-icons/fi'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LabelList } from 'recharts'

const StatCard = ({ icon: Icon, title, value, color, onClick }) => (
  <motion.div
    className="card p-4"
    whileHover={{ scale: 1.02 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    onClick={onClick} 
  >
    <div className="flex items-center space-x-3">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  </motion.div>
)

const Statistics = ({ stats }) => {
  const [selectedStat, setSelectedStat] = useState(null)

  const handleCardClick = (stat) => {
    setSelectedStat(stat === selectedStat ? null : stat)
  }

  const data = {
    total: [
      { name: 'Total Incidents', value: stats.total },
    ],
    high: [
      { name: 'High Severity', value: stats.high },
    ],
    medium: [
      { name: 'Medium Severity', value: stats.medium },
    ],
    low: [
      { name: 'Low Severity', value: stats.low },
    ],
    recent: [
      { name: 'Last 7 Days', value: stats.recentIncidents },
    ],
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard
          icon={FiTrendingUp}
          title="Total Incidents"
          value={stats.total}
          color="bg-primary-500"
          onClick={() => handleCardClick('total')}
        />
        <StatCard
          icon={FiAlertCircle}
          title="High Severity"
          value={stats.high}
          color="bg-error-500"
          onClick={() => handleCardClick('high')}
        />
        <StatCard
          icon={FiAlertTriangle}
          title="Medium Severity"
          value={stats.medium}
          color="bg-warning-500"
          onClick={() => handleCardClick('medium')}
        />
        <StatCard
          icon={FiInfo}
          title="Low Severity"
          value={stats.low}
          color="bg-success-500"
          onClick={() => handleCardClick('low')}
        />
        <StatCard
          icon={FiTrendingUp}
          title="Last 7 Days"
          value={stats.recentIncidents}
          color="bg-secondary-500"
          onClick={() => handleCardClick('recent')}
        />
      </div>

      
      {selectedStat && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">{`${selectedStat.charAt(0).toUpperCase() + selectedStat.slice(1)} Chart`}</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data[selectedStat]} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="value"
                fill={selectedStat === 'high' ? "#FF4D4D" : selectedStat === 'medium' ? "#FFB84D" : selectedStat === 'low' ? "#4DFF88" : "#4F46E5"}
                radius={[8, 8, 0, 0]}
                animationDuration={1000}
              >
                <LabelList dataKey="value" position="top" fill="#333" fontSize={14} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}

export default Statistics
