export default function LoadSaved() {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold text-white mb-4">Bản thảo đã lưu</h2>
        <p className="text-slate-400">Danh sách các câu chuyện bạn đã viết dở dang.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl text-slate-300">
              Bản thảo truyện số {i}
            </div>
          ))}
        </div>
      </div>
    );
  }