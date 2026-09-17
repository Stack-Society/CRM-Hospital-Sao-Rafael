import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ModalEncaminhar({ lead, onClose, onEncaminhar }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 180);
  };

  const handleEncaminhar = () => {
    setVisible(false);
    setTimeout(onEncaminhar, 180);
  };

  return createPortal(
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-[180ms] ease-in-out ${
        visible ? "bg-black/30" : "bg-black/0"
      }`}
    >
      <div
        className={`bg-white border border-gray-100 rounded-xl w-[380px] overflow-hidden shadow-lg font-lexend transition-all duration-[180ms] ease-in-out ${
          visible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-2 scale-95"
        }`}
      >

        {/* Header */}
        <div className="px-5 pt-4 pb-3.5 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-0.5">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 8h10M8 4l4 4-4 4"
                stroke="#24ADE8"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-sm font-medium text-gray-800">Encaminhar lead</p>
          </div>
          {lead && (
            <p className="text-xs text-gray-400">{lead.nome} · #{lead.id}</p>
          )}
        </div>


        {/* Footer */}
        <div className="px-5 pb-4 pt-3 flex justify-end gap-2 border-t border-gray-100">
          <button
            onClick={handleClose}
            className="px-4 py-1.5 rounded-lg border border-gray-100 text-sm text-gray-400 hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleEncaminhar}
            className="px-5 py-1.5 rounded-lg bg-[#24ADE8] text-white text-sm font-medium hover:bg-[#1a9fd6] transition flex items-center gap-1.5"
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 8h10M8 4l4 4-4 4"
                stroke="#fff"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Encaminhar
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}
