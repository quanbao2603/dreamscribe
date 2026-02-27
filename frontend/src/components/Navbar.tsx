import { MenuIcon, XIcon, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../data/NavLinks";

export default function Navbar() {
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) return savedTheme === 'dark';
            return window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        return false;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDarkMode) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    useEffect(() => {
        if (openMobileMenu) {
            document.body.classList.add("max-md:overflow-hidden");
        } else {
            document.body.classList.remove("max-md:overflow-hidden");
        }
    }, [openMobileMenu]);

    return (
        <nav className={`fixed z-100 top-0 w-full px-6 md:px-16 lg:px-24 py-5 transition-all duration-300 border-b ${
            openMobileMenu 
            ? 'bg-[#080313] border-transparent' 
            : 'bg-transparent backdrop-blur-md border-white/5'
        }`}>
            <div className="flex items-center justify-between mx-auto max-w-7xl">
                
                <Link to="/" className="relative z-50 text-2xl font-extrabold tracking-tighter text-white">
                    DreamScribe
                </Link>

                <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
                    {navLinks.map((link) => (
                        <Link 
                            key={link.name} 
                            to={link.href} 
                            className="text-sm font-medium text-slate-300 hover:text-purple-400 transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-3 md:gap-5 relative z-50">
                    <button 
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="p-2 rounded-full text-slate-400 hover:bg-white/5 transition-colors"
                        aria-label="Toggle Dark Mode"
                    >
                        {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <Link 
                        to="/auth/login" 
                        className="hidden md:block px-6 py-2 bg-purple-600 hover:bg-purple-500 transition-all text-white rounded-lg font-semibold text-sm shadow-lg shadow-purple-500/20 text-center"
                    >
                        Login
                    </Link>

                    <button 
                        onClick={() => setOpenMobileMenu(!openMobileMenu)} 
                        className="md:hidden p-1 text-white"
                    >
                        {openMobileMenu ? <XIcon size={26} /> : <MenuIcon size={26} />}
                    </button>
                </div>
            </div>

            {/* Menu Mobile */}
            <div className={`fixed inset-0 top-18.25 h-screen flex flex-col px-6 py-10 gap-8 text-xl font-semibold bg-[#080313]/95 backdrop-blur-xl md:hidden transition-transform duration-500 ease-in-out ${openMobileMenu ? "translate-x-0" : "translate-x-full"}`}>
                {navLinks.map((link) => (
                    <Link 
                        key={link.name} 
                        to={link.href} 
                        onClick={() => setOpenMobileMenu(false)}
                        className="text-slate-200 hover:text-purple-400 border-b border-white/5 pb-4"
                    >
                        {link.name}
                    </Link>
                ))}
                
                <Link 
                    to="/auth/login"
                    onClick={() => setOpenMobileMenu(false)}
                    className="w-full mt-4 py-4 bg-purple-600 text-white rounded-xl font-bold text-center"
                >
                    Login
                </Link>
            </div>
        </nav>
    );
}