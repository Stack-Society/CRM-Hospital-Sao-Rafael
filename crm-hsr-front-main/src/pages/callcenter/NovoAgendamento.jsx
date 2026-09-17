import { api } from "../../services/api";
import { useNavigate } from "react-router-dom";
import CallCenterLayout from "../../components/CallCenterLayout.jsx";
import iconSetaEsquerda from "../../assets/IconSetaEsquerda.svg";
import { useEffect, useState } from "react";
import ModalSucesso from "../../components/ModalSucesso.jsx";


const NovoAtendimento = () => {
    const navigate = useNavigate();
    const [modalSucesso, setModalSucesso] = useState(false);

    const [medicos, setMedicos] = useState([]);
    const [leads, setLeads] = useState([]);

    const [leadId, setLeadId] = useState("");
    const [medicoId, setMedicoId] = useState("");
    const [procedimento, setProcedimento] = useState("");
    const [diaAgendamento, setData] = useState("");
    const [horaAgendamento, setHora] = useState("");
    const [observacoes, setObservacoes] = useState("");

    useEffect(() => {
        const fetchMedicos = async () => {
            try {
                const response = await api.get("/api/medicos")
                setMedicos(response.data)

            } catch (error) {
                console.error(error)
            }
        }

        const fetchLeads = async () => {
            api.get(`/api/leads/funcionario`)
                .then((response) => {
                    setLeads(response.data);
                })
                .catch((error) => {
                    console.error("Erro ao buscar leads:", error);
                })
        }

        fetchMedicos();
        fetchLeads();
    }, [])

    const handleSalvar = async () => {

        try {

            await api.post("/api/agendamento", {
                leadId: Number(leadId),
                medicoId: Number(medicoId),
                horaAgendamento,
                procedimento,
                diaAgendamento,
                observacoes
            });

            setLeadId("");
            setMedicoId("");
            setHora("");
            setProcedimento("");
            setData("");
            setObservacoes("");
            setModalSucesso(true);


        } catch (error) {

            console.error(error);

            console.log(error.response.data);
        }
    }

    return (
        <CallCenterLayout>
            <div className="flex flex-col w-full mr-10 mt-10 font-space mb-4">
                <div className="flex items-center gap-3 mb-6">
                    <button onClick={() => navigate(-1)}>
                        <img src={iconSetaEsquerda} alt="Icon Seta Esquerda" className="w-12 hover:opacity-70" />
                    </button>
                    <div>
                        <p className="text-xs text-gray-400 font-lexend">Call Center / Agenda</p>
                        <p className="text-lg font-medium font-lexend text-gray-800">Novo Agendamento</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-8">
                    <div>
                        <p className="text-[#00A1E6] text-2xl font-bold">
                            Informações do agendamento
                        </p>

                        <p className="text-[#A1A1A1] font-medium mt-1">
                            Preencha os dados para registrar um novo agendamento
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-[#6D6D6D] font-semibold">
                                Paciente
                            </label>

                            <select value={leadId} onChange={(e) => setLeadId(e.target.value)} className="bg-[#F4F4F4] rounded-2xl p-4 outline-none border border-transparent focus:border-[#00A1E6] transition-all">
                                <option disabled value="">Selecione entre seus leads</option>
                                {leads.map((lead) => (
                                    <option value={lead.id} key={lead.id}>{lead.nome}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[#6D6D6D] font-semibold">
                                Médico responsável
                            </label>

                            <select value={medicoId} onChange={(e) => setMedicoId(e.target.value)} className="bg-[#F4F4F4] rounded-2xl p-4 outline-none border border-transparent focus:border-[#00A1E6] transition-all">
                                <option disabled value="">Selecione</option>
                                {medicos.map((medicos) => (
                                    <option value={medicos.id} key={medicos.id}>{medicos.nome}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[#6D6D6D] font-semibold">
                                Data
                            </label>

                            <input
                                type="date"
                                value={diaAgendamento}
                                onChange={(e) => setData(e.target.value)}
                                min={new Date().toISOString().split("T")[0]}
                                className="bg-[#F4F4F4] rounded-2xl p-4 outline-none border border-transparent focus:border-[#00A1E6] transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[#6D6D6D] font-semibold">
                                Horário
                            </label>

                            <input
                                type="time"
                                value={horaAgendamento}
                                onChange={(e) => setHora(e.target.value)}
                                className="bg-[#F4F4F4] rounded-2xl p-4 outline-none border border-transparent focus:border-[#00A1E6] transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[#6D6D6D] font-semibold">
                                Procedimento
                            </label>

                            <select
                                className="bg-[#F4F4F4] rounded-2xl p-4 outline-none border border-transparent focus:border-[#00A1E6] transition-all"
                                defaultValue=""
                                value={procedimento}
                                onChange={(e) => setProcedimento(e.target.value)}
                            >
                                <option value="" disabled>
                                    Selecione um procedimento
                                </option>

                                <option value="RINOPLASTIA">Rinoplastia</option>

                                <option value="LIPOASPIRACAO">Lipoaspiração</option>

                                <option value="ABDOMINOPLASTIA">Abdominoplastia</option>

                                <option value="MAMOPLASTIA">Mamoplastia</option>

                                <option value="BLEFAROPLASTIA">Blefaroplastia</option>

                                <option value="OTOPLASTIA">Otoplastia</option>

                                <option value="IMPLANTE_CAPILAR">Implante Capilar</option>

                                <option value="HARMONIZACAO_FACIAL">Harmonização Facial</option>

                                <option value="PREENCHIMENTO_LABIAL">Preenchimento Labial</option>

                                <option value="BOTOX">Botox</option>

                                <option value="LIFTING_FACIAL">Lifting Facial</option>

                                <option value="GLUTEOPLASTIA">Gluteoplastia</option>

                                <option value="PEELING">Peeling</option>

                                <option value="LIMPEZA_DE_PELE">Limpeza de Pele</option>

                                <option value="BIOESTIMULADOR_DE_COLAGENO">
                                    Bioestimulador de Colágeno
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[#6D6D6D] font-semibold">
                            Observações
                        </label>

                        <textarea
                            placeholder="Digite observações adicionais..."
                            rows={6}
                            className="bg-[#F4F4F4] rounded-2xl p-4 outline-none border border-transparent focus:border-[#00A1E6] transition-all resize-none"
                            value={observacoes}
                            onChange={(e) => setObservacoes(e.target.value)}
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-[#F4F4F4] hover:bg-[#e9e9e9] transition-all duration-300 px-8 py-4 rounded-2xl text-[#5A5A5A] font-bold text-md"
                        >
                            Cancelar
                        </button>

                        <button className="bg-[#00A1E6] hover:bg-[#00a1e6de] transition-all duration-300 px-8 py-4 rounded-2xl text-white font-bold text-md shadow-lg" onClick={handleSalvar}>
                            Salvar
                        </button>
                    </div>
                </div>
            </div>

            {modalSucesso && (<ModalSucesso titulo={"Agendamento confirmado"} mensagem={"O agendamento foi salvo com sucesso!"} onClose={()=> setModalSucesso(false)}/>)}
        </CallCenterLayout>
    );
};

export default NovoAtendimento;