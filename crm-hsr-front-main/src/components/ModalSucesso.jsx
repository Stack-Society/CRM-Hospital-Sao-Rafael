import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ModalSucesso({ titulo, mensagem, duracao = 3000, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));

    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 200);
    }, duracao);

    return () => clearTimeout(timer);
  }, [duracao, onClose]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 200);
  };

  return createPortal(
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-200 ease-in-out ${
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"
      }`}
    >
      <div className="w-80 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden font-lexend">
        <div className="px-4 py-3.5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center shrink-0">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8l3.5 3.5L13 4"
                stroke="#22c55e"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-800">{titulo}</p>
            {mensagem && (
              <p className="text-xs text-gray-400 mt-0.5">{mensagem}</p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="text-gray-300 hover:text-gray-400 transition text-sm shrink-0"
          >
            ✕
          </button>
        </div>

        {/* Barra de progresso */}
        <div className="h-[3px] bg-gray-100">
          <div
            className="h-full bg-[#24ADE8] rounded-full"
            style={{
              animation: `shrink ${duracao}ms linear forwards`,
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </div>,
    document.body
  );
}
