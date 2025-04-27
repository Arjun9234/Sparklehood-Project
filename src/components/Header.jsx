import { motion } from 'framer-motion'
import { FiMoon, FiSun, FiPlus } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'

const Header = ({ onNewIncident }) => {
  const { isDarkMode, toggleTheme } = useTheme()

  return (
    <motion.header 
      className="sticky top-0 z-10 glassmorphism"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-white font-bold text-xl">AI</span>
            </motion.div>
            <h1 className="text-xl md:text-2xl font-bold">
              AI Safety Incident Dashboard
            </h1>
          </motion.div>

          <div className="flex items-center space-x-4">
            <motion.button
              onClick={onNewIncident}
              className="btn btn-primary flex items-center"
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
              className="p-2 rounded-full glassmorphism text-gray-800 dark:text-gray-200 shadow-lg"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header