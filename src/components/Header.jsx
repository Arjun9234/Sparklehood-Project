import { motion } from 'framer-motion'
import { FiMoon, FiSun, FiPlus } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'

const Header = ({ onNewIncident }) => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <motion.header 
      className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 15 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="w-10 h-10 rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-md"
              whileHover={{ scale: 1.08, rotate: 8 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white font-extrabold text-lg">AI</span>
            </motion.div>
            <h1 className="text-lg md:text-2xl font-semibold text-gray-800 dark:text-white">
              AI Safety Incident Dashboard
            </h1>
          </motion.div>

          <div className="flex items-center space-x-4">
            <motion.button
              onClick={onNewIncident}
              className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg shadow-md transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <FiPlus className="mr-2" />
              <span className="hidden sm:inline">Report Incident</span>
            </motion.button>

            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-md"
              whileHover={{ scale: 1.15, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.4 }}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <FiSun size={22} /> : <FiMoon size={22} />}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header
