import { useState } from 'react'
import { motion } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Footer from './components/Footer'

function App() {
  const [showNewIncidentForm, setShowNewIncidentForm] = useState(false)

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Header 
          onNewIncident={() => setShowNewIncidentForm(true)} 
        />
        <motion.main 
          className="flex-grow container mx-auto px-4 py-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Dashboard 
            showNewIncidentForm={showNewIncidentForm}
            onCloseForm={() => setShowNewIncidentForm(false)}
          />
        </motion.main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App