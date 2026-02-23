export default function ApiKey() {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold text-white mb-4">Cấu hình API Key</h2>
        <p className="text-slate-400">Nhập Key của OpenAI hoặc Gemini để kích hoạt bộ não AI.</p>
        <input 
          type="password" 
          placeholder="sk-xxxxxxxxxxxxxxxx" 
          className="w-full mt-6 p-4 bg-black/20 border border-white/10 rounded-xl text-white outline-none focus:border-purple-500"
        />
      </div>
    );
  }