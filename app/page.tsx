'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link' // Import Link
import { Menu, Play, User } from 'lucide-react';

const images = [
  '/images/placeholder2.png',
  '/images/placeholder3.png',
  '/images/placeholder4.png',
]

export default function LandingPage() {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImageIndex(prevIndex => (prevIndex + 1) % images.length)
    }, 3000) // Change image every 3 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-800">GeomPT</h1>
        <div className="flex-grow flex justify-end">
          <Link href="/progress" passHref>
            <h1 className="bg-blue-600 text-white text-lg font-bold py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-700 transition duration-300">progress</h1>
          </Link>
          <Link href="/page2" passHref>
            <h1 className="bg-purple-600 text-white text-lg font-bold py-2 px-4 rounded-lg ml-4 cursor-pointer hover:bg-purple-700 transition duration-300">start session</h1>
          </Link>
          <Link href="/tutorial" passHref>
            <h1 className="bg-pink-600 text-white text-lg font-bold py-2 px-4 rounded-lg ml-4 cursor-pointer hover:bg-pink-700 transition duration-300">tutorials</h1>
          </Link>
        </div>
      </header>
      <div className="h-0.5 bg-gradient-to-r from-blue-300 to-purple-300" />
      

      <main className="container mx-auto px-4 py-16 text-center relative z-10">
        <h2 className="text-5xl md:text-5xl font-extrabold text-blue-900 mb-8 leading-tight">
          Enhancing Your Physical Therapy with AI
        </h2>
        <p className="text-xl md:text-2xl text-blue-800 mb-12 max-w-3xl mx-auto">
          Experience the future of rehabilitation with our AI-powered physical therapy solutions.
          Personalized, precise, and always by your side.
        </p>
        <Link href="/page2"> 
          <button
            className="bg-blue-600 text-white text-lg font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </button>
        </Link>

        {/* Display images below the button */}
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-4">
            <AnimatePresence>
              {images.map((src, index) => (
                <motion.div
                  key={index}
                  className={`flex-shrink-0 ${index === activeImageIndex ? 'block' : 'hidden'}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image 
                    src={src} 
                    alt={`Image ${index + 1}`} 
                    width={200} 
                    height={200} 
                    className="rounded-lg shadow-lg" 
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent pointer-events-none"></div>
      <section className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8">
              <h3 className="text-2xl font-bold text-blue-800 mb-4">Live Demo</h3>
              <p className="text-gray-600 mb-4">See our AI-powered joint tracking in action. Start your camera to begin.</p>
              <button className="flex items-center bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
                <Play size={20} className="mr-2" /> Start Demo
              </button>
            </div>
            <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-8">
              <div className="w-64 h-64 bg-gray-300 rounded-lg flex items-center justify-center">
                <User size={64} className="text-gray-400" />
              </div>
            </div>
          </div>
        </section>
      

      <footer className="bg-blue-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 GeomPT. All rights reserved.</p>
        </div>
      </footer>
      
    </div>

    
  )
}