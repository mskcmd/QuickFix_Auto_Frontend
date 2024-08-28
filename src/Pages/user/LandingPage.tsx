import { motion } from 'framer-motion'
import Footer from '../../Components/User/Footer'
import LandingPageHeader from '../../Components/User/landingPage/LandingPageHeader'
import backgroundImage from '../../../public/Designer.png'; // Import the background image file

const LandingPage = () => {
  
    
    return (
        <>
        <LandingPageHeader/>
     
        <div className="outerdiv bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
                <div className="flex flex-col justify-center items-start md:min-h-screen sm:h-screen bg-black bg-opacity-50">
                    <div className="w-lg ms-5 p-5 mt-5 sm:p-0 sm:mt-0 sm:px-2">
                        <motion.h1 className='text-4xl title text-white' animate={{ fontSize: 50, y: -10 }}>LUXURY AUTO</motion.h1>
                        <motion.h1 className='text-4xl title text-white' animate={{ fontSize: 50, y: -10 }}> REPAIR <span className='text-red-500'>SERVICE</span></motion.h1>
                        <p className='text-gray-200'>Providing top-notch auto repair services for luxury vehicles.<br /> Skilled mechanics and state-of-the-art facilities.</p>
                        <div className="bg-white rounded-lg shadow-lg py-5 sm:p-6 mt-5 mb-8">
                            <form className="flex flex-col sm:flex-row items-center">
                                <div className="flex-grow mb-4 sm:mb-0 sm:mr-2 relative">
                                    <input type="text" id="serviceType" name="serviceType" placeholder="Car Name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500 pl-10" />
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                            <polyline points="9 22 9 12 15 12 15 22" />
                                        </svg>
                                    </span>
                                </div>
                                <div className="flex-grow mb-4 sm:mb-0 sm:ml-2 relative">
                                    <input type="text" name="location" placeholder="Location" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-red-500 pl-10" />
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                        <svg className="h-5 w-5 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                    </span>
                                </div>
                                <button type="button" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition duration-300 ml-0 sm:ml-2">Serch</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        
        </>
    )
}

export default LandingPage