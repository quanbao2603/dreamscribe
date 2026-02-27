import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, X } from "lucide-react";
import authVisual from "../../assets/login.png";

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8.1 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.2-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.2 19 12 24 12c3.1 0 5.9 1.2 8.1 3.1l5.7-5.7C34.2 6.1 29.4 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.1 0 9.8-2 13.3-5.2l-6.1-5.1C29.1 35.6 26.7 36 24 36c-5.2 0-9.6-3.3-11.2-8l-6.6 5.1C9.6 39.7 16.3 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 2.9-3.1 5-5.7 6.4l.1.1 6.1 5.1C39.4 36.4 44 31.5 44 24c0-1.3-.1-2.2-.4-3.5z" />
    </svg>
  );
}

export default function Login() {
  const navigate = useNavigate();
  const [touched, setTouched] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailOk = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()), [email]);
  const passOk = useMemo(() => password.length >= 6, [password]);
  const canSubmit = emailOk && passOk;

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
    console.log("LOGIN SUCCESS", { email, password });
    navigate("/");
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
  
      <div 
        className="absolute inset-0 bg-[#080313]/60 backdrop-blur-md" 
        onClick={() => navigate("/", { replace: true })}
      />

      <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          <div className="relative hidden md:block overflow-hidden border-r border-white/5">
            <img
              src={authVisual}
              alt="DreamScribe Login"
              className="absolute inset-0 h-full w-full object-cover opacity-60"
              draggable={false}
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#080313] via-transparent to-transparent" />
            
            <div className="relative flex h-full flex-col justify-end p-10">
              <h3 className="text-2xl font-bold text-white">DreamScribe</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                Đăng nhập để bắt đầu hành trình sáng tạo, nơi AI giúp bạn viết tiếp những chương truyện dang dở.
              </p>
            </div>
          </div>

          <div className="relative p-8 md:p-12">
            <button
              onClick={() => navigate("/", { replace: true })}
              className="absolute right-6 top-6 rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white transition-all"
            >
              <X size={20} />
            </button>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white">Chào mừng trở lại</h2>
              <p className="mt-2 text-sm text-slate-400">
                Chưa có tài khoản?{" "}
                <Link to="/auth/register" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
                  Đăng ký ngay
                </Link>
              </p>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(true)}
                  placeholder="name@company.com"
                  className={cn(
                    "w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-600",
                    touched && !emailOk ? "border-red-500/50" : "border-white/10 focus:border-purple-500/50 focus:bg-white/10"
                  )}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">Mật khẩu</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setTouched(true)}
                    placeholder="••••••••"
                    className={cn(
                      "w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-600",
                      touched && !passOk ? "border-red-500/50" : "border-white/10 focus:border-purple-500/50 focus:bg-white/10"
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

              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={cn(
                  "w-full rounded-xl py-3.5 text-sm font-bold transition-all active:scale-[0.98]",
                  canSubmit
                    ? "bg-linear-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-500/25 hover:opacity-90"
                    : "cursor-not-allowed bg-white/5 text-slate-600"
                )}
              >
                Đăng nhập
              </button>

              <div className="relative flex items-center gap-4 py-2">
                <div className="h-px flex-1 bg-white/5" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Hoặc</span>
                <div className="h-px flex-1 bg-white/5" />
              </div>

              <button
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition-all hover:bg-white/10"
                onClick={() => window.location.href = "http://localhost:8080/auth/google"}
              >
                <GoogleIcon />
                Tiếp tục với Google
              </button>

              <div className="text-center pt-2">
                <Link to="/auth/forgot" className="text-xs text-slate-500 hover:text-slate-300 transition-colors underline underline-offset-4 decoration-white/10">
                  Quên mật khẩu?
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}