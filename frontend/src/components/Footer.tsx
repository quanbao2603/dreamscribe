import { Link } from "react-router-dom";
import { navLinks } from "../data/NavLinks";

export default function Footer() {
    return (
        /* Giải pháp: 
           1. Loại bỏ bg-white và bg-[#0B0A10]
           2. Thêm bg-transparent để nhìn xuyên thấu
           3. Thêm backdrop-blur để tạo hiệu ứng kính mờ (nếu muốn)
        */
        <footer className="relative z-10 w-full px-6 md:px-16 lg:px-24 py-16 bg-transparent transition-colors duration-300">
            
            {/* Đường kẻ ngăn cách mờ ảo phía trên footer */}
            <div className="max-w-7xl mx-auto border-t border-white/5 mb-12"></div>

            <div className="flex flex-col md:flex-row justify-between w-full gap-10 max-w-7xl mx-auto">
                
                {/* Khu vực 1: Logo và Mô tả ngắn */}
                <div className="md:max-w-sm">
                    <Link to="/" className="text-2xl font-extrabold tracking-tighter text-white">
                        DreamScribe
                    </Link>
                    <p className="mt-4 text-slate-400 text-sm leading-relaxed">
                        Nền tảng sáng tác truyện thông minh với sự hỗ trợ của AI. Nơi trí tưởng tượng của bạn trở thành những câu chuyện tuyệt vời.
                    </p>
                </div>

                {/* Khu vực 2: Các Menu Liên kết */}
                <div className="flex flex-col sm:flex-row gap-10 md:gap-24">
                    
                    {/* Cột 1: Điều hướng */}
                    <div>
                        <h2 className="font-semibold text-slate-200 mb-6 uppercase text-xs tracking-widest">Liên kết</h2>
                        <ul className="space-y-4">
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <Link to={link.href} className="text-sm text-slate-400 hover:text-purple-400 transition-all duration-200">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Cột 2: Thông tin liên hệ */}
                    <div>
                        <h2 className="font-semibold text-slate-200 mb-6 uppercase text-xs tracking-widest">Liên hệ</h2>
                        <ul className="space-y-4">
                            <li>
                                <a href="https://www.facebook.com/SUGirl.Bae.2201" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-purple-400 transition-all">
                                    Sakai Yuu
                                </a>
                            </li>
                            <li>
                                <a href="https://www.facebook.com/jake.nguyen.3762" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-400 hover:text-purple-400 transition-all">
                                    WOMCloud
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Khu vực 3: Bản quyền (Copyright) */}
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs text-slate-500">
                    © 2026 DreamScribe. Crafted with passion for storytellers.
                </p>
                <div className="flex gap-6">
                    <span className="text-xs text-slate-600 hover:text-slate-400 cursor-pointer transition-colors">Privacy Policy</span>
                    <span className="text-xs text-slate-600 hover:text-slate-400 cursor-pointer transition-colors">Terms of Service</span>
                </div>
            </div>
        </footer>
    );
}