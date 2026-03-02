import { MenuIcon, XIcon, Moon, Sun, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../data/NavLinks";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const [openMobileMenu, setOpenMobileMenu] = useState(false);
    const { user, logout } = useAuth(); // Lấy thông tin user từ Context
    
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

                    {/* Logic hiển thị theo trạng thái đăng nhập (Desktop) */}
                    {user ? (
                        <div className="hidden md:flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full cursor-pointer hover:bg-white/10 transition-colors">
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt="Avatar" className="w-7 h-7 rounded-full border border-purple-500 object-cover" />
                                ) : (
                                    <div className="w-7 h-7 rounded-full bg-linear-to-tr from-purple-600 to-fuchsia-600 flex items-center justify-center text-xs font-bold text-white shadow-md">
                                        {user.displayName?.charAt(0).toUpperCase() || "U"}
                                    </div>
                                )}
                                <span className="text-sm font-bold text-white max-w-25 truncate">
                                    {user.displayName?.split(" ")[0] || "User"}
                                </span>
                            </div>
                            <button 
                                onClick={logout}
                                className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all"
                                title="Đăng xuất"
                            >
                                <LogOut size={18} />
                            </button>
                        </div>
                    ) : (
                        <Link 
                            to="/auth/login" 
                            className="hidden md:block px-6 py-2 bg-purple-600 hover:bg-purple-500 transition-all text-white rounded-lg font-semibold text-sm shadow-lg shadow-purple-500/20 text-center"
                        >
                            Login
                        </Link>
                    )}

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
                
                {/* Logic hiển thị theo trạng thái đăng nhập (Mobile) */}
                {user ? (
                    <div className="mt-4 pt-4 border-t border-white/5 flex flex-col gap-4">
                        <div className="flex items-center gap-4 px-4 py-4 bg-white/5 rounded-2xl border border-white/10 shadow-inner">
                            {user.photoURL ? (
                                <img src={user.photoURL} alt="Avatar" className="w-12 h-12 rounded-full border-2 border-purple-500 object-cover" />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-linear-to-tr from-purple-600 to-fuchsia-600 flex items-center justify-center text-xl font-bold text-white shadow-md">
                                    {user.displayName?.charAt(0).toUpperCase() || "U"}
                                </div>
                            )}
                            <div className="flex-1 overflow-hidden">
                                <p className="text-white text-lg font-bold truncate">{user.displayName || "User"}</p>
                                <p className="text-slate-400 text-xs font-medium truncate">{user.email}</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => { logout(); setOpenMobileMenu(false); }}
                            className="w-full py-4 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
                        >
                            <LogOut size={20} /> Đăng xuất
                        </button>
                    </div>
                ) : (
                    <Link 
                        to="/auth/login"
                        onClick={() => setOpenMobileMenu(false)}
                        className="w-full mt-4 py-4 bg-purple-600 text-white rounded-xl font-bold text-center"
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}