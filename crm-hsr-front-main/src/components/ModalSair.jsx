import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ModalSair({ currentUser, onClose, onConfirm }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 180);
  };

  const handleConfirm = () => {
    setVisible(false);
    setTimeout(onConfirm, 180);
  };

  return createPortal(
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-[180ms] ease-in-out ${
        visible ? "bg-black/30" : "bg-black/0"
      }`}
    >
      <div
        className={`bg-white border border-gray-100 rounded-xl w-96 h-80 overflow-hidden shadow-xl font-lexend transition-all duration-[180ms] ease-in-out ${
          visible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-2 scale-95"
        }`}
      >
        <div className="px-6 pt-7 pb-4 text-center">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-3.5">
            <svg width="26" height="26" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10 11l3-3-3-3M13 8H6"
                stroke="#f87171"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="text-md font-medium text-gray-800 mb-1.5">Sair do sistema?</p>
          <p className="text-sm text-gray-400 leading-relaxed">
            Você será desconectado da sua sessão.<br />Nenhum dado será perdido.
          </p>
        </div>

        <div className="mx-5 mb-4 px-3 py-2.5 bg-gray-50 rounded-lg flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#24ADE8] flex items-center justify-center text-white text-xs font-medium shrink-0">
            {currentUser?.nome?.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-medium text-gray-700 truncate">{currentUser?.nome}</p>
            <p className="text-[10px] text-gray-400">{currentUser?.setor}</p>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            <span className="text-[10px] text-gray-400">Online</span>
          </div>
        </div>

        <div className="px-5 pb-5 flex gap-2">
          <button
            onClick={handleClose}
            className="flex-1 py-2 rounded-lg bg-gray-100 text-sm font-medium text-gray-500 hover:bg-gray-200 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-2 rounded-lg bg-red-400 text-white text-sm font-medium hover:bg-red-500 transition"
          >
            Sair
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}