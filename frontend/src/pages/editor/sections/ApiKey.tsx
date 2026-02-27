import React, { useState } from 'react';
import { Bot, PenTool, Tag, Key, Save, Plus } from 'lucide-react';

export default function ApiKey() {
  const [formData, setFormData] = useState({
    agent: 'openai',
    role: 'writer',
    name: '',
    key: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-4xl animate-section">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Quản lý API Key</h2>
        <p className="text-slate-400">Thiết lập bộ não AI cho dự án của bạn. Bạn có thể thêm nhiều Key với các vai trò khác nhau.</p>
      </div>

      <div className="bg-black/20 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
          <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
            <Plus size={18} />
          </div>
          <h3 className="text-lg font-semibold text-white">Thêm Key Mới</h3>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
          
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
              <Bot size={16} className="text-purple-400" /> AI Agent
            </label>
            <div className="relative">
              <select 
                name="agent"
                value={formData.agent}
                onChange={handleChange}
                className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 appearance-none cursor-pointer"
              >
                <option value="openai" className="bg-[#080313]">OpenAI (GPT-4)</option>
                <option value="gemini" className="bg-[#080313]">Google Gemini</option>
                <option value="grok" className="bg-[#080313]">xAI Grok</option>
                <option value="claude" className="bg-[#080313]">Anthropic Claude</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
              </div>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
              <PenTool size={16} className="text-purple-400" /> Vai trò (Role)
            </label>
            <div className="relative">
              <select 
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 appearance-none cursor-pointer"
              >
                <option value="writer" className="bg-[#080313]">Viết chính (Writer)</option>
                <option value="outliner" className="bg-[#080313]">Lên dàn ý (Outliner)</option>
                <option value="editor" className="bg-[#080313]">Biên tập & Sửa lỗi (Editor)</option>
                <option value="world-builder" className="bg-[#080313]">Xây dựng thế giới (World Builder)</option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
              <Tag size={16} className="text-purple-400" /> Tên gợi nhớ
            </label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="VD: Key GPT-4 Dự án Tiên Hiệp..." 
              className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-600 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
              <Key size={16} className="text-purple-400" /> Mã API Key
            </label>
            <input 
              type="password" 
              name="key"
              value={formData.key}
              onChange={handleChange}
              placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" 
              className="w-full p-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-slate-600 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
            <p className="text-[11px] text-slate-500 mt-2">
              * Key của bạn được mã hóa an toàn và chỉ lưu trữ trên thiết bị/trình duyệt của bạn.
            </p>
          </div>

          <div className="md:col-span-2 flex justify-end mt-2">
            <button 
              type="button"
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-colors shadow-lg shadow-purple-500/20"
            >
              <Save size={18} />
              <span>Lưu cấu hình</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}