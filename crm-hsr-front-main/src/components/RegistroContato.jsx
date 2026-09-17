import { useState, useEffect } from "react";

const RESULTADOS = [
  { value: "ATENDEU",      label: "Atendeu",       color: "#22c55e", span: false },
  { value: "NAO_ATENDEU",  label: "Não atendeu",   color: "#f87171", span: false },
  { value: "CAIXA_POSTAL", label: "Caixa postal",  color: "#fb923c", span: false },
  { value: "RESPONDEU",    label: "Respondeu",     color: "#60a5fa", span: false },
  { value: "NAO_RESPONDEU",label: "Não respondeu", color: "#a78bfa", span: true  },
];

export default function RegistrarContato({ modalTipo, lead, onClose, onSalvar }) {
  const [resultadoContato, setResultadoContato] = useState(null);
  const [observacao, setObservacao] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 180);
  };

  const handleSalvar = () => {
    if (!resultadoContato) return;
    setVisible(false);
    setTimeout(() => onSalvar({ resultadoContato, observacao }), 180);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-all duration-[180ms] ease-in-out ${
        visible ? "bg-black/30" : "bg-black/0"
      }`}
    >
      <div
        className={`bg-white rounded-xl border border-gray-100 w-[400px] overflow-hidden shadow-lg font-lexend transition-all duration-[180ms] ease-in-out ${
          visible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-2 scale-95"
        }`}
      >

        <div className="px-5 pt-4 pb-3.5 border-b border-gray-100">
          <div className="flex items-center gap-2 mb-0.5">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M13 2.5A1.5 1.5 0 0011.5 1h-7A1.5 1.5 0 003 2.5v11A1.5 1.5 0 004.5 15h7a1.5 1.5 0 001.5-1.5v-11z" stroke="#24ADE8" strokeWidth="1.3"/>
              <path d="M6 5h4M6 8h4M6 11h2" stroke="#24ADE8" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <p className="text-sm font-medium text-gray-800">
              {modalTipo === "ligacao" ? "Registrar Ligação" : "Registrar WhatsApp"}
            </p>
          </div>
          {lead && (
            <p className="text-xs text-gray-400">{lead.nome} · #{lead.id}</p>
          )}
        </div>

        <div className="px-5 py-4">

          <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-2.5">
            Resultado do contato
          </p>
          <div className="grid grid-cols-2 gap-1.5 mb-4">
            {RESULTADOS.map(({ value, label, color, span }) => (
              <button
                key={value}
                onClick={() => setResultadoContato(value)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs transition-all ${
                  span ? "col-span-2" : ""
                } ${
                  resultadoContato === value
                    ? "border-[#24ADE8] bg-[#EBF8FE] text-[#0e7db0]"
                    : "border-gray-100 bg-white text-gray-500 hover:bg-gray-50 hover:border-gray-200"
                }`}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: color }}
                />
                {label}
              </button>
            ))}
          </div>

          <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-2.5">
            Observações
          </p>
          <textarea
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            placeholder="Digite uma observação sobre o contato..."
            rows={3}
            className="w-full border border-gray-100 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-300 resize-none outline-none focus:border-[#24ADE8] transition"
          />
        </div>

        <div className="px-5 pb-4 flex justify-end gap-2 border-t border-gray-100 pt-3">
          <button
            onClick={handleClose}
            className="px-4 py-1.5 rounded-lg border border-gray-100 text-sm text-gray-400 hover:bg-gray-50 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSalvar}
            disabled={!resultadoContato}
            className="px-5 py-1.5 rounded-lg bg-[#24ADE8] text-white text-sm font-medium hover:bg-[#1a9fd6] disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            Salvar
          </button>
        </div>

      </div>
    </div>
  );
}