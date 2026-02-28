import { useLocation, Link } from "react-router-dom";
import "../../layout/main.css"; // Giữ nguyên CSS nền của bạn

export default function AuthTest() {
  // Hook useLocation giúp lấy dữ liệu được truyền sang từ trang Login
  const location = useLocation();
  const userData = location.state?.user;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center pt-32 pb-16 px-4 overflow-hidden">
      
      {/* Background blobs (Giữ style giống trang Home) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="relative z-10 w-full max-w-3xl bg-[#080313]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-fuchsia-400 mb-8 text-center">
          Xác thực Thành Công! 🎉
        </h2>

        {userData ? (
          <div className="space-y-6">
            {/* Thẻ hiển thị thông tin cơ bản */}
            <div className="flex items-center gap-6 bg-white/5 p-6 rounded-2xl border border-white/10">
              {userData.photoURL ? (
                <img src={userData.photoURL} alt="Avatar" className="w-20 h-20 rounded-full border-2 border-purple-500 shadow-lg shadow-purple-500/50" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-slate-700 border-2 border-purple-500 flex items-center justify-center text-2xl font-bold text-white">
                  {userData.displayName?.charAt(0) || "U"}
                </div>
              )}
              <div>
                <h3 className="text-2xl font-bold text-white">{userData.displayName}</h3>
                <p className="text-slate-400 mt-1">{userData.email}</p>
                <div className="mt-2 inline-block px-3 py-1 bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-bold uppercase tracking-wider rounded-full">
                  ID: {userData.id.substring(0, 10)}...
                </div>
              </div>
            </div>
            
            {/* Khung hiển thị mã JSON trả về từ Database */}
            <div className="bg-[#0d0714] p-6 rounded-2xl border border-white/10 shadow-inner overflow-x-auto relative group">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-purple-500 to-fuchsia-500 opacity-50"></div>
              <p className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-widest">Dữ liệu từ Supabase PostgreSQL:</p>
              <pre className="text-emerald-400 text-sm font-mono leading-relaxed">
                {JSON.stringify(userData, null, 2)}
              </pre>
            </div>

            <div className="flex justify-center pt-6">
              <Link to="/" className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-xl font-bold transition-all backdrop-blur-sm">
                Về Trang Chủ
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400 text-lg mb-8">Oops! Không tìm thấy dữ liệu đăng nhập. Hãy thử đăng nhập lại nhé.</p>
            <Link to="/auth/login" className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow-lg shadow-purple-500/25 transition-all">
              Quay lại trang Đăng nhập
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}