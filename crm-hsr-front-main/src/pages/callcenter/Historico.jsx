import { useEffect, useState } from "react";
import CallCenterLayout from "../../components/CallCenterLayout.jsx";
import { api } from "../../services/api.js";

const Historico = () => {

    const [historico, setHistorico] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    const tipoEventoLabel = {
        CRIACAO: "Criação",
        ATUALIZACAO: "Atualização",
        ENCAMINHADO_VENDAS: "Encaminhado",
        CONTATO: "Contato",
        FECHAMENTO: "Fechamento",
        CANCELAMENTO: "Cancelamento",
        FOLLOWUP: "Follow-up",
    };

    const tipoEventoCor = {
        CRIACAO: { bg: "#E8F5E9", text: "#2E7D32", dot: "#43A047" },
        ATUALIZACAO: { bg: "#E3F2FD", text: "#1565C0", dot: "#1E88E5" },
        CONTATO: { bg: "#FFF8E1", text: "#F57F17", dot: "#FFB300" },
        FECHAMENTO: { bg: "#EDE7F6", text: "#4527A0", dot: "#7E57C2" },
        CANCELAMENTO: { bg: "#FFEBEE", text: "#B71C1C", dot: "#EF5350" },
        FOLLOWUP: { bg: "#E0F7FA", text: "#006064", dot: "#00ACC1" },
    };

    const formatarData = (dataHora) => {

        if (!dataHora) return "—";

        const data = new Date(dataHora);

        return data.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    useEffect(() => {

        const fetchHistorico = async () => {

            try {

                setLoading(true);

                const response = await api.get(
                    "/api/leads/historico/funcionario"
                );

                const ordenado = [...response.data]
                    .sort(
                        (a, b) =>
                            new Date(b.dataHora) -
                            new Date(a.dataHora)
                    )
                    .slice(0, 10);

                setHistorico(ordenado);

            } catch (error) {

                console.error(error);

                setErro(
                    error.response?.data?.message ||
                    "Erro ao carregar histórico"
                );

            } finally {

                setLoading(false);
            }
        };

        fetchHistorico();

    }, []);

    return (
        <CallCenterLayout>

            <div className="flex flex-col w-full mr-10 mb-4">

                <div className="flex items-center justify-between mb-6">
                    <div className="flex justify-between items-center bg-white w-full mt-10 p-4 shadow-lg rounded-md">

                        <div>
                            <p className="text-xs text-gray-400 font-lexend">
                                Call Center / Histórico
                            </p>

                            <p className="text-2xl font-medium font-lexend text-gray-900">
                                Histórico
                            </p>
                        </div>

                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-[#EBEBEB] overflow-hidden">

                    {erro ? (

                        <div className="flex flex-col items-center justify-center py-20 gap-3">

                            <p className="text-sm text-[#EF5350] font-medium">
                                Falha ao carregar dados
                            </p>

                            <p className="text-xs text-[#BDBDBD]">
                                {erro}
                            </p>

                        </div>

                    ) : (

                        <div className="overflow-x-auto">

                            <table className="w-full text-sm">

                                <thead>

                                    <tr className="bg-[#FAFAFA] border-b border-[#EBEBEB]">

                                        <th className="px-6 py-4 text-left text-xs font-space font-semibold text-[#9494A8] uppercase tracking-widest">
                                            Lead
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-space font-semibold text-[#9494A8] uppercase tracking-widest">
                                            Funcionário
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-space font-semibold text-[#9494A8] uppercase tracking-widest">
                                            Evento
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-space font-semibold text-[#9494A8] uppercase tracking-widest">
                                            Descrição
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-space font-semibold text-[#9494A8] uppercase tracking-widest">
                                            Data / Hora
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {loading ? (

                                        [...Array(6)].map((_, i) => (

                                            <tr
                                                key={i}
                                                className="border-b border-[#EBEBEB]"
                                            >

                                                {[...Array(5)].map((_, index) => (

                                                    <td
                                                        key={index}
                                                        className="px-6 py-4"
                                                    >

                                                        <div className="h-4 rounded-full bg-[#EBEBEB] animate-pulse w-[80%]" />

                                                    </td>
                                                ))}
                                            </tr>
                                        ))

                                    ) : historico.length === 0 ? (

                                        <tr>

                                            <td
                                                colSpan={5}
                                                className="text-center py-20 text-[#BDBDBD] text-sm"
                                            >
                                                Nenhum registro encontrado.
                                            </td>

                                        </tr>

                                    ) : (

                                        historico.map((item) => {

                                            const cor = tipoEventoCor[item.tipoEvento] || {
                                                bg: "#F5F5F5",
                                                text: "#616161",
                                                dot: "#9E9E9E",
                                            };

                                            return (

                                                <tr
                                                    key={item.id}
                                                    className="border-b border-[#F0F0F0] hover:bg-[#FAFBFF] transition-colors"
                                                >

                                                    <td className="px-6 py-4">

                                                        <div className="flex items-center gap-3">

                                                            <div className="w-8 h-8 rounded-full bg-[#24ade8c4] flex items-center justify-center text-[#ffffff] font-bold text-xs">

                                                                {item.leadNome
                                                                    ?.charAt(0)
                                                                    ?.toUpperCase() || "?"}

                                                            </div>

                                                            <div>

                                                                <p className="font-semibold text-[#1A1A2E]">
                                                                    {item.leadNome || "—"}
                                                                </p>

                                                            </div>
                                                        </div>
                                                    </td>

                                                    <td className="px-6 py-4">

                                                        <span className="text-[#3D3D55] font-medium">
                                                            {item.funcionarioNome || "—"}
                                                        </span>

                                                    </td>

                                                    <td className="px-6 py-4">

                                                        <span
                                                            style={{
                                                                backgroundColor: cor.bg,
                                                                color: cor.text
                                                            }}
                                                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide"
                                                        >

                                                            <span
                                                                style={{
                                                                    backgroundColor: cor.dot
                                                                }}
                                                                className="w-1.5 h-1.5 rounded-full"
                                                            />

                                                            {
                                                                (tipoEventoLabel[item.tipoEvento] || item.tipoEvento)
                                                                    .charAt(0)
                                                                    .toUpperCase() +
                                                                (tipoEventoLabel[item.tipoEvento] || item.tipoEvento)
                                                                    .slice(1)
                                                                    .toLowerCase()
                                                            }

                                                        </span>

                                                    </td>

                                                    <td className="px-6 py-4 max-w-[280px]">

                                                        <p
                                                            className="text-[#5C5C72] leading-snug line-clamp-2"
                                                            title={item.descricao}
                                                        >
                                                            {item.descricao || "—"}
                                                        </p>

                                                    </td>

                                                    <td className="px-6 py-4 whitespace-nowrap">

                                                        <span className="text-[#8A8A9A] font-space text-xs">
                                                            {formatarData(item.dataHora)}
                                                        </span>

                                                    </td>

                                                </tr>
                                            );
                                        })
                                    )}

                                </tbody>

                            </table>

                        </div>
                    )}
                </div>
            </div>
        </CallCenterLayout>
    );
};

export default Historico;