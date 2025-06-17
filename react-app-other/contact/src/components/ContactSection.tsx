import React from "react";
import { motion } from "framer-motion";
// import Business from "@/assets/businessman.png"; 

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const ContactUI: React.FC = () => {
  return (
    <div className="bg-white flex flex-col items-center justify-center py-3 font-sans">
      <motion.div
        className="max-w-6xl w-full flex flex-col md:flex-row gap-10"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        {/* Left Section */}
        <div className="md:w-1/2 space-y-6">
          <motion.h1
            className="text-4xl font-bold text-gray-900"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Reach Out & <br />Let's Create Together
          </motion.h1>
          <motion.p
            className="text-gray-600"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Have questions or need IT solutions? <br />
            Contact us to explore how we can support your business.
          </motion.p>
          <div className="space-y-4">
            {/* Contact */}
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="bg-gradient-to-tr from-blue-500 to-blue-700 p-3 rounded-lg text-white shadow-lg transition-transform duration-300 hover:scale-110">
                {/* Phone Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              </div>
              <p className="text-gray-800">12345678910</p>
            </motion.div>
            {/* Email */}
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              <div className="bg-gradient-to-tr from-blue-500 to-blue-700 p-3 rounded-lg text-white shadow-lg transition-transform duration-300 hover:scale-110">
                {/* Email Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
                </svg>
              </div>
              <p className="text-gray-800">info@certa.co.id</p>
            </motion.div>
            {/* Location */}
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <div className="bg-gradient-to-tr from-blue-500 to-blue-700 p-3 rounded-lg text-white shadow-lg transition-transform duration-300 hover:scale-110">
                {/* Location Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2c3.866 0 7 3.134 7 7 0 3.866-3.134 9-7 13-3.866-4-7-9.134-7-13 0-3.866 3.134-7 7-7zM12 10a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </div>
              <p className="text-gray-800">
                Jakarta, Talavera Office Park, 28th Floor, <br />
                Jl. T.B. Simatupang Kav.22-26, Jakarta 1243
              </p>
            </motion.div>
          </div>
        </div>
        {/* Right Section (Image + Floating Icons) */}
        <motion.div
          className="md:w-1/2 relative"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <img src={"http://10.63.22.84:4100/mfe/contact/businessman.png"} className="w-full rounded-xl shadow-lg" alt="Business" />
          <motion.div
            className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white shadow-lg px-4 py-2 rounded-lg"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <p className="text-gray-800 font-medium">Linux</p>
          </motion.div>
          <motion.div
            className="absolute bottom-10 left-10 bg-white shadow-lg px-4 py-2 rounded-lg"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-gray-800 font-medium">Data</p>
          </motion.div>
          <motion.div
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white shadow-lg px-4 py-2 rounded-lg"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
          >
            <p className="text-gray-800 font-medium">Infrastructure</p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Contact Form */}
      <motion.div
        className="max-w-6xl w-full mx-auto mt-12"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-left">
          Interested in our <span className="underline text-blue-600">Infrastructure Services</span> or need advice? Then please get in touch and we'll be glad to help.
        </h2>
        <div className="text-lg font-medium text-gray-700 mt-3">Contact Form</div>
        <p className="text-gray-500 mb-6">Get in touch and let us know how we can help.</p>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Your Name"
            className="p-2 border rounded-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500 transition-shadow duration-200"
            disabled
          />
          <input
            type="email"
            placeholder="E-Mail Address"
            className="p-2 border rounded-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500 transition-shadow duration-200"
            disabled
          />
          <input
            type="text"
            placeholder="Phone Number"
            className="p-2 border rounded-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500 transition-shadow duration-200"
            disabled
          />
          <input
            type="text"
            placeholder="Your Company"
            className="p-2 border rounded-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500 transition-shadow duration-200"
            disabled
          />
          <textarea
            placeholder="Your Message"
            rows={3}
            className="p-2 border rounded-md w-full focus:outline-none focus:ring-1 focus:ring-blue-500 md:col-span-2 transition-shadow duration-200"
            disabled
          />
          <button
            type="button"
            className="bg-gradient-to-tr from-blue-500 to-blue-700 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition md:col-span-2 opacity-60 cursor-not-allowed"
            disabled
          >
            Submit
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactUI;
