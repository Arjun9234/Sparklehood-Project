import { useState, Suspense, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import IncidentList from './IncidentList'
import IncidentForm from './IncidentForm'
import FilterControls from './FilterControls'
import LoadingIncident from './LoadingIncident'
import Statistics from './Statistics'
import SearchBar from './SearchBar'
import { mockIncidents } from '../data/mockData'

const ITEMS_PER_PAGE = 5

const Dashboard = ({ showNewIncidentForm, onCloseForm }) => {
  const [incidents, setIncidents] = useState(mockIncidents)
  const [selectedSeverity, setSelectedSeverity] = useState('All')
  const [sortOrder, setSortOrder] = useState('newest')
  const [selectedIncidentId, setSelectedIncidentId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [dateRange, setDateRange] = useState({ start: null, end: null })
  const [currentPage, setCurrentPage] = useState(1)

  const filteredIncidents = incidents.filter(incident => {
    const matchesSeverity = selectedSeverity === 'All' || incident.severity === selectedSeverity
    const matchesSearch = searchQuery === '' || 
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDate = !dateRange.start || !dateRange.end || 
      (new Date(incident.reported_at) >= dateRange.start && 
       new Date(incident.reported_at) <= dateRange.end)
    
    return matchesSeverity && matchesSearch && matchesDate
  })

  const sortedIncidents = [...filteredIncidents].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.reported_at) - new Date(a.reported_at)
    }
    return new Date(a.reported_at) - new Date(b.reported_at)
  })

  const totalPages = Math.ceil(sortedIncidents.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentIncidents = sortedIncidents.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleAddIncident = async (newIncident) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const incidentWithId = {
        ...newIncident,
        id: (incidents.length + 1).toString(),
        reported_at: new Date().toISOString()
      }
      setIncidents([...incidents, incidentWithId])
      onCloseForm()
    } finally {
      setIsLoading(false)
    }
  }

  const toggleIncidentDetails = (id) => {
    setSelectedIncidentId(selectedIncidentId === id ? null : id)
  }

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage)
    }
  }

  const stats = {
    total: incidents.length,
    high: incidents.filter(i => i.severity === 'High').length,
    medium: incidents.filter(i => i.severity === 'Medium').length,
    low: incidents.filter(i => i.severity === 'Low').length,
    recentIncidents: incidents.filter(i => 
      new Date(i.reported_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    ).length
  }

  return (
    <div className="space-y-6">
     
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold text-gradient">
            AI Safety Incidents
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Monitor and manage AI safety incidents
          </p>
        </motion.div>

        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
            onDateRangeChange={setDateRange}
          />
        </motion.div>
      </motion.div>

     
      <Statistics stats={stats} />

      
      <FilterControls 
        selectedSeverity={selectedSeverity}
        setSelectedSeverity={setSelectedSeverity}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      
      <AnimatePresence mode="wait">
        {showNewIncidentForm ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="card p-6 shadow-lg rounded-lg bg-white dark:bg-gray-800"
          >
            <IncidentForm 
              onSubmit={handleAddIncident} 
              onCancel={onCloseForm}
            />
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <Suspense fallback={[1,2,3].map(i => <LoadingIncident key={i} />)}>
              {currentIncidents.map((incident) => (
                <motion.div
                  key={incident.id}
                  className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <IncidentList 
                    incidents={[incident]} 
                    selectedIncidentId={selectedIncidentId}
                    onToggleDetails={toggleIncidentDetails}
                    isLoading={isLoading}
                  />
                </motion.div>
              ))}
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

     
      {!showNewIncidentForm && totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 mt-6">
          <button 
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            Page {currentPage} of {totalPages}
          </span>
          <button 
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded disabled:opacity-50"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default Dashboard
