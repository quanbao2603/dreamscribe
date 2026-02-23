import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PenTool, 
  Database, 
  Upload, 
  Key, 
  LogOut, 
  ChevronRight,
  User,
  Settings
} from 'lucide-react';

// Import CSS và dữ liệu định tuyến
import "../../layout/main.css";
import "./Editor.css";
import { editorLinks } from "../../data/NavLinks";

// Hàm hỗ trợ nối class
function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export default function Editor() {
  const location = useLocation();
  const navigate = useNavigate();

  // Danh sách Menu dựa trên file NavLinks.js
  const menuItems = [
    { 
        id: 'dashboard', 
        name: 'Tổng quan', 
        href: editorLinks.root, 
        icon: <LayoutDashboard size={18} /> 
    },
    { 
        id: 'new-story', 
        name: 'Viết truyện mới', 
        href: editorLinks.create, 
        icon: <PenTool size={18} /> 
    },
    { 
        id: 'load-saved', 
        name: 'Bản thảo đã lưu', 
        href: editorLinks.load, 
        icon: <Database size={18} /> 
    },
    { 
        id: 'import', 
        name: 'Nhập dữ liệu', 
        href: editorLinks.import, 
        icon: <Upload size={18} /> 
    },
    { 
        id: 'api-key', 
        name: 'Cấu hình AI', 
        href: editorLinks.apikey, 
        icon: <Key size={18} /> 
    },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  // Hàm phụ trợ lấy thông tin tab đang mở
  const itemActive = () => menuItems.find(i => i.href === location.pathname);

  return (
    <div className="editor-layout home-container min-h-screen">
      
      {/* 1. BACKGROUND BLOBS */}
      <div className="background-container">
        <div className="blob blob-purple animate-blob"></div>
        <div className="blob blob-magenta animate-blob animation-delay-2000"></div>
        <div className="blob blob-blue animate-blob animation-delay-4000"></div>
      </div>

      {/* 2. SIDEBAR (THANH CHỨC NĂNG BÊN TRÁI) */}
      <aside className="editor-sidebar">
        <div className="p-8 mb-4">
          <Link to="/" className="text-2xl font-black tracking-tighter text-white">
            DreamScribe<span className="text-purple-500">.</span>
          </Link>
        </div>

        {/* Danh sách Menu chính */}
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.id}
                to={item.href}
                className={cn(
                  "sidebar-item rounded-xl transition-all duration-300",
                  isActive 
                    ? "bg-purple-600/20 text-purple-400 border-r-4 border-purple-500 shadow-inner" 
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                )}
              >
                {item.icon}
                <span className="flex-1 font-medium">{item.name}</span>
                {isActive && <ChevronRight size={14} className="animate-pulse" />}
              </Link>
            );
          })}
        </nav>

        {/* CỤM FOOTER MỚI: Bọc trong container để margin-top trong CSS hoạt động */}
        <div className="sidebar-footer-container">
          <div className="sidebar-footer">
            {/* Box Profile User */}
            <div className="user-profile-box flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center shadow-lg">
                  <User size={18} className="text-white" />
              </div>
              <div className="flex-1 overflow-hidden">
                  <p className="text-xs font-bold text-white truncate text-left">Tác giả AI</p>
                  <p className="text-[10px] text-purple-400 font-semibold uppercase tracking-wider text-left">Premium</p>
              </div>
              <Settings size={14} className="text-slate-500 hover:text-white cursor-pointer" />
            </div>
            
            {/* Nút Đăng xuất */}
            <button 
              onClick={handleLogout}
              className="w-full sidebar-item rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-colors mt-2"
            >
              <LogOut size={18} />
              <span className="font-semibold">Rời khỏi hệ thống</span>
            </button>
          </div>
        </div>

        {/* Hứng khoảng trống thừa xuống đáy */}
        <div className="sidebar-spacer"></div>
      </aside>

      {/* 3. VÙNG NỘI DUNG CHÍNH BÊN PHẢI */}
      <main className="editor-content flex-1 overflow-y-auto">
        
        {/* Thanh tiêu đề động */}
        <header className="flex justify-between items-end mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <div>
            <h2 className="text-[10px] font-bold text-purple-500 uppercase tracking-[0.3em] mb-1">
                Workspace / {itemActive()?.id || "Dashboard"}
            </h2>
            <h1 className="text-3xl font-extrabold text-white">
              {itemActive()?.name || "Bảng điều khiển"}
            </h1>
          </div>
          
          <div className="hidden lg:flex items-center gap-4 pb-1">
             <div className="flex flex-col items-end">
                <span className="text-[10px] text-slate-500 font-bold uppercase">AI Engine</span>
                <span className="text-xs text-green-400 font-bold flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" /> Online
                </span>
             </div>
          </div>
        </header>

        {/* Khung nội dung Glassmorphism */}
        <div className="relative">
           <div className="glass-panel min-h-[calc(100vh-220px)] p-8 rounded-[2.5rem]">
              <Outlet />
           </div>
        </div>
      </main>
    </div>
  );
}