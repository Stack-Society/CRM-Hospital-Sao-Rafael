import { useParams, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { useState, useEffect } from "react";
import { api } from "../../services/api";
import CallCenterLayout from "../../components/CallCenterLayout";
import iconSetaEsquerda from "../../assets/IconSetaEsquerda.svg";
import iconEncaminhar from "../../assets/IconEncaminhar.svg";
import iconAgenda from "../../assets/iconAgenda.svg";
import iconContato from "../../assets/iconContato.svg";
import iconWhatsapp from "../../assets/iconWhatsapp.svg";
import LeadSkeleton from "./LeadSkeleton";
import RegistroContato from "../../components/RegistroContato";
import ModalEncaminhar from "../../components/ModalEncaminhar";
import ModalSucesso from "../../components/ModalSucesso";



const LeadsDetalhes = () => {
    const { id } = useParams();
    const { getCurrentUser } = useAuth();
    const navigate = useNavigate();

    const [lead, setLead] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [modalTipo, setModalTipo] = useState(null);
    const [historicoLead, setHistoricoLead] = useState(null);
    const [modalEncaminhar, setModalEncaminhar] = useState(false)
    const [modalSucesso, setModalSucesso] = useState(false)

    useEffect(() => {
        const loadUser = async () => {
            const user = await getCurrentUser()
            setCurrentUser(user)
        }
        loadUser()
    }, [getCurrentUser])

    useEffect(() => {
        if (!currentUser || !currentUser.id) return;
        const fetchLead = async () => {
            try {
                const response = await api.get(`api/leads/funcionario/${currentUser?.id}/${id}`);
                setLead(response.data);
            } catch (error) {
                console.error("Erro ao buscar lead:", error);
            }
        };

        const fetchHistorico = async () => {
            try {
                const response = await api.get(`api/leads/historico/${id}`);

                setHistoricoLead(response.data);

            } catch (error) {
                console.error("Erro ao buscar histórico:", error);
            }
        };

        fetchLead();
        fetchHistorico();
    }, [id, currentUser]);

    if (!lead) {
        return <LeadSkeleton />;
    }

    const initials = lead?.nome
        ? lead.nome.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
        : "??";

    return (
        <CallCenterLayout>
            <div className=" px-4 py-6">

                <div className="flex items-center gap-3 mb-6">
                    <button onClick={() => navigate(-1)}>
                        <img src={iconSetaEsquerda} alt="Icon Seta Esquerda" className="w-12 hover:opacity-70" />
                    </button>
                    <div>
                        <p className="text-xs text-gray-400 font-lexend">Call Center / Leads</p>
                        <p className="text-lg font-medium font-lexend text-gray-800">Detalhes do Lead</p>
                    </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-xl p-5 mb-3 w-full">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="w-13 h-13 min-w-[52px] min-h-[52px] rounded-full bg-blue-50 flex items-center justify-center text-[#00A1E6] font-medium text-base">
                            {initials}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-base font-medium font-lexend text-gray-800">{lead?.nome}</span>
                                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-amber-50 text-amber-600">{lead.status.toLowerCase()}</span>
                            </div>
                            <p className="text-sm text-gray-400 font-lexend">{lead?.email}</p>
                            <p className="text-sm text-gray-400 font-lexend">ID: #{lead?.id}</p>
                        </div>
                        <div className="flex gap-1.5 flex-wrap justify-end">
                            <span className="text-xs px-2 py-0.5 rounded-full border border-gray-200 text-gray-400">
                                Criado em {new Date(lead?.dataCriacao).toLocaleDateString('pt-BR')}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {[
                            { icon: iconContato, label: "Registrar Ligação", onClick: () => setModalTipo("ligacao") },
                            { icon: iconWhatsapp, label: "Registar Whatsapp", onClick: () => setModalTipo("whatsapp") },
                            { icon: iconAgenda, label: "Agendar", onClick: () => navigate("/callcenter/agenda/novo-agendamento") },
                            { icon: iconEncaminhar, label: "Encaminhar", onClick: () => setModalEncaminhar(true) },
                        ].map(({ icon, label, onClick }) => (
                            <button
                                key={label}
                                className="flex flex-col items-center gap-1.5 flex-1 px-2 py-3 rounded-lg border border-gray-100 bg-white hover:bg-gray-50 transition text-xs text-gray-500 font-lexend"
                                onClick={onClick}
                            >
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm`}>
                                    <img src={icon} alt={icon} />
                                </div>
                                {label}
                            </button>
                        ))}

                        {modalEncaminhar && (
                            <ModalEncaminhar
                                lead={lead}
                                onClose={() => setModalEncaminhar(false)}
                                onEncaminhar={() => {
                                    api.patch(`/api/leads/${lead.id}/encaminhar`);
                                    setModalEncaminhar(false);
                                    setModalSucesso(true);
                                }}
                            />
                        )}

                        {modalSucesso && (
                            <ModalSucesso titulo={"Alterações salvas com sucesso!"}/>
                        )}
                        {modalTipo && (
                            <RegistroContato modalTipo={modalTipo} lead={lead} onClose={() => setModalTipo(null)}
                                onSalvar={async ({ resultadoContato, observacao }) => {
                                    try {
                                        await api.post("/api/contatos", {
                                            leadId: lead.id,
                                            tipoContato: modalTipo === "ligacao" ? "LIGACAO" : "WHATSAPP",
                                            resultadoContato,
                                            observacao
                                        });

                                        console.log("Contato registrado com sucesso");

                                        setModalTipo(null);
                                    } catch (error) {
                                        console.error("Erro ao registrar contato:", error);
                                    }
                                }} />
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2.5 mb-3">
                    {[
                        { label: "Origem", value: lead?.origem ? lead.origem.charAt(0).toUpperCase() + lead.origem.slice(1).toLowerCase() : '-' },
                        { label: "Procedimento de Interesse", value: lead?.procedimentoInteresse },
                        { label: "Último contato", value: lead?.dataUltimoContato ? new Date(lead.dataUltimoContato).toLocaleDateString('pt-BR') : '-' }
                    ].map(({ label, value }) => (
                        <div key={label} className="bg-gray-50 rounded-lg p-4">
                            <p className="text-xs text-gray-400 font-lexend mb-1">{label}</p>
                            <p className="text-lg font-medium text-gray-800 font-lexend">{value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-2.5">

                    <div className="bg-white border border-gray-100 rounded-xl p-5">
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3 font-lexend">
                            Informações
                        </p>
                        {[
                            { label: "Nome", value: lead?.nome },
                            { label: "Email", value: lead?.email },
                            {
                                label: "Telefone", value: lead?.telefone
                                    ? lead.telefone
                                        .replace(/\D/g, '')
                                        .replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
                                        .replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3')
                                    : '—'
                            },
                            { label: "Ativo", value: lead?.ativo != null ? (lead.ativo ? 'Sim' : 'Não') : '-' },
                            { label: "Status", value: lead?.status != null ? lead?.status.charAt(0).toUpperCase() + lead.status.slice(1).toLowerCase() : "—" },
                            { label: "Médico de preferência", value: lead?.preferenciaMedico ?? "-" },
                            { label: "ID", value: `#${lead?.id}` },
                        ].map(({ label, value }) => (
                            <div key={label} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-b-0">
                                <span className="text-xs text-gray-400 font-lexend">{label}</span>
                                <span
                                    className={"text-xs font-medium font-lexend text-gray-700"}
                                >
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white border border-gray-100 rounded-xl p-5">
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3 font-lexend">
                            Histórico
                        </p>
                        {historicoLead?.map((historico) => (
                            <div
                                key={historico.id}
                                className="flex gap-3 py-2.5 border-b border-gray-50 last:border-b-0"
                            >
                                <div
                                    className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${historico.tipoEvento === "CONTATO"
                                        ? "bg-blue-400"
                                        : historico.tipoEvento === "CRIACAO"
                                            ? "bg-green-400"
                                            : "bg-amber-400"
                                        }`}
                                />

                                <div>
                                    <p className="text-xs font-medium text-gray-700 font-lexend">
                                        {historico.tipoEvento.charAt(0) + historico.tipoEvento.slice(1).toLowerCase()}
                                    </p>

                                    <p className="text-xs text-gray-400 font-lexend">
                                        {new Date(historico.dataHora)
                                            .toLocaleString("pt-BR", {
                                                day: "2-digit",
                                                month: "short",
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })
                                            .replace(" de ", " ")
                                            .replace(".", "")
                                        }
                                    </p>
                                </div>
                            </div>
                        ))}


                    </div>

                </div>
            </div>
        </CallCenterLayout>

    )
}

export default LeadsDetalhes
