import { useState } from "react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <nav className="bg-bg-nav p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo or Brand Name */}
                <div className="text-2xl font-bold">
                    <a href="#">My Portfolio</a>
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex space-x-4">
                    <a href="#">Home</a>
                    <a href="#">About</a>
                    <a href="#">Projects</a>
                    <a href="#">Contact</a>
                </div>

                {/* Mobile menu button (Hamburger) */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        {/* You can replace this with an SVG icon for a better visual */}
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4`}>
                <div className="flex flex-col space-y-2">
                    <a href="#" className="text-gray-300 hover:text-white block px-4 py-2">Home</a>
                    <a href="#" className="text-gray-300 hover:text-white block px-4 py-2">About</a>
                    <a href="#" className="text-gray-300 hover:text-white block px-4 py-2">Projects</a>
                    <a href="#" className="text-gray-300 hover:text-white block px-4 py-2">Contact</a>
                </div>
            </div>
        </nav>
    )
}