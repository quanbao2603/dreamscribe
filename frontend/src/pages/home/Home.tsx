// src/pages/home/Home.tsx
import { Outlet, useNavigate } from "react-router-dom";
import "../../layout/main.css"; 
import "./Home.css"; 
import Typewriter from "../../components/Typewriter"; 
import { editorLinks } from "../../data/NavLinks";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Hàm xử lý khi bấm nút "Bắt đầu viết ngay"
  const handleStartWriting = () => {
    if (user) {
      // Đã đăng nhập -> Vào thẳng Editor
      navigate(editorLinks.root);
    } else {
      // Chưa đăng nhập -> Chuyển hướng sang trang Login
      navigate("/auth/login");
    }
  };

  return (
    <div className="home-container relative min-h-screen w-full overflow-hidden">
      
      {/* 1. BACKGROUND BLOBS (Giữ nguyên làm nền cố định) */}
      <div className="background-container">
        <div className="blob blob-purple animate-blob"></div>
        <div className="blob blob-magenta animate-blob animation-delay-2000"></div>
        <div className="blob blob-blue animate-blob animation-delay-4000"></div>
      </div>

      {/* 2. NỘI DUNG CHÍNH */}
      <div className="relative z-10 flex flex-col items-center justify-start pt-32 md:pt-48 pb-16 px-4 text-center">

        {/* Tiêu đề chính với hiệu ứng gõ chữ */}
        <h1 className="home-title text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-8 max-w-4xl leading-tight">
          Mọi câu chuyện vĩ đại đều bắt đầu từ một{" "}
          <Typewriter 
            text="ý tưởng" 
            className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-fuchsia-400"
            delay={80} 
            infinite={true} 
          />
        </h1>

        {/* Đoạn mô tả */}
        <p className="home-description text-lg md:text-xl text-slate-400 max-w-3xl mb-12 leading-relaxed">
          Hãy bước vào thế giới vô tận của DreamScribe – nơi AI khơi dậy những giấc mơ hoang đường, 
          cùng bạn dệt nên cuộc phiêu lưu không giới hạn, từ ý tưởng mơ hồ đến kiệt tác bất tận.
        </p>

        {/* Nút bấm hành động (Đã đổi Link thành button và gắn hàm kiểm tra) */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <button 
            onClick={handleStartWriting}
            className="home-button w-full sm:w-auto px-10 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold text-base shadow-lg shadow-purple-500/30 transition-all text-center no-underline cursor-pointer"
          >
            Bắt đầu viết ngay
          </button>
        </div>
      </div>

      {/* 3. VỊ TRÍ HIỂN THỊ MODAL */}
      <Outlet /> 
    </div>
  );
}