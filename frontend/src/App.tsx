import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Editor from "./pages/editor/Editor";
import ApiKey from "./pages/editor/sections/ApiKey";
import Import from "./pages/editor/sections/Import";
import LoadSaved from "./pages/editor/sections/LoadSaved";
import NewStory from "./pages/editor/sections/NewStory";
import { navLinks, authLinks, editorLinks } from "./data/NavLinks";
import AuthTest from "./pages/test/Auth";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#080313] transition-colors duration-500">
      <Navbar />
      
      <main className="grow">
        <Routes>
          <Route path={navLinks[0].href} element={<Home />}>
            <Route path={authLinks.login} element={<Login />} />
            <Route path={authLinks.register} element={<Register />} />
          </Route>

          <Route path={editorLinks.root} element={<Editor />}>
            <Route index element={<div className="text-white">Chào mừng bạn đến với Workspace</div>} />
            <Route path="create" element={<NewStory />} />
            <Route path="load" element={<LoadSaved />} />
            <Route path="import" element={<Import />} />
            <Route path="apikey" element={<ApiKey />} />
          </Route>

          <Route 
            path={navLinks[1].href} 
            element={<div className="pt-32 text-center text-white">Trang Tài Liệu đang phát triển...</div>} 
          />

          <Route path="/test/auth" element={<AuthTest />} />

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