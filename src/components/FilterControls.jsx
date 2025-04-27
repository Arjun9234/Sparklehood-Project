import { motion } from 'framer-motion'
import { FiFilter, FiChevronDown } from 'react-icons/fi'

const FilterControls = ({ selectedSeverity, setSelectedSeverity, sortOrder, setSortOrder }) => {
  const severityOptions = ['All', 'High', 'Medium', 'Low']
  
  return (
    <motion.div 
      className="flex flex-col sm:flex-row gap-3"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiFilter className="text-gray-500" />
        </div>
        <select
          className="form-input pl-10 pr-10 appearance-none"
          value={selectedSeverity}
          onChange={(e) => setSelectedSeverity(e.target.value)}
          aria-label="Filter by severity"
        >
          {severityOptions.map(option => (
            <option key={option} value={option}>
              {option === 'All' ? 'All Severities' : `${option} Severity`}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <FiChevronDown className="text-gray-500" />
        </div>
      </div>
      
      <div className="relative">
        <select
          className="form-input pr-10 appearance-none"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          aria-label="Sort order"
        >
          <option value="newest">Newest to Oldest</option>
          <option value="oldest">Oldest to Newest</option>
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <FiChevronDown className="text-gray-500" />
        </div>
      </div>
    </motion.div>
  )
}

export default FilterControls