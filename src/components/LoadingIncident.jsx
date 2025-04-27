import { motion } from 'framer-motion'

const LoadingIncident = () => {
  return (
    <div className="card p-6">
      <div className="flex items-center space-x-4">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700"
        />
        <div className="flex-1 space-y-3">
          <motion.div 
            className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <div className="flex space-x-3">
            <motion.div 
              className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div 
              className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingIncident