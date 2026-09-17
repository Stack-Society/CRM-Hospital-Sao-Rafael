import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import ModalSucesso from "./ModalSucesso";
const SETORES = [
    { value: "CALL_CENTER", label: "Call Center" },
    { value: "ADMIN", label: "Administrativo" }
];

const Field = ({ label, error, children }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-medium text-gray-400 uppercase tracking-widest">
            {label}
        </label>
        {children}
        {error && <p className="text-[11px] text-red-400">{error}</p>}
    </div>
);

export default function FormularioFuncionario() {
    const navigate = useNavigate();

    const [modalSucesso, setModalSucesso] = useState(false)
    const [senhaTemporaria, setSenhaTemporaria] = useState("");

    const [form, setForm] = useState({
        nome: "",
        email: "",
        dataNascimento: "",
        setor: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const set = (field) => (e) =>
        setForm((prev) => ({ ...prev, [field]: e.target.value }));

    const validate = () => {
        const e = {};
        if (!form.nome.trim()) e.nome = "Nome é obrigatório.";
        if (!form.email.trim()) e.email = "Email é obrigatório.";
        else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Email inválido.";
        if (!form.dataNascimento) e.dataNascimento = "Data de nascimento é obrigatória.";
        if (!form.setor) e.setor = "Selecione um setor.";
        return e;
    };

    const handleSubmit = async () => {
        const e = validate();
        if (Object.keys(e).length > 0) { setErrors(e); return; }
        setErrors({});
        setLoading(true);
        try {
            const response = await api.post("/api/funcionarios", form);
            setSenhaTemporaria(response.data.senhaTemporaria);
            setModalSucesso(true)
        } catch (err) {
            console.error(err);
            setErrors({ submit: err.response?.data?.message || "Não foi possível cadastrar o funcionário." });
        } finally {
            setLoading(false);
        }
    };

    const inputClass = (field) =>
        `w-full border rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-300 outline-none transition font-lexend ${errors[field]
            ? "border-red-300 focus:border-red-400"
            : "border-gray-100 focus:border-[#24ADE8]"
        }`;

    return (
        <div className="w-full">

            {/* Card */}
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">

                {/* Card header */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="5" r="3" stroke="#24ADE8" strokeWidth="1.3" />
                        <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="#24ADE8" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                    <p className="text-sm font-medium text-gray-700 font-lexend">Dados do funcionário</p>
                </div>

                {/* Form */}
                <div className="px-6 py-5 flex flex-col gap-4">

                    <Field label="Nome completo" error={errors.nome}>
                        <input
                            type="text"
                            value={form.nome}
                            onChange={set("nome")}
                            placeholder="Ex: João da Silva"
                            className={inputClass("nome")}
                        />
                    </Field>

                    <Field label="Email" error={errors.email}>
                        <input
                            type="email"
                            value={form.email}
                            onChange={set("email")}
                            placeholder="Ex: joao@empresa.com"
                            className={inputClass("email")}
                        />
                    </Field>

                    <Field label="Data de nascimento" error={errors.dataNascimento}>
                        <input
                            type="date"
                            value={form.dataNascimento}
                            onChange={set("dataNascimento")}
                            className={inputClass("dataNascimento")}
                        />
                    </Field>

                    <Field label="Setor" error={errors.setor}>
                        <select
                            value={form.setor}
                            onChange={set("setor")}
                            className={`${inputClass("setor")} bg-white`}
                        >
                            <option value="">Selecione um setor...</option>
                            {SETORES.map(({ value, label }) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                    </Field>

                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2">
                    {errors.submit && (
                        <p className="mr-auto self-center text-xs text-red-500">{errors.submit}</p>
                    )}
                    <button
                        onClick={() => navigate(-1)}
                        className="px-4 py-1.5 rounded-lg border border-gray-100 text-sm text-gray-400 hover:bg-gray-50 transition font-lexend"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="px-5 py-1.5 rounded-lg bg-[#24ADE8] text-white text-sm font-medium hover:bg-[#1a9fd6] disabled:opacity-50 disabled:cursor-not-allowed transition font-lexend flex items-center gap-2"
                    >
                        {loading && (
                            <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3" />
                                <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        )}
                        {loading ? "Salvando..." : "Cadastrar"}
                    </button>
                </div>

            </div>
            {modalSucesso && (
                <ModalSucesso
                    titulo="Funcionário cadastrado"
                    duracao={12000}
                    mensagem={
                        <span>
                            Senha temporária: <strong className="text-gray-700 select-all">{senhaTemporaria}</strong>.
                            Guarde-a agora; ela não será exibida novamente.
                        </span>
                    }
                    onClose={() => {
                        setModalSucesso(false);
                        setSenhaTemporaria("");
                    }}
                />
            )}
        </div>
    );
}
