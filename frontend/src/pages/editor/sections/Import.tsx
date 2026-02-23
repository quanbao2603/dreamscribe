export default function Import() {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold text-white mb-4">Nhập dữ liệu</h2>
        <p className="text-slate-400">Tải lên file docx hoặc txt để AI tiếp tục phát triển cốt truyện.</p>
        <button className="mt-6 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-all">
          Chọn file từ máy tính
        </button>
      </div>
    );
  }