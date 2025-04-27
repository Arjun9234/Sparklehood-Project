import { useState, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import IncidentList from './IncidentList'
import IncidentForm from './IncidentForm'
import FilterControls from './FilterControls'
import LoadingIncident from './LoadingIncident'
import Statistics from './Statistics'
import SearchBar from './SearchBar'
import { mockIncidents } from '../data/mockData'

const ITEMS_PER_PAGE = 6

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
    <div className="w-full bg-gray-100 dark:bg-gray-900 min-h-screen py-8 space-y-10">
      {/* Header Section */}
      <div className="w-full text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-blue-700 dark:text-blue-400 tracking-tight"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          AI Incident Management
        </motion.h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
          Real-time monitoring and reporting system
        </p>
      </div>

      {/* Search and Filters */}
      <div className="w-full flex flex-col md:flex-row justify-center items-center gap-6 px-6">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onDateRangeChange={setDateRange}
        />
        <FilterControls
          selectedSeverity={selectedSeverity}
          setSelectedSeverity={setSelectedSeverity}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>

      {/* Statistics */}
      <div className="w-full px-4">
        <Statistics stats={stats} />
      </div>

      {/* Incident List or Form */}
      <AnimatePresence mode="wait">
        {showNewIncidentForm ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-4xl mx-auto p-8 bg-white dark:bg-gray-800 rounded-xl shadow-2xl"
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
            transition={{ duration: 0.4 }}
            className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4"
          >
            <Suspense fallback={[1, 2, 3].map(i => <LoadingIncident key={i} />)}>
              {currentIncidents.map((incident) => (
                <motion.div
                  key={incident.id}
                  className="p-6 bg-gradient-to-tr from-blue-100 to-blue-50 dark:from-blue-900 dark:to-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
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

      {/* Pagination */}
      {!showNewIncidentForm && totalPages > 1 && (
        <div className="w-full flex justify-center items-center space-x-6 mt-10">
          <button
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full disabled:opacity-50 transition"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full disabled:opacity-50 transition"
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
