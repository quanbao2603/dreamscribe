import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"

// Tạo tạm một giao diện Trang chủ (Home) ở đây để kiểm tra
function Home() {
  return (
    <div className="min-h-screen bg-purple-50 flex flex-col items-center justify-center pt-24 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-purple-700 mb-4">
        Chào mừng đến với DreamScribe!
      </h1>
      <p className="text-lg text-slate-600 max-w-2xl">
        Nền tảng sáng tác truyện thông minh với sự hỗ trợ của AI. Hãy để trí tưởng tượng của bạn bay xa.
      </p>
    </div>
  )
}

export default function App() {
  return (
    <>
      {/* Thanh điều hướng sẽ luôn nằm ở trên cùng của mọi trang */}
      <Navbar />

      {/* Khu vực này sẽ thay đổi nội dung tùy theo đường dẫn (URL) */}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}