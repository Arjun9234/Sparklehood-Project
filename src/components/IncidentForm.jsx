import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiX, FiSave } from 'react-icons/fi'
import confetti from 'canvas-confetti'

const IncidentForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'Medium'
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const triggerConfetti = () => {
    const count = 200
    const defaults = {
      origin: { y: 0.7 }
    }

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      })
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    })

    fire(0.2, {
      spread: 60,
    })

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    })

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    })

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (validateForm()) {
      setIsSubmitting(true)
      try {
        await onSubmit(formData)
        triggerConfetti()
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative"
    >
      <div className="flex justify-between items-center mb-4">
        <motion.h3 
          className="text-xl font-semibold text-gradient"
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          Report New Incident
        </motion.h3>
        <motion.button
          type="button"
          onClick={onCancel}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Close form"
        >
          <FiX size={20} />
        </motion.button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Title <span className="text-error-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`form-input ${errors.title ? 'border-error-500 focus:ring-error-500' : ''}`}
            placeholder="Brief title of the incident"
          />
          {errors.title && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-error-500"
            >
              {errors.title}
            </motion.p>
          )}
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description <span className="text-error-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`form-input min-h-[120px] ${errors.description ? 'border-error-500 focus:ring-error-500' : ''}`}
            placeholder="Detailed description of what happened"
          />
          {errors.description && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-sm text-error-500"
            >
              {errors.description}
            </motion.p>
          )}
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Severity
          </label>
          <div className="flex space-x-6">
            {['Low', 'Medium', 'High'].map((level) => (
              <motion.div 
                key={level} 
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <input
                  type="radio"
                  id={`severity-${level.toLowerCase()}`}
                  name="severity"
                  value={level}
                  checked={formData.severity === level}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                />
                <label 
                  htmlFor={`severity-${level.toLowerCase()}`} 
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  {level}
                </label>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div 
          className="flex justify-end space-x-3 pt-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            type="button"
            onClick={onCancel}
            className="btn btn-outline"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            Cancel
          </motion.button>
          <motion.button
            type="submit"
            className="btn btn-primary flex items-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
          >
            <FiSave className="mr-2" />
            {isSubmitting ? (
              <span className="flex items-center">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="mr-2"
                >
                  ⚡
                </motion.span>
                Submitting...
              </span>
            ) : (
              'Submit'
            )}
          </motion.button>
        </motion.div>
      </form>
    </motion.div>
  )
}

export default IncidentForm