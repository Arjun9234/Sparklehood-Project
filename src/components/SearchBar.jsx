import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSearch, FiCalendar, FiX } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SearchBar = ({ value, onChange, onDateRangeChange }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    onDateRangeChange({ start, end });
  };

  const clearSearch = () => {
    onChange('');
    setStartDate(null);
    setEndDate(null);
    onDateRangeChange({ start: null, end: null });
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search incidents..."
            className="form-input pl-10 pr-10 w-full"
          />
          {value && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              onClick={clearSearch}
            >
              <FiX />
            </motion.button>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 rounded-lg ${
            showDatePicker
              ? 'bg-primary-100 text-primary-600'
              : 'bg-gray-100 text-gray-600'
          }`}
          onClick={() => setShowDatePicker(!showDatePicker)}
        >
          <FiCalendar className="w-5 h-5" />
        </motion.button>
      </div>

      {showDatePicker && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 mt-2 z-50"
        >
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;
