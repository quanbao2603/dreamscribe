import { useEffect, useMemo, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, X, User, Mail, Lock, ArrowLeft, ShieldCheck } from "lucide-react"; 
import authVisual from "../../assets/login.png";

function cn(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

export default function Register() {
  const navigate = useNavigate();
  
  const [step, setStep] = useState<1 | 2>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [touched, setTouched] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const nameOk = useMemo(() => fullName.trim().length >= 2, [fullName]);
  const emailOk = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()), [email]);
  const passOk = useMemo(() => password.length >= 6, [password]);
  const canSubmitInfo = nameOk && emailOk && passOk;
  const canSubmitOTP = useMemo(() => otp.every(digit => digit !== ""), [otp]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") navigate("/", { replace: true });
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [navigate]);

  const handleRequestOTP = async () => {
    setTouched(true);
    if (!canSubmitInfo) return;
    
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, fullName, password })
      });
      
      const data = await res.json();
      
      if (data.success) {
        setStep(2);
        setTimeout(() => otpRefs.current[0]?.focus(), 100);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Lỗi kết nối đến máy chủ.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    if (!canSubmitOTP) return;
    
    setIsSubmitting(true);
    const otpCode = otp.join("");
    
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: otpCode })
      });
      
      const data = await res.json();
      
      if (data.success) {
        navigate("/auth/login");
      } else {
        alert(data.error);
        setOtp(["", "", "", "", "", ""]);
        otpRefs.current[0]?.focus();
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Lỗi kết nối đến máy chủ.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-[#080313]/60 backdrop-blur-md" 
        onClick={() => navigate("/", { replace: true })}
      />

      <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl transition-all">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          <div className="relative hidden md:block overflow-hidden border-r border-white/5 bg-[#080313]">
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

          <div className="relative p-8 md:p-12 bg-white/5 md:bg-transparent overflow-hidden">
            <button
              onClick={() => navigate("/", { replace: true })}
              className="absolute right-6 top-6 rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white z-20 transition-all"
            >
              <X size={20} />
            </button>

            <div 
              className="flex w-[200%] transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${step === 1 ? '0' : '-50%'})` }}
            >
              
              <div className="w-1/2 shrink-0 px-2 transition-opacity duration-300" style={{ opacity: step === 1 ? 1 : 0 }}>
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
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Họ và tên</label>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        onBlur={() => setTouched(true)}
                        placeholder="Nguyễn Văn A"
                        className={cn(
                          "w-full rounded-xl border bg-white/5 pl-11 pr-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-600",
                          touched && !nameOk ? "border-red-500/50" : "border-white/10 focus:border-purple-500/50"
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Email</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setTouched(true)}
                        placeholder="email@vidu.com"
                        className={cn(
                          "w-full rounded-xl border bg-white/5 pl-11 pr-4 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-600",
                          touched && !emailOk ? "border-red-500/50" : "border-white/10 focus:border-purple-500/50"
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Mật khẩu</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={() => setTouched(true)}
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

                  <button
                    onClick={handleRequestOTP}
                    disabled={!canSubmitInfo || isSubmitting}
                    className={cn(
                      "w-full flex items-center justify-center rounded-xl mt-4 py-3.5 text-sm font-bold transition-all active:scale-[0.98]",
                      canSubmitInfo && !isSubmitting
                        ? "bg-linear-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-500/25 hover:opacity-90"
                        : "cursor-not-allowed bg-white/5 text-slate-600"
                    )}
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Tạo tài khoản"
                    )}
                  </button>

                  <p className="text-[10px] text-center text-slate-500 mt-4 leading-relaxed">
                    Bằng việc đăng ký, bạn đồng ý với <span className="underline cursor-pointer hover:text-slate-400">Điều khoản dịch vụ</span> và <span className="underline cursor-pointer hover:text-slate-400">Chính sách bảo mật</span> của chúng tôi.
                  </p>
                </div>
              </div>

              <div className="w-1/2 shrink-0 px-2 flex flex-col justify-center transition-opacity duration-300" style={{ opacity: step === 2 ? 1 : 0 }}>
                <button 
                  onClick={() => setStep(1)}
                  className="absolute left-6 top-6 flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft size={16} /> Quay lại
                </button>

                <div className="mb-8 text-center mt-6">
                  <div className="mx-auto w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                    <ShieldCheck size={24} className="text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Xác thực Email</h2>
                  <p className="mt-2 text-sm text-slate-400 max-w-70 mx-auto">
                    Chúng tôi đã gửi mã xác nhận gồm 6 chữ số đến <span className="text-white font-medium">{email || "email của bạn"}</span>
                  </p>
                </div>

                <div className="space-y-8">
                  <div className="flex justify-center gap-3">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => { otpRefs.current[index] = el; }}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className={cn(
                          "w-12 h-14 rounded-xl border text-center text-xl font-bold text-white outline-none transition-all",
                          digit ? "border-purple-500/50 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.15)]" : "border-white/10 bg-white/5 focus:border-purple-500/30"
                        )}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleVerifyOTP}
                    disabled={!canSubmitOTP || isSubmitting}
                    className={cn(
                      "w-full flex items-center justify-center rounded-xl py-3.5 text-sm font-bold transition-all active:scale-[0.98]",
                      canSubmitOTP && !isSubmitting
                        ? "bg-linear-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-500/25 hover:opacity-90"
                        : "cursor-not-allowed bg-white/5 text-slate-600"
                    )}
                  >
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Xác nhận & Hoàn tất"
                    )}
                  </button>

                  <p className="text-xs text-center text-slate-500">
                    Chưa nhận được mã? <button className="text-purple-400 hover:text-purple-300 font-medium">Gửi lại</button>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}