import iconLeadsWhite from "../assets/iconLeadsWhite.svg"
import iconPlus from "../assets/iconplus.svg"
import iconAgendaWhite from "../assets/iconAgendaWhite.svg"
import iconCadastroWhite from "../assets/iconCadastroWhite.svg"
import iconUserProfile from "../assets/iconUserProfile.svg"
import iconNotificationNone from "../assets/iconNotificationNone.svg"
import iconLogout from "../assets/iconLogout.svg"
import { useAuth } from "../contexts/AuthContext"
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import OutsideClickHandler from "react-outside-click-handler";
import Swal from 'sweetalert2'
import ModalSair from "./ModalSair";
import ModalNotificacoes from "./ModalNotificacoes"

const HeaderCallCenter = ({ toggleSidebar, isSidebarOpen }) => {
    const { user, logout, getCurrentUser } = useAuth();
    const [currentUser, setCurrentUser] = useState(null)
    const navigate = useNavigate();
    const [clickUserProfile, setClickUserProfile] = useState(false);
    const [modalSair, setModalSair] = useState(false);
    const [modalNotificacoes, setModalNotificacoes] = useState(false);

    const sair = () => {
        logout()
        navigate("/login", { replace: true })
    }

    const initials = currentUser?.nome
        ? currentUser.nome.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase()
        : "?";

    useEffect(() => {
        const loadUser = async () => {
            const user = await getCurrentUser()
            setCurrentUser(user)
        }
        loadUser()
    }, [getCurrentUser])

    return (
        <header className="absolute top-0 left-0 w-full h-28 bg-[#24ADE8] shadow-md z-10 ">
            <div className={`mt-8 gap-5 flex items-center transition-all duration-300 ${isSidebarOpen ? 'ml-[300px]' : 'ml-8'}`}>
                <button
                    onClick={toggleSidebar}
                    className="text-white hover:bg-[#ffffff20] p-2 rounded-md transition-colors"
                >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <div className="flex gap-6 flex-1 text-white font-lexend text-md 2xl:text-lg">
                    <div className="w-full max-w-xs border border-white flex justify-between rounded-md pl-3 py-3 px-2 z-20 group hover:bg-[#ffffff0e] transition-colors duration-200" onClick={()=> navigate("/callcenter/leads")}>
                        <div className="flex items-center gap-4 ">
                            <img src={iconLeadsWhite} alt="Icone Leads" className="w-[1.8rem]" />
                            <p className="cursor-default">Novo Lead</p>
                        </div>
                        <img src={iconPlus} alt="Icone Adicionar" className="w-[1.5rem] transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-90" />
                    </div>

                    <div className="w-full max-w-xs border border-white flex justify-between rounded-md pl-3 py-3 px-2 z-20 group hover:bg-[#ffffff0e] transition-colors duration-200" onClick={()=> navigate("/callcenter/agenda/novo-agendamento")}>
                        <div className="flex items-center gap-4 ">
                            <img src={iconAgendaWhite} alt="Icone Agenda" className="w-[1.8rem]" />
                            <p className="cursor-default">Novo Agendamento</p>
                        </div>
                        <img src={iconPlus} alt="Icone Adicionar" className="w-[1.5rem] transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-90" />
                    </div>

                    <div className="w-full max-w-xs border border-white flex justify-between rounded-md pl-3 py-3 px-2 z-20 group hover:bg-[#ffffff0e] transition-colors duration-200" onClick={()=> navigate("/callcenter/cadastro/novo")}>
                        <div className="flex items-center gap-4 ">
                            <img src={iconCadastroWhite} alt="Icone Cadastro" className="w-[1.8rem]" />
                            <p className="cursor-default">Novo Cadastro</p>
                        </div>
                        <img src={iconPlus} alt="Icone Adicionar" className="w-[1.5rem] transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:rotate-90" />
                    </div>
                </div>

                <div className="mr-10 flex gap-4 items-baseline z-20">
                    <OutsideClickHandler onOutsideClick={() => setClickUserProfile(false)}>
                        <div className="relative">
                            <button onClick={() => setClickUserProfile(prev => !prev)}>
                                <div className="flex items-center gap-1">
                                    <img src={iconUserProfile} alt="Icone Perfil Funcionario" />
                                    <p className="text-white font-lexend ">{user?.nome.split(" ")[0]}</p>
                                </div>
                            </button>

                            <div
                                className={`absolute z-10 left-4 mt-1 w-56 font-lexend bg-white border border-gray-100 rounded-xl overflow-hidden shadow-lg transition-all duration-200 ease-in-out ${clickUserProfile
                                    ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                                    : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                                    }`}
                            >

                                <div className="flex items-center gap-2.5 px-3.5 py-3 border-b border-gray-100">
                                    <div className="w-9 h-9 rounded-full bg-[#24ADE8] flex items-center justify-center text-white text-sm font-medium shrink-0">
                                        {initials}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-medium text-gray-800 truncate">{currentUser?.nome}</p>
                                        <p className="text-xs text-gray-400">Online</p>
                                    </div>
                                </div>


                                <div className="px-3.5 py-2">
                                    <div className="py-2 border-b border-gray-50">
                                        <p className="text-[11px] text-gray-400 mb-0.5">Email</p>
                                        <p className="text-[13px] font-medium text-gray-700 truncate">{currentUser?.email}</p>
                                    </div>
                                    <div className="py-2">
                                        <p className="text-[11px] text-gray-400 mb-0.5">Setor</p>
                                        <p className="text-[13px] font-medium text-gray-700">{currentUser?.setor
                                            ?.toLowerCase()
                                            ?.replace(/_/g, " ")
                                            ?.replace(/\b\w/g, (letra) => letra.toUpperCase())}</p>
                                    </div>
                                </div>


                                <div className="px-3.5 pb-3">
                                    <button className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg border border-gray-100 text-xs text-gray-400 hover:bg-gray-50 transition" onClick={() => setModalSair(true)} >
                                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                                            <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10 11l3-3-3-3M13 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        Sair
                                    </button>
                                </div>
                            </div>
                        </div>
                    </OutsideClickHandler>

                    <div className=" h-9 w-[1px] bg-[#ffffff]" />

                    <div className="flex gap-2">
                        <OutsideClickHandler onOutsideClick={() => setModalNotificacoes(false)}>
                            <button onClick={() => setModalNotificacoes(true)} className="mt-2">
                                <img src={iconNotificationNone} alt="Icone Notificacao" />
                            </button>
                            {modalNotificacoes && (
                                <ModalNotificacoes onClose={() => setModalNotificacoes(false)} />
                            )}

                        </OutsideClickHandler>


                        <button onClick={() => setModalSair(true)} >

                            <img src={iconLogout} alt="Logout" />
                        </button>
                    </div>

                    {modalSair && (
                        <ModalSair
                            currentUser={currentUser}
                            onClose={() => setModalSair(false)}
                            onConfirm={() => { setModalSair(false); sair(); }}
                        />
                    )}



                </div>
            </div>
        </header >
    )
}

export default HeaderCallCenter;
