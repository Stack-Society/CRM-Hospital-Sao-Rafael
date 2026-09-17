import { useCallback, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CallCenterLayout from "../../components/CallCenterLayout.jsx";
import iconSetaEsquerda from "../../assets/IconSetaEsquerda.svg";
import { api } from "../../services/api.js";
import ModalSucesso from "../../components/ModalSucesso.jsx";

const AgendamentoDetalhes = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [editando, setEditando] = useState(false);
    const [remarcando, setRemarcando] = useState(false);
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
    const [medicos, setMedicos] = useState([]);
    const [modalSucesso, setModalSucesso] = useState(false)

    const [agendamento, setAgendamento] = useState(null);

    const fetchAgendamento = useCallback(async () => {

        try {

            const response = await api.get(`/api/agendamento/funcionario/${id}`);

            setAgendamento(response.data);

        } catch (error) {

            console.error(error);
        }
    }, [id]);

    useEffect(() => {
        const fetchMedicos = async () => {
            try {
                const response = await api.get("/api/medicos")
                setMedicos(response.data)

            } catch (error) {
                console.error(error)
            }
        }



        // A carga inicial sincroniza o estado local com os dados da API.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchAgendamento();
        fetchMedicos();

    }, [fetchAgendamento]);

    const handleChange = (campo, valor) => {

        setAgendamento((prev) => ({
            ...prev,
            [campo]: valor
        }));
    };

    const salvarAlteracoes = async () => {

        try {

            await api.put(`/api/agendamento/${id}`, {
                medicoId: agendamento.medicoId,
                procedimento: agendamento.procedimento,
                diaAgendamento: agendamento.diaAgendamento,
                horaAgendamento: agendamento.horaAgendamento,
                observacoes: agendamento.observacoes
            });

            await fetchAgendamento();

            setEditando(false);
            setRemarcando(false);
            setModalSucesso(true);

        } catch (error) {

            console.error(error);
        }
    };

    const confirmarCancelamento = async () => {

        try {

            await api.patch(`/api/agendamento/${id}/cancelar`);

            setAgendamento((prev) => ({
                ...prev,
                status: "CANCELADO"
            }));

            setMostrarConfirmacao(false);
            setEditando(false);
            setRemarcando(false);
            setModalSucesso(true);

        } catch (error) {

            console.error(error);
        }
    };

    if (!agendamento) {
        return <p>Carregando...</p>;
    }

    return (
        <CallCenterLayout>
            <div className="flex flex-col w-full mr-10 mt-10 font-space mb-4">
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <button onClick={() => navigate(-1)}>
                            <img src={iconSetaEsquerda} alt="Icon Seta Esquerda" className="w-12 hover:opacity-70" />
                        </button>

                        <div>
                            <p className="text-xs text-gray-400 font-lexend">
                                Call Center / Agenda
                            </p>

                            <p className="text-lg font-medium font-lexend text-gray-800">
                                Detalhes do Agendamento
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-4 bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-8">
                        <p className="text-[22px] font-semibold font-space text-[#00A1E6]">
                            Agendamento
                        </p>

                        <div className="grid grid-cols-2 gap-6">

                            <div className="bg-[#F4F4F4] rounded-2xl p-5">
                                <p className="text-[#A1A1A1] font-semibold">
                                    Paciente
                                </p>

                                <p className="text-gray-800 text-xl font-medium mt-2">
                                    {agendamento.nomeLead}
                                </p>
                            </div>

                            <div className="bg-[#F4F4F4] rounded-2xl p-5">
                                <p className="text-[#A1A1A1] font-semibold">
                                    Médico responsável
                                </p>

                                {editando ? (

                                    <select value={agendamento.medicoId || ""} onChange={(e) => handleChange("medicoId", Number(e.target.value))} className="mt-2 text-gray-800 text-xl font-medium bg-[#F4F4F4] outline-none border border-transparent  ">
                                        <option value="" disabled>Selecione</option>
                                        {medicos.map((medico) => (
                                            <option value={medico.id} key={medico.id}>{medico.nome}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <p className="text-gray-800 text-xl font-medium mt-2">
                                        {agendamento.nomeMedico}
                                    </p>
                                )}
                            </div>

                            <div className="bg-[#F4F4F4] rounded-2xl p-5">
                                <p className="text-[#A1A1A1] font-semibold">
                                    Procedimento
                                </p>

                                {editando ? (
                                    <select
                                        value={agendamento.procedimento}
                                        onChange={(e) =>
                                            handleChange("procedimento", e.target.value)
                                        }
                                        className="text-gray-800 text-xl font-medium mt-2 bg-[#F4F4F4] outline-none border border-transparent w-full"
                                    >

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
                                ) : (
                                    <p className="text-gray-800 text-xl font-medium mt-2">
                                        {agendamento.procedimento
                                            ?.toLowerCase()
                                            .replaceAll("_", " ")
                                            .replace(/\b\w/g, (letra) => letra.toUpperCase())
                                        }
                                    </p>
                                )}
                            </div>

                            <div className="bg-[#F4F4F4] rounded-2xl p-5">
                                <p className="text-[#A1A1A1] font-semibold">
                                    ID Agendamento
                                </p>

                                <p className="text-gray-800 text-xl font-medium mt-2">
                                    {agendamento.id}
                                </p>
                            </div>

                            <div className="bg-[#F4F4F4] rounded-2xl p-5">
                                <p className="text-[#A1A1A1] font-semibold">
                                    Status
                                </p>

                                <div className="mt-2 text-gray-800 text-xl font-medium">
                                    {agendamento.status?.charAt(0) +
                                        agendamento.status?.slice(1).toLowerCase()}
                                </div>
                            </div>

                            <div className="bg-[#F4F4F4] rounded-2xl p-5">
                                <p className="text-[#A1A1A1] font-semibold">
                                    Data
                                </p>

                                {remarcando ? (
                                    <input
                                        type="date"
                                        value={agendamento.diaAgendamento}
                                        onChange={(e) =>
                                            handleChange("diaAgendamento", e.target.value)
                                        }
                                        className="text-gray-800 text-xl font-medium mt-2 bg-white rounded-xl px-4 py-3 outline-none border border-transparent focus:border-[#00A1E6] w-full"
                                    />
                                ) : (
                                    <p className="text-gray-800 text-xl font-medium mt-2">
                                        {agendamento.diaAgendamento?.split("-")[2]}/
                                        {agendamento.diaAgendamento?.split("-")[1]}
                                    </p>
                                )}
                            </div>

                            <div className="bg-[#F4F4F4] rounded-2xl  p-5">
                                <p className="text-[#A1A1A1] font-semibold">
                                    Horário
                                </p>

                                {remarcando ? (
                                    <input
                                        type="time"
                                        value={agendamento.horaAgendamento}
                                        onChange={(e) =>
                                            handleChange("horaAgendamento", e.target.value)
                                        }
                                        className="text-gray-800 text-xl font-medium mt-2 bg-white rounded-xl px-4 py-3 outline-none border border-transparent focus:border-[#00A1E6] w-full"
                                    />
                                ) : (
                                    <p className="text-gray-800 text-xl font-medium mt-2">
                                        {agendamento.horaAgendamento?.slice(0, 5)}
                                    </p>
                                )}
                            </div>

                            <div className="bg-[#F4F4F4] rounded-2xl p-6 ">
                                <p className="text-[#A1A1A1] font-semibold mb-3">
                                    Observações
                                </p>

                                {editando ? (
                                    <textarea
                                        value={agendamento.observacoes || ""}
                                        onChange={(e) =>
                                            handleChange("observacoes", e.target.value)
                                        }
                                        rows={5}
                                        className="text-gray-800 text-md font-medium leading-relaxed bg-white rounded-xl px-4 py-3 outline-none border border-transparent focus:border-[#00A1E6] w-full resize-none"
                                    />
                                ) : (
                                    <p className="text-gray-800 text-md font-medium leading-relaxed">
                                        {agendamento.observacoes}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2 flex flex-col gap-6">
                        <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col gap-4">

                            <p className="text-[22px] font-semibold font-space text-[#00A1E6]">
                                Ações rápidas
                            </p>

                            <button
                                onClick={() => {
                                    setEditando(true);
                                    setRemarcando(false);
                                }}
                                className="bg-[#00A1E6] hover:bg-[#00a1e6de] transition-colors duration-300 py-3 rounded-xl text-white font-semibold"
                            >
                                Editar atendimento
                            </button>

                            <button
                                onClick={() => {
                                    setRemarcando(true);
                                    setEditando(false);
                                }}
                                className="bg-[#FFF4D6] hover:bg-[#ffe9b0] transition-colors duration-300 py-3 rounded-xl text-[#C78B00] font-semibold"
                            >
                                Remarcar
                            </button>

                            <button
                                onClick={() => setMostrarConfirmacao(true)}
                                className="bg-[#FFD9D9] hover:bg-[#ffc5c5] transition-colors duration-300 py-3 rounded-xl text-[#D11A1A] font-semibold"
                            >
                                Cancelar atendimento
                            </button>

                            {(editando || remarcando) && (
                                <button
                                    onClick={salvarAlteracoes}
                                    className="bg-[#23A55A] hover:bg-[#1f914f] transition-colors duration-300 py-3 rounded-xl text-white font-semibold"
                                >
                                    Salvar alterações
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {modalSucesso && (<ModalSucesso mensagem={"Alterações feitas com sucesso!"} titulo={"Sucesso!"} onClose={() => setModalSucesso(false)} />)}

                {mostrarConfirmacao && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl shadow-2xl p-8 w-[480px] flex flex-col gap-6">

                            <div>
                                <p className="text-[#D11A1A] text-2xl font-bold">
                                    Cancelar atendimento?
                                </p>

                                <p className="text-[#6D6D6D] font-medium mt-2">
                                    Essa ação irá alterar o status do atendimento para cancelado.
                                    Deseja continuar?
                                </p>
                            </div>

                            <div className="flex justify-end gap-3">

                                <button
                                    onClick={() => setMostrarConfirmacao(false)}
                                    className="bg-[#F4F4F4] hover:bg-[#e9e9e9] transition-colors duration-300 px-5 py-3 rounded-xl text-[#5A5A5A] font-semibold"
                                >
                                    Voltar
                                </button>

                                <button
                                    onClick={confirmarCancelamento}
                                    className="bg-[#D11A1A] hover:bg-[#b81717] transition-colors duration-300 px-5 py-3 rounded-xl text-white font-semibold"
                                >
                                    Confirmar cancelamento
                                </button>

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </CallCenterLayout>
    );
};

export default AgendamentoDetalhes;
