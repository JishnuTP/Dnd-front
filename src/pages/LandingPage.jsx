import React from 'react';
import { motion } from 'framer-motion';
// import { Fade } from 'react-reveal';
import Header from '../component/Header';
import Footer from '../component/Footer';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
     <Header/>

    
      <section className="relative bg-gradient-to-r from-blue-500 to-green-500 text-white py-20 text-center">
        <motion.h1
          className="text-5xl font-bold"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Welcome to <span className="text-yellow-300">Machine Task</span>
        </motion.h1>
        <p className="mt-4 text-lg">The ultimate platform for managing tasks and sharing content effortlessly.</p>
        <div className="mt-8 space-x-4">
            <Link
            to="/tasks">
            <button className="px-6 py-3 bg-white text-blue-500 rounded-lg shadow-lg hover:bg-gray-200">Get Started</button>

            </Link>

            <Link
            to="#features">
            <button className="px-6 py-3 bg-yellow-400 text-white rounded-lg shadow-lg hover:bg-yellow-500">Learn More</button>

            </Link>
        </div>
      </section>


      <section id="features" className="py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Features</h2>
          <p className="text-gray-600 mt-2">Everything you need to stay productive and connected.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-20">
       
          {[
            { title: "Authentication", desc: "Secure login and registration with JWT.", icon: "🔒" },
            { title: "Task Management", desc: "Organize, track, and complete your tasks.", icon: "✅" },
            { title: "User Feed", desc: "Share updates and interact with others.", icon: "🌟" }
          ].map((feature, idx) => (
            < div key={idx} bottom>
              <div className="bg-white rounded-lg p-6 shadow-lg text-center">
                <div className="text-4xl">{feature.icon}</div>
                <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

<Footer/>
  
    </div>
  );
}
