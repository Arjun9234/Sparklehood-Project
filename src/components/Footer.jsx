import { FiGithub, FiHelpCircle } from 'react-icons/fi'

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-700 dark:text-gray-400">
            © {currentYear} AI Safety Incident Dashboard. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-6">
            <a 
              href="mailto:arjunarora3682@gmail.com" 
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
              aria-label="Contact Support"
            >
              <FiHelpCircle size={24} />
            </a>
            <a 
              href="https://github.com/Arjun9234" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-200"
              aria-label="GitHub Repository"
            >
              <FiGithub size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
