import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import { FiChevronDown, FiChevronUp, FiAlertCircle, FiAlertTriangle, FiInfo } from 'react-icons/fi'

const IncidentList = ({ incidents, selectedIncidentId, onToggleDetails }) => {
  if (incidents.length === 0) {
    return (
      <motion.div 
        className="card p-8 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <FiInfo className="w-16 h-16 mx-auto text-gray-400" />
        </motion.div>
        <h3 className="mt-4 text-xl font-medium text-gradient">No incidents found</h3>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Try changing your filters or create a new incident.</p>
      </motion.div>
    )
  }

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'High':
        return <FiAlertCircle className="text-error-600 dark:text-error-400 w-6 h-6" />;
      case 'Medium':
        return <FiAlertTriangle className="text-warning-600 dark:text-warning-400 w-6 h-6" />;
      case 'Low':
        return <FiInfo className="text-success-600 dark:text-success-400 w-6 h-6" />;
      default:
        return <FiInfo className="text-gray-500 w-6 h-6" />;
    }
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      className="space-y-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <AnimatePresence mode="popLayout">
        {incidents.map((incident) => (
          <motion.div 
            key={incident.id}
            className="card overflow-hidden"
            variants={item}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
          >
            <div 
              className="p-6 flex items-center justify-between cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
              onClick={() => onToggleDetails(incident.id)}
            >
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {getSeverityIcon(incident.severity)}
                </motion.div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{incident.title}</h3>
                  <div className="flex items-center mt-2 space-x-3">
                    <span className={`severity-badge severity-${incident.severity.toLowerCase()}`}>
                      {incident.severity}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {format(new Date(incident.reported_at), 'MMM d, yyyy')}
                    </span>
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ rotate: selectedIncidentId === incident.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FiChevronDown className="text-gray-500 w-5 h-5" />
              </motion.div>
            </div>
            
            <AnimatePresence>
              {selectedIncidentId === incident.id && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="border-t border-gray-200 dark:border-gray-700"
                >
                  <div className="p-6">
                    <div className="prose dark:prose-invert max-w-none">
                      <h4 className="text-lg font-medium mb-3 text-gradient">Description</h4>
                      <p className="text-gray-700 dark:text-gray-300">
                        {incident.description}
                      </p>
                      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="font-medium">Reported:</span> {format(new Date(incident.reported_at), 'MMM d, yyyy, h:mm a')}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          <span className="font-medium">Incident ID:</span> {incident.id}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

export default IncidentList