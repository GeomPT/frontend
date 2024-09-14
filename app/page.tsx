'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Demo from '@/components/ui/demo'

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
            <h1 className="bg-blue-600 text-white text-lg font-bold py-2 px-4 rounded-lg cursor-pointer hover:bg-blue-700 transition duration-300">
              progress
            </h1>
          </Link>
          <Link href="/plan" passHref>
            <h1 className="bg-purple-600 text-white text-lg font-bold py-2 px-4 rounded-lg ml-4 cursor-pointer hover:bg-purple-700 transition duration-300">
              start session
            </h1>
          </Link>
          <Link href="/tutorial" passHref>
            <h1 className="bg-pink-600 text-white text-lg font-bold py-2 px-4 rounded-lg ml-4 cursor-pointer hover:bg-pink-700 transition duration-300">
              tutorials
            </h1>
          </Link>
        </div>
      </header>
      <div className="h-0.5 bg-gradient-to-r from-blue-300 to-purple-300" />

      <main className="container mx-auto px-4 py-16 text-center relative z-10">
        <h2 className="text-5xl md:text-5xl font-extrabold text-blue-900 mb-8 leading-tight">
          Enhancing Your Physical Therapy with AI
        </h2>
        <p className="text-xl md:text-2xl text-blue-800 mb-12 max-w-3xl mx-auto">
          Experience the future of rehabilitation with our AI-powered physical
          therapy solutions. Personalized, precise, and always by your side.
        </p>
        <Link href="/plan">
          <button className="bg-blue-600 text-white text-lg font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300">
            Get Started
          </button>
        </Link>

        <div className="mt-8 flex justify-center">
          <div className="relative w-[200px] h-[200px]">
            {" "}
            {/* Fixed size for image container */}
            <AnimatePresence>
              {images.map((src, index) => (
                <motion.div
                  key={index}
                  className={`absolute inset-0 ${
                    index === activeImageIndex ? "block" : "hidden"
                  }`}
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

      <Demo></Demo>

      <footer className="bg-blue-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 GeomPT. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}