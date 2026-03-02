import { useLocation, Link } from "react-router-dom";
import { Mail, ShieldCheck, User } from "lucide-react";
import "../../layout/main.css"; 

export default function EmailAuthSuccess() {
  const location = useLocation();
  const userData = location.state?.user;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center pt-32 pb-16 px-4 overflow-hidden">
      
      {/* Background blobs - Đổi sang tone Xanh/Cyan để phân biệt với Google */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative z-10 w-full max-w-3xl bg-[#080313]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
        
        {/* Icon Header */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
            <ShieldCheck size={32} className="text-blue-400" />
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400 mb-8 text-center">
          Đăng nhập Email Thành Công! 🎉
        </h2>

        {userData ? (
          <div className="space-y-6">
            {/* Thẻ hiển thị thông tin cơ bản */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 bg-white/5 p-6 rounded-2xl border border-white/10 text-center sm:text-left">
              <div className="w-20 h-20 shrink-0 rounded-full bg-slate-800 border-2 border-blue-500 flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-blue-500/50">
                {userData.displayName ? userData.displayName.charAt(0).toUpperCase() : <User size={32} />}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white">
                  {userData.displayName || "User ẩn danh"}
                </h3>
                <p className="text-slate-400 mt-1 flex items-center justify-center sm:justify-start gap-2">
                  <Mail size={16} /> {userData.email}
                </p>
                <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-2">
                  <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-400 text-[11px] font-bold uppercase tracking-wider rounded-full">
                    ID: {userData.id.substring(0, 8)}...
                  </span>
                  <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[11px] font-bold uppercase tracking-wider rounded-full">
                    Provider: {userData.provider || "password"}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Khung hiển thị mã JSON trả về từ Database */}
            <div className="bg-[#0d0714] p-6 rounded-2xl border border-white/10 shadow-inner overflow-x-auto relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-500 to-cyan-500 opacity-50"></div>
              <p className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-widest">Dữ liệu từ Supabase (Prisma):</p>
              <pre className="text-emerald-400 text-sm font-mono leading-relaxed">
                {JSON.stringify(userData, null, 2)}
              </pre>
            </div>

            <div className="flex justify-center pt-6 gap-4">
              <Link to="/" className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl font-bold transition-all backdrop-blur-sm">
                Về Trang Chủ
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg mb-8">Oops! Không tìm thấy dữ liệu đăng nhập. Hãy thử đăng nhập lại nhé.</p>
            <Link to="/auth/login" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-500/25 transition-all">
              Quay lại trang Đăng nhập
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}