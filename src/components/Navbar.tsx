import { useState } from "react";
import { Link } from "react-router-dom";
import {ThemeToggleButton} from "./ThemeToggleButton.tsx";


export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <nav>
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Link to="/" className="text-2xl  hover:no-underline hover:text-accent-hover">
                        <span className="text-secondary hover:text-accent-hover">
                            bernardovc
                        </span>_
                    </Link>
                    <div>
                        <ThemeToggleButton />
                    </div>
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex space-x-4">
                    <Link to="/">Home</Link>
                    <Link to="/resume">Resume</Link>
                    {/*<Link to="/contact">Contact</Link>*/}
                </div>

                {/* Mobile menu button (Hamburger) */}
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6
                                     h16
                                     M4 12
                                     h16
                                     m-7 6
                                     h7"
                            >
                            </path>
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} mt-4`}>
                <div className="flex flex-col space-y-2">
                    <Link to="/" className="block px-4 py-2" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="/resume" className="block px-4 py-2" onClick={() => setIsMenuOpen(false)}>Resume</Link>
                    {/*<Link to="/contact" className="block px-4 py-2" onClick={() => setIsMenuOpen(false)}>Contact</Link>*/}
                </div>
            </div>
        </nav>
    )
}