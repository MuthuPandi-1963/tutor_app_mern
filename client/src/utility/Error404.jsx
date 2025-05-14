import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaRocket, FaRegSadTear } from 'react-icons/fa';

const Error404 = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 text-white flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="mb-8"
        >
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-white opacity-10 rounded-full blur-lg" />
            <div className="text-9xl font-bold relative z-10">
              4
              <motion.span
                animate={{ y: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="inline-block text-yellow-400"
              >
                0
              </motion.span>
              4
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <FaRegSadTear className="text-yellow-400" />
            Oops! Lost in Space?
            <FaRegSadTear className="text-yellow-400" />
          </h1>
          <p className="text-xl text-blue-200">
            The page you're looking for seems to have blasted off into another galaxy.
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block"
        >
          <Link
            to="/"
            className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-full text-lg font-bold 
            hover:bg-yellow-300 transition-all flex items-center gap-3 group"
          >
            <motion.div
              animate={{ x: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <FaRocket className="text-xl" />
            </motion.div>
            <span className="group-hover:underline">Beam Me Home</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <div className="inline-block p-4 bg-white/10 rounded-lg">
            <p className="text-blue-200">
              Still lost? Try these coordinates:
              <br />
              <button 
                onClick={() => window.history.back()}
                className="text-yellow-400 hover:underline mt-2"
              >
                Previous Page
              </button>
              {' '}•{' '}
              <Link to="/contact" className="text-yellow-400 hover:underline">
                Contact Support
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Error404;