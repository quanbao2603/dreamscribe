import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, X, User, Mail, Lock } from "lucide-react"; 
import authVisual from "../../assets/login.png";

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export default function Register() {
  const navigate = useNavigate();
  const [touched, setTouched] = useState(false);
  
  // State quản lý form
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Logic kiểm tra hợp lệ
  const nameOk = useMemo(() => fullName.trim().length >= 2, [fullName]);
  const emailOk = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()), [email]);
  const passOk = useMemo(() => password.length >= 6, [password]);
  const canSubmit = nameOk && emailOk && passOk;

  // Đóng modal bằng phím Esc
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") navigate("/", { replace: true });
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigate]);

  const handleSubmit = () => {
    setTouched(true);
    if (!canSubmit) return;
    console.log("REGISTER SUCCESS", { fullName, email, password });
    navigate("/auth/login"); // Đăng ký xong chuyển sang trang đăng nhập
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Overlay mờ nền */}
      <div 
        className="absolute inset-0 bg-[#080313]/60 backdrop-blur-md" 
        onClick={() => navigate("/", { replace: true })}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl transition-all">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Visual Area (Giống Login) */}
          <div className="relative hidden md:block overflow-hidden border-r border-white/5">
            <img
              src={authVisual}
              alt="DreamScribe Register"
              className="absolute inset-0 h-full w-full object-cover opacity-50"
              draggable={false}
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#080313] via-[#080313]/20 to-transparent" />
            
            <div className="relative flex h-full flex-col justify-end p-10">
              <h3 className="text-2xl font-bold text-white tracking-tighter">DreamScribe</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Tạo tài khoản để lưu trữ những kiệt tác AI của bạn và tham gia vào cộng đồng tác giả số.
              </p>
            </div>
          </div>

          {/* Right Form Area */}
          <div className="relative p-8 md:p-12 bg-white/5 md:bg-transparent">
            <button
              onClick={() => navigate("/", { replace: true })}
              className="absolute right-6 top-6 rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-all"
            >
              <X size={20} />
            </button>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white">Đăng ký tài khoản</h2>
              <p className="mt-2 text-sm text-slate-400">
                Đã có tài khoản?{" "}
                <Link to="/auth/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                  Đăng nhập tại đây
                </Link>
              </p>
            </div>

            <div className="space-y-4">
              {/* Họ và tên */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Họ và tên</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nguyễn Văn A"
                    className={cn(
                      "w-full rounded-xl border bg-white/5 pl-11 pr-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-600",
                      touched && !nameOk ? "border-red-500/50" : "border-white/10 focus:border-purple-500/50"
                    )}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Email</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@vidu.com"
                    className={cn(
                      "w-full rounded-xl border bg-white/5 pl-11 pr-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-600",
                      touched && !emailOk ? "border-red-500/50" : "border-white/10 focus:border-purple-500/50"
                    )}
                  />
                </div>
              </div>

              {/* Mật khẩu */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Mật khẩu</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={cn(
                      "w-full rounded-xl border bg-white/5 pl-11 pr-12 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-600",
                      touched && !passOk ? "border-red-500/50" : "border-white/10 focus:border-purple-500/50"
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-500 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={cn(
                  "w-full rounded-xl mt-4 py-3.5 text-sm font-bold transition-all active:scale-[0.98]",
                  canSubmit
                    ? "bg-linear-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-500/25 hover:opacity-90"
                    : "cursor-not-allowed bg-white/5 text-slate-600"
                )}
              >
                Tạo tài khoản ngay
              </button>

              <p className="text-[10px] text-center text-slate-500 mt-4 leading-relaxed">
                Bằng việc đăng ký, bạn đồng ý với <span className="underline cursor-pointer">Điều khoản dịch vụ</span> và <span className="underline cursor-pointer">Chính sách bảo mật</span> của chúng tôi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}