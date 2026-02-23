import { MenuIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../data/navLinks";

export default function Navbar() {
    const [openMobileMenu, setOpenMobileMenu] = useState(false);

    useEffect(() => {
        if (openMobileMenu) {
            document.body.classList.add("max-md:overflow-hidden");
        } else {
            document.body.classList.remove("max-md:overflow-hidden");
        }
    }, [openMobileMenu]);

    return (
        <nav className={`flex items-center justify-between fixed z-50 top-0 w-full px-6 md:px-16 lg:px-24 xl:px-32 py-4 ${openMobileMenu ? '' : 'backdrop-blur-md bg-white/70'}`}>
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-purple-600 tracking-tight">
                DreamScribe
            </Link>

            {/* Menu Desktop */}
            <div className="hidden items-center md:gap-8 lg:gap-9 md:flex lg:pl-20">
                {navLinks.map((link) => (
                    <Link key={link.name} to={link.href} className="font-medium hover:text-purple-600 transition-colors">
                        {link.name}
                    </Link>
                ))}
            </div>

            {/* Menu Mobile (Hiển thị khi bấm nút hamburger trên điện thoại) */}
            <div className={`fixed inset-0 flex flex-col items-center justify-center gap-6 text-lg font-medium bg-white/95 backdrop-blur-md md:hidden transition duration-300 ${openMobileMenu ? "translate-x-0" : "-translate-x-full"}`}>
                {navLinks.map((link) => (
                    <Link key={link.name} to={link.href} onClick={() => setOpenMobileMenu(false)}>
                        {link.name}
                    </Link>
                ))}
                <button className="px-6 py-2 border border-purple-600 text-purple-600 rounded-md">
                    Đăng nhập
                </button>
                <button className="aspect-square size-10 p-1 items-center justify-center bg-purple-600 hover:bg-purple-700 transition text-white rounded-md flex" onClick={() => setOpenMobileMenu(false)}>
                    <XIcon />
                </button>
            </div>

            {/* Nút bấm bên phải Desktop */}
            <div className="flex items-center gap-4">
                <button className="hidden md:block hover:bg-purple-50 transition px-4 py-2 border border-purple-600 text-purple-600 rounded-md font-medium">
                    Đăng nhập
                </button>
                <button className="hidden md:block px-4 py-2 bg-purple-600 hover:bg-purple-700 transition text-white rounded-md font-medium">
                    Bắt đầu ngay
                </button>
                <button onClick={() => setOpenMobileMenu(!openMobileMenu)} className="md:hidden text-slate-800">
                    <MenuIcon size={26} className="active:scale-90 transition" />
                </button>
            </div>
        </nav>
    );
}