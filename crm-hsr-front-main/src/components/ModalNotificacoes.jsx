import { useEffect, useState } from "react";

export default function ModalNotificacoes({ notificacoes = [], onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 180);
  };

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={handleClose} />

      <div
        className={`fixed z-50 top-24 right-4 w-80 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden font-lexend transition-all duration-[180ms] ease-in-out ${
          visible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 -translate-y-2 scale-95"
        }`}
      >
        <div className="px-4 py-3.5 border-b border-gray-100 flex items-center gap-2">
          <span className="text-sm font-medium text-gray-800">Notificações</span>
          {notificacoes.filter((n) => !n.lida).length > 0 && (
            <span className="w-[18px] h-[18px] rounded-full bg-[#24ADE8] text-white text-[10px] font-semibold flex items-center justify-center">
              {notificacoes.filter((n) => !n.lida).length}
            </span>
          )}
        </div>

        <div className="max-h-80 overflow-y-auto">
          {notificacoes.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 gap-2">
              <p className="text-sm text-gray-400">Nenhuma notificação por enquanto</p>
            </div>
          ) : (
            notificacoes.map((n) => (
              <div
                key={n.id}
                className={`flex gap-2.5 px-4 py-3 border-b border-gray-50 last:border-b-0 cursor-pointer transition ${
                  !n.lida ? "bg-[#f0faff] hover:bg-[#e3f5fd]" : "hover:bg-gray-50"
                }`}
              >
                <div className={`w-9 h-9 rounded-full ${n.iconBg} flex items-center justify-center text-sm shrink-0`}>
                  {n.icon}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-gray-700 mb-0.5">{n.title}</p>
                  <p className="text-[11px] text-gray-400 leading-relaxed mb-1">{n.desc}</p>
                  <p className="text-[10px] text-gray-300">{n.time}</p>
                </div>
                {!n.lida && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#24ADE8] shrink-0 mt-1.5" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}