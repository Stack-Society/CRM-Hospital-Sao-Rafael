import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CallCenterLayout from "../../components/CallCenterLayout.jsx";
import { api } from "../../services/api.js";

const Cadastro = () => {

    const navigate = useNavigate();

    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchLeads = async () => {

            try {

                setLoading(true);

                const response = await api.get("/api/leads/funcionario");

                setLeads(response.data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);
            }
        };

        fetchLeads();

    }, []);

    const totalLeads = leads.length;

    const recentesCount = leads.filter((lead) => {

        if (!lead.dataCriacao) return false;

        const hoje = new Date();
        const dataLead = new Date(lead.dataCriacao);

        const diffTime = hoje - dataLead;

        const diffDias = diffTime / (1000 * 60 * 60 * 24);

        return diffDias <= 7;

    }).length;

    const aguardandoCount = leads.filter(
        (lead) => lead.status === "AGUARDANDO"
    ).length;

    const leadsRecentes = [...leads]
        .slice(0, 5);

    return (
        <CallCenterLayout>

            <div className="flex flex-col w-full mr-10 mt-8 font-space mb-4">

                <div className="flex justify-between items-center mb-6 bg-white w-full shadow-lg rounded-md p-4 mt-4">

                    <div>

                        <p className="text-xs text-gray-400 font-lexend">
                            Call Center / Cadastro
                        </p>

                        <p className="text-2xl font-medium font-lexend text-gray-900">
                            Cadastro
                        </p>

                    </div>

                    <button
                        onClick={() => navigate("/callcenter/cadastro/novo")}
                        className="bg-[#00A1E6] hover:bg-[#00a1e6de] transition-all duration-300 px-6 py-3 rounded-xl text-white font-bold shadow-md"
                    >
                        + Novo cadastro
                    </button>

                </div>

                <div className="grid grid-cols-6 gap-5 w-full">

                    <div className="col-span-2 bg-white rounded-xl h-[190px] shadow-lg p-6 flex flex-col justify-between">

                        <p className="text-[#00A1E6] text-xl font-semibold">
                            Leads cadastrados
                        </p>

                        <p className="text-[#00A1E6] text-4xl font-bold">
                            {totalLeads}
                        </p>

                        <div className="flex justify-between items-end">

                            <p className="text-[#AAA9A9] font-semibold">
                                Total no sistema
                            </p>

                            <button
                                onClick={() =>
                                    navigate("/callcenter/leads")
                                }
                                className="bg-[#00A1E6] text-white px-4 py-2 rounded-lg text-sm font-semibold"
                            >
                                Ver leads
                            </button>

                        </div>
                    </div>

                    <div className="col-span-2 bg-white rounded-xl h-[190px] shadow-lg p-6 flex flex-col justify-between">

                        <p className="text-[#00A1E6] text-xl font-semibold">
                            Cadastros recentes
                        </p>

                        <p className="text-[#00A1E6] text-4xl font-bold">
                            {recentesCount}
                        </p>

                        <div className="flex justify-between items-end">

                            <p className="text-[#AAA9A9] font-semibold">
                                Nesta semana
                            </p>

                        </div>
                    </div>

                    <div className="col-span-2 bg-white rounded-xl h-[190px] shadow-lg p-6 flex flex-col justify-between">

                        <p className="text-[#00A1E6] text-xl font-semibold">
                            Aguardando atendimento
                        </p>

                        <p className="text-[#00A1E6] text-4xl font-bold">
                            {aguardandoCount}
                        </p>

                        <div className="flex justify-between items-end">

                            <p className="text-[#AAA9A9] font-semibold">
                                Sem atendimento
                            </p>

                        </div>
                    </div>

                    <div className="col-span-6 bg-white rounded-xl shadow-lg p-6 mt-1">

                        <div className="flex justify-between items-center mb-5">

                            <div>

                                <p className="text-[#00A1E6] text-2xl font-semibold">
                                    Leads recentes
                                </p>

                                <p className="text-[#A1A1A1] font-medium mt-1">
                                    Últimos leads cadastrados no sistema
                                </p>

                            </div>

                            <button
                                onClick={() =>
                                    navigate("/callcenter/cadastro/detalhes")
                                }
                                className="bg-[#00A1E6] hover:bg-[#00a1e6de] transition-colors duration-300 px-5 py-3 rounded-xl text-white font-semibold"
                            >
                                Ver todos
                            </button>

                        </div>

                        <div className="flex flex-col gap-4">

                            {loading ? (

                                <p className="text-center py-10 text-[#AAA9A9] font-semibold">
                                    Carregando...
                                </p>

                            ) : leadsRecentes.length > 0 ? (

                                leadsRecentes.map((lead) => (

                                    <div
                                        key={lead.id}
                                        className="bg-[#F4F4F4] rounded-xl p-4 flex justify-between items-center"
                                    >

                                        <div>

                                            <p className="text-[#00A1E6] text-lg font-bold">
                                                {lead.nome}
                                            </p>

                                            <p className="text-[#A1A1A1] font-medium">
                                                {lead.telefone}
                                            </p>

                                        </div>

                                        <div className="flex items-center gap-3">

                                            <span
                                                className={`px-4 py-2 rounded-xl font-semibold bg-[#c5c5c580] text-[#ffffff]`}
                                            >
                                                {
                                                    lead.status?.charAt(0) +
                                                    lead.status?.slice(1).toLowerCase()
                                                }
                                            </span>

                                            {lead.status === "AGUARDANDO" && (

                                                <button
                                                    onClick={() =>
                                                        navigate("/callcenter/agenda/novo-atendimento")
                                                    }
                                                    className="bg-[#00A1E6] text-white px-5 py-3 rounded-xl font-semibold"
                                                >
                                                    Criar atendimento
                                                </button>
                                            )}

                                            <button
                                                onClick={() =>
                                                    navigate(`/callcenter/leads/${lead.id}`)
                                                }
                                                className="bg-white border border-[#00A1E6] text-[#00A1E6] hover:bg-[#00A1E6] hover:text-white transition-all duration-300 px-5 py-3 rounded-xl font-semibold"
                                            >
                                                Ver cadastro
                                            </button>

                                        </div>
                                    </div>
                                ))

                            ) : (

                                <p className="text-center py-10 text-[#AAA9A9] font-semibold">
                                    Nenhum lead encontrado.
                                </p>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </CallCenterLayout>
    );
};

export default Cadastro;