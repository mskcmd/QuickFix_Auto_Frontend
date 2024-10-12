import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

function LandingPageHeader() {
    return (
        <>
           <header className="bg-gray-100 shadow-md">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-gray-800">QUCIK<span className="text-red-500">FIX</span></h1>
            </motion.div>
            <motion.div
              className="flex items-center space-x-6 rtl:space-x-reverse"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Link to='/login'>
                <button type="button" className="text-white bg-gradient-to-r from-red-700 via-red-800 to-red-950 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">
                  Login
                </button>
              </Link>
              <Link to="/signup">
                <button type="button" className="text-white bg-gradient-to-r from-red-700 via-red-800 to-red-950 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">
                  User Signup
                </button>
              </Link>
              <Link to='/mechanic/signup'>
                <button type="button" className="text-white bg-gradient-to-r from-red-700 via-red-800 to-red-950 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">
                  Mechanic Signup
                </button>
              </Link>
            </motion.div>
          </nav>
        </div>
      </header>
        </>
    )
}

export default LandingPageHeader