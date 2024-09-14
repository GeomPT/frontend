'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link' // Import Link
import { Play } from 'lucide-react';

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
        {/* Centered button container */}
        <div className="flex justify-center items-center space-x-4">
          <Link href="/page2"> 
            <button
              className="bg-blue-600 text-white text-lg font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300"
            >
              Get Started
            </button>
          </Link>
          <Link href="/demo"> 
            <button
              className="bg-teal-600 text-white text-lg font-semibold py-3 px-8 rounded-full hover:bg-teal-700 transition duration-300 flex items-center"
            >
              <Play className="mr-2" /> {/* Play icon */}
              Try a Demo
            </button>
          </Link>
        </div>

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

      {/* Footer section for copyright */}
      <footer className="bg-gray-800 text-white text-center py-4 shadow-md">
        <p className="text-sm">© {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      </footer>

     
      
    </div>

    
  )
}