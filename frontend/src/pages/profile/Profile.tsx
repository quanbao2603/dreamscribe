import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Mail, Shield, Key, LogOut, Fingerprint } from "lucide-react";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Bảo vệ route: Nếu chưa đăng nhập thì tự động chuyển hướng về trang Login
  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center pt-32 pb-16 px-4 overflow-hidden">
      
      {/* Background blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl bg-[#080313]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
        <div className="flex flex-col items-center mb-8 relative">
          {/* Avatar lớn */}
          <div className="relative mb-4">
            {user.photoURL ? (
              <img 
                src={user.photoURL} 
                alt="Avatar" 
                className="w-28 h-28 rounded-full border-4 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.4)] object-cover" 
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-linear-to-tr from-purple-600 to-fuchsia-600 flex items-center justify-center text-5xl font-extrabold text-white shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                {user.displayName?.charAt(0).toUpperCase() || "U"}
              </div>
            )}
            <div className="absolute bottom-0 right-0 p-2 bg-green-500 rounded-full border-4 border-[#080313] title='Online'"></div>
          </div>
          
          <h2 className="text-3xl font-extrabold text-white mb-1">{user.displayName || "Người dùng ẩn danh"}</h2>
          <p className="text-slate-400 text-sm flex items-center gap-2">
            <Mail size={14} /> {user.email}
          </p>
        </div>

        {/* Bảng thông tin chi tiết */}
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:bg-white/10 transition-colors">
            <div className="p-3 bg-purple-500/20 text-purple-400 rounded-xl">
              <Fingerprint size={24} />
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">ID Tài Khoản</p>
              <p className="text-white font-mono text-sm">{user.id}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:bg-white/10 transition-colors">
              <div className="p-3 bg-blue-500/20 text-blue-400 rounded-xl">
                <Shield size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Vai trò (Role)</p>
                <p className="text-white font-semibold capitalize">{user.role}</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4 hover:bg-white/10 transition-colors">
              <div className="p-3 bg-fuchsia-500/20 text-fuchsia-400 rounded-xl">
                <Key size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Phương thức</p>
                <div className="flex items-center gap-2">
                  <span className="text-white font-semibold capitalize">{user.provider}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nút Đăng xuất */}
        <div className="mt-10 flex justify-center border-t border-white/10 pt-8">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-8 py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 rounded-xl font-bold transition-all"
          >
            <LogOut size={20} />
            Đăng xuất khỏi hệ thống
          </button>
        </div>
      </div>
    </div>
  );
}