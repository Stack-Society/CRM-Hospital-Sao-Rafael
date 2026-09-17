import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import CallCenterLayout from "../../components/CallCenterLayout.jsx";
import iconSetaEsquerda from "../../assets/IconSetaEsquerda.svg";
import { api } from "../../services/api.js";

const AgendaDetalhes = () => {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const filtroUrl = searchParams.get("filtro") || "todas";

    const [filtro, setFiltro] = useState(filtroUrl);
    const [busca, setBusca] = useState("");

    const [agendamentos, setAgendamentos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchAgendamentos = async () => {

            try {

                setLoading(true);

                let endpoint = "/api/agendamento/funcionario/filtro/todas";

                if (filtro === "hoje") {
                    endpoint = "/api/agendamento/funcionario/filtro/hoje";
                }

                if (filtro === "pendentes") {
                    endpoint = "/api/agendamento/funcionario/filtro/proximos";
                }

                if (filtro === "concluidas") {
                    endpoint = "/api/agendamento/funcionario/filtro/finalizados";
                }

                const response = await api.get(endpoint);

                setAgendamentos(response.data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);
            }
        };

        fetchAgendamentos();

    }, [filtro]);

    const agendamentosFiltrados = agendamentos.filter((agendamento) => {

        const textoBusca = busca.toLowerCase();

        return (
            agendamento.nomeLead?.toLowerCase().includes(textoBusca) ||
            agendamento.nomeMedico?.toLowerCase().includes(textoBusca) ||
            agendamento.procedimento?.toLowerCase().includes(textoBusca)
        );
    });

    const hojeCount = agendamentos.filter((a) => {

        const hoje = new Date().toISOString().split("T")[0];

        return a.diaAgendamento === hoje;

    }).length;

    const pendentesCount = agendamentos.filter(
        (a) => a.status === "PENDENTE"
    ).length;

    const finalizadosCount = agendamentos.filter(
        (a) => a.status === "FINALIZADO"
    ).length;

    return (
        <CallCenterLayout>
            <div className="flex flex-col w-full mr-10 mt-10 font-space mb-4">

                <div className="flex items-center gap-3 mb-6">
                    <button onClick={() => navigate(-1)}>
                        <img
                            src={iconSetaEsquerda}
                            alt="Icon Seta Esquerda"
                            className="w-12 hover:opacity-70"
                        />
                    </button>

                    <div>
                        <p className="text-xs text-gray-400 font-lexend">
                            Call Center / Agenda
                        </p>

                        <p className="text-lg font-medium font-lexend text-gray-800">
                            Detalhes da Agenda
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-8">

                    <div className="bg-white rounded-lg shadow-xl p-6">
                        <p className="text-[#00A1E6] text-xl font-semibold">
                            Atendimentos de hoje
                        </p>

                        <p className="text-[#00A1E6] text-4xl font-bold mt-4">
                            {hojeCount}
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-xl p-6">
                        <p className="text-[#00A1E6] text-xl font-semibold">
                            Pendentes
                        </p>

                        <p className="text-[#00A1E6] text-4xl font-bold mt-4">
                            {pendentesCount}
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-xl p-6">
                        <p className="text-[#00A1E6] text-xl font-semibold">
                            Finalizados
                        </p>

                        <p className="text-[#00A1E6] text-4xl font-bold mt-4">
                            {finalizadosCount}
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-xl p-6">

                    <div className="flex justify-between items-center mb-6">

                        <div className="flex gap-3">

                            <button
                                onClick={() => setFiltro("todas")}
                                className={`px-5 py-2 rounded-xl font-semibold ${
                                    filtro === "todas"
                                        ? "bg-[#00A1E6] text-white"
                                        : "bg-[#F4F4F4] text-[#00A1E6]"
                                }`}
                            >
                                Todos
                            </button>

                            <button
                                onClick={() => setFiltro("hoje")}
                                className={`px-5 py-2 rounded-xl font-semibold ${
                                    filtro === "hoje"
                                        ? "bg-[#00A1E6] text-white"
                                        : "bg-[#F4F4F4] text-[#00A1E6]"
                                }`}
                            >
                                Hoje
                            </button>

                            <button
                                onClick={() => setFiltro("pendentes")}
                                className={`px-5 py-2 rounded-xl font-semibold ${
                                    filtro === "pendentes"
                                        ? "bg-[#00A1E6] text-white"
                                        : "bg-[#F4F4F4] text-[#00A1E6]"
                                }`}
                            >
                                Próximos
                            </button>

                            <button
                                onClick={() => setFiltro("concluidas")}
                                className={`px-5 py-2 rounded-xl font-semibold ${
                                    filtro === "concluidas"
                                        ? "bg-[#00A1E6] text-white"
                                        : "bg-[#F4F4F4] text-[#00A1E6]"
                                }`}
                            >
                                Finalizados
                            </button>
                        </div>

                        <input
                            type="text"
                            placeholder="Buscar atendimento..."
                            value={busca}
                            onChange={(e) => setBusca(e.target.value)}
                            className="bg-[#F4F4F4] rounded-xl px-4 py-3 outline-none border border-transparent focus:border-[#00A1E6] w-[300px]"
                        />
                    </div>

                    <div className="flex flex-col gap-4">

                        {loading ? (

                            <p className="text-[#AAA9A9] font-semibold text-center py-10">
                                Carregando...
                            </p>

                        ) : agendamentosFiltrados.length > 0 ? (

                            agendamentosFiltrados.map((agendamento) => (

                                <div
                                    key={agendamento.id}
                                    className="bg-[#F4F4F4] rounded-xl p-4 flex justify-between items-center"
                                >

                                    <div>

                                        <p className="text-[#00A1E6] font-bold text-lg">

                                            {agendamento.procedimento
                                                ?.toLowerCase()
                                                .replaceAll("_", " ")
                                                .replace(/\b\w/g, (letra) =>
                                                    letra.toUpperCase()
                                                )}{" "}

                                            — {agendamento.nomeLead}
                                        </p>

                                        <p className="text-[#AAA9A9] font-semibold">

                                            {agendamento.diaAgendamento
                                                ?.split("-")[2]}/
                                            {agendamento.diaAgendamento
                                                ?.split("-")[1]}

                                            {" às "}

                                            {agendamento.horaAgendamento?.slice(0, 5)}

                                            {" — "}

                                            {agendamento.nomeMedico}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/callcenter/agenda/detalhes/${agendamento.id}`
                                            )
                                        }
                                        className="bg-[#00A1E6] hover:bg-[#00a1e6de] transition-colors duration-300 text-white px-5 py-3 rounded-xl font-semibold"
                                    >
                                        Ver detalhes
                                    </button>
                                </div>
                            ))

                        ) : (

                            <p className="text-[#AAA9A9] font-semibold text-center py-10">
                                Nenhum atendimento encontrado.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </CallCenterLayout>
    );
};

export default AgendaDetalhes;