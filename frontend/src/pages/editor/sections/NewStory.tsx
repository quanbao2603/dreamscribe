import React, { useState } from 'react';
import { 
  BookOpen, User, Settings2, Globe, Sparkles, 
  Trash2, Plus, ArrowLeft, Eraser, Play
} from 'lucide-react';

export default function NewStory() {
  // State quản lý dữ liệu form
  const [formData, setFormData] = useState({
    title: '',
    theme: '',
    genre: '',
    setting: '',
    mcName: '',
    mcGender: 'nam',
    mcBio: '',
    writingStyle: '',
    crueltyLevel: 'normal',
    aiInstructions: '',
    useSavedExp: true,
    allowNsfw: false,
    worldEntities: [{ id: 1, type: 'faction', name: '', description: '', conflict: '' }]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAddEntity = () => {
    setFormData(prev => ({
      ...prev,
      worldEntities: [...prev.worldEntities, { id: Date.now(), type: 'faction', name: '', description: '', conflict: '' }]
    }));
  };

  const handleRemoveEntity = (id: number) => {
    setFormData(prev => ({
      ...prev,
      worldEntities: prev.worldEntities.filter(entity => entity.id !== id)
    }));
  };

  return (
    <div className="max-w-4xl mx-auto animate-section pb-10">
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Tạo dự án mới</h2>
        <p className="text-slate-400">Thiết lập các thông số cơ bản để AI hiểu rõ thế giới và câu chuyện bạn muốn kể.</p>
      </div>

      <div className="space-y-8">
        
        {/* PHẦN 1: THIẾT LẬP CỐT LÕI */}
        <div className="bg-black/20 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
              <BookOpen size={18} />
            </div>
            <h3 className="text-lg font-semibold text-white">1. Thiết Lập Cốt Lõi</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Tên Truyện</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="VD: Dấu Vải" className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-all" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Chủ Đề / Mô Tả Ngắn</label>
              <textarea name="theme" value={formData.theme} onChange={handleChange} placeholder="VD: Đa nhân cách..." rows={2} className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-all resize-none"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Thể loại truyện</label>
              <input type="text" name="genre" value={formData.genre} onChange={handleChange} placeholder="VD: Tâm lý học" className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Bối Cảnh Chung</label>
              <input type="text" name="setting" value={formData.setting} onChange={handleChange} placeholder="VD: Gia đình khó khăn" className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-all" />
            </div>
          </div>
        </div>

        {/* PHẦN 2: NHÂN VẬT CHÍNH */}
        <div className="bg-black/20 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400">
                <User size={18} />
              </div>
              <h3 className="text-lg font-semibold text-white">2. Nhân Vật Chính</h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Tên Nhân Vật</label>
              <input type="text" name="mcName" value={formData.mcName} onChange={handleChange} className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Giới Tính</label>
              <select name="mcGender" value={formData.mcGender} onChange={handleChange} className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 appearance-none cursor-pointer">
                <option value="nam" className="bg-[#080313]">Nam</option>
                <option value="nu" className="bg-[#080313]">Nữ</option>
                <option value="khac" className="bg-[#080313]">Khác</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <div className="flex justify-between items-end mb-2">
                <label className="block text-sm font-medium text-slate-300">Tiểu Sử / Bối Cảnh</label>
                <button className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors">
                  <Sparkles size={12} /> Gợi ý bằng AI
                </button>
              </div>
              <textarea name="mcBio" value={formData.mcBio} onChange={handleChange} placeholder="VD: Bị bạn bè bắt nạt..." rows={3} className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-all resize-none"></textarea>
            </div>
          </div>
        </div>

        {/* PHẦN 3: THIẾT LẬP NÂNG CAO */}
        <div className="bg-black/20 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400">
              <Settings2 size={18} />
            </div>
            <h3 className="text-lg font-semibold text-white">3. Thiết Lập Nâng Cao</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Phong cách viết</label>
              <input type="text" name="writingStyle" value={formData.writingStyle} onChange={handleChange} placeholder="VD: Kinh dị, máu me" className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-all" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Độ tàn khốc của thế giới</label>
              <select name="crueltyLevel" value={formData.crueltyLevel} onChange={handleChange} className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 appearance-none cursor-pointer">
                <option value="normal" className="bg-[#080313]">Bình thường</option>
                <option value="hard" className="bg-[#080313]">Ngặt nghèo - Khốc liệt, tàn nhẫn</option>
                <option value="hell" className="bg-[#080313]">Địa ngục</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Hướng dẫn chung cho AI</label>
              <textarea name="aiInstructions" value={formData.aiInstructions} onChange={handleChange} rows={2} className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 transition-all resize-none"></textarea>
            </div>
            
            {/* Checkboxes */}
            <div className="md:col-span-2 flex flex-wrap gap-6 mt-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5 rounded border border-white/20 bg-white/5 group-hover:border-purple-500 transition-colors">
                  <input type="checkbox" name="useSavedExp" checked={formData.useSavedExp} onChange={handleChange} className="peer sr-only" />
                  <div className="absolute inset-0 bg-purple-500 rounded opacity-0 peer-checked:opacity-100 transition-opacity flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                </div>
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Áp Dụng Kinh Nghiệm AI Đã Lưu</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center w-5 h-5 rounded border border-white/20 bg-white/5 group-hover:border-purple-500 transition-colors">
                  <input type="checkbox" name="allowNsfw" checked={formData.allowNsfw} onChange={handleChange} className="peer sr-only" />
                  <div className="absolute inset-0 bg-purple-500 rounded opacity-0 peer-checked:opacity-100 transition-opacity flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                </div>
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">Cho phép nội dung NSFW</span>
              </label>
            </div>
          </div>
        </div>

        {/* PHẦN 4: KIẾN TẠO THẾ GIỚI */}
        <div className="bg-black/20 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Globe size={18} />
              </div>
              <h3 className="text-lg font-semibold text-white">4. Kiến Tạo Thế Giới (Tùy chọn)</h3>
            </div>
          </div>

          <div className="space-y-6">
            {formData.worldEntities.map((entity) => (
              <div key={entity.id} className="p-5 bg-white/5 border border-white/10 rounded-xl relative group">
                {/* Nút xóa thực thể */}
                {formData.worldEntities.length > 1 && (
                  <button onClick={() => handleRemoveEntity(entity.id)} className="absolute top-4 right-4 p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                    <Trash2 size={16} />
                  </button>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select className="w-full p-3 bg-black/20 border border-white/10 rounded-lg text-white outline-none focus:border-purple-500">
                    <option value="faction">Thế Lực</option>
                    <option value="location">Địa Điểm</option>
                    <option value="item">Vật Phẩm</option>
                  </select>
                  <input type="text" placeholder="Tên (VD: Ma quỷ)" className="w-full p-3 bg-black/20 border border-white/10 rounded-lg text-white outline-none focus:border-purple-500 pr-10" />
                  
                  <div className="md:col-span-2 flex justify-end">
                     <button className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 bg-purple-500/10 px-3 py-1.5 rounded-lg transition-colors">
                        <Sparkles size={12} /> AI Mô tả
                     </button>
                  </div>

                  <div className="md:col-span-2">
                    <textarea placeholder="Mô tả thế lực..." rows={2} className="w-full p-3 bg-black/20 border border-white/10 rounded-lg text-white outline-none focus:border-purple-500 resize-none"></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <textarea placeholder="Xung đột nội bộ (ẩn)..." rows={1} className="w-full p-3 bg-black/20 border border-white/10 rounded-lg text-white outline-none focus:border-purple-500 resize-none"></textarea>
                  </div>
                </div>
              </div>
            ))}

            <button onClick={handleAddEntity} className="w-full py-4 border-2 border-dashed border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/5 text-slate-400 hover:text-emerald-400 rounded-xl flex items-center justify-center gap-2 transition-all">
              <Plus size={18} /> Thêm Thực Thể Mới
            </button>
          </div>
        </div>

        {/* PHẦN 5: ACTION BUTTONS (FOOTER) */}
        <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-white/10">
          
          {/* Hàng nút phụ */}
          <div className="flex items-center justify-center gap-4">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-xl transition-colors font-medium">
              <ArrowLeft size={16} /> Quay Lại
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors font-medium">
              <Eraser size={16} /> Xóa Nháp
            </button>
          </div>

          {/* Hàng nút chính */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <button className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-bold shadow-lg shadow-purple-500/25 transition-all">
              <Sparkles size={18} /> AI Tinh Chỉnh
            </button>
            <button className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white rounded-xl font-bold shadow-lg shadow-teal-500/25 transition-all">
              <Play size={18} className="fill-current" /> Bắt Đầu Viết
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}