// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

// Import Editor và các Sections
import Editor from "./pages/editor/Editor";
import ApiKey from "./pages/editor/sections/ApiKey";
import Import from "./pages/editor/sections/Import";
import LoadSaved from "./pages/editor/sections/LoadSaved";
import NewStory from "./pages/editor/sections/NewStory";

// Import dữ liệu đường dẫn
import { navLinks, authLinks, editorLinks } from "./data/NavLinks";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#080313] transition-colors duration-500">
      {/* Navbar sẽ ẩn/hiện tùy logic, thông thường Editor sẽ có Navbar riêng hoặc không dùng chung Navbar này */}
      <Navbar />
      
      <main className="grow">
        <Routes>
          {/* 1. ROUTE TRANG CHỦ & AUTH MODALS */}
          <Route path={navLinks[0].href} element={<Home />}>
            <Route path={authLinks.login} element={<Login />} />
            <Route path={authLinks.register} element={<Register />} />
          </Route>

          {/* 2. ROUTE EDITOR (Nested Routes) 
              Khi vào /editor, layout của Editor.tsx sẽ hiện ra, 
              các nội dung con sẽ được render vào vị trí <Outlet />
          */}
          <Route path={editorLinks.root} element={<Editor />}>
            {/* Index route cho editor (mặc định hiện khi vào /editor) */}
            <Route index element={<div className="text-white">Chào mừng bạn đến với Workspace</div>} />
            
            {/* Sử dụng path tương đối từ root "/editor" */}
            <Route path="create" element={<NewStory />} />
            <Route path="load" element={<LoadSaved />} />
            <Route path="import" element={<Import />} />
            <Route path="apikey" element={<ApiKey />} />
          </Route>

          {/* 3. ROUTE TÀI LIỆU */}
          <Route 
            path={navLinks[1].href} 
            element={<div className="pt-32 text-center text-white">Trang Tài Liệu đang phát triển...</div>} 
          />

          {/* 4. ROUTE 404 */}
          <Route 
            path="*" 
            element={<div className="pt-32 text-center text-white text-2xl font-bold">404 - Trang không tồn tại</div>} 
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}