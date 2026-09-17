import Logo from "../assets/logo.svg";
import iconHome from "../assets/iconHome.svg";
import iconHomeWhite from "../assets/iconHomeWhite.svg";
import iconLeads from "../assets/iconLeads.svg";
import iconLeadsWhite from "../assets/iconLeadsWhite.svg";
import iconAgenda from "../assets/iconAgenda.svg";
import iconAgendaWhite from "../assets/iconAgendaWhite.svg";
import iconHistorico from "../assets/iconHistorico.svg";
import iconHistoricoWhite from "../assets/iconHistoricoWhite.svg";
import iconCadastro from "../assets/iconCadastro.svg";
import iconCadastroWhite from "../assets/iconCadastroWhite.svg";
import { NavLink } from "react-router-dom";

const AsideCallCenter = ({ isOpen }) => {
    return (
        <aside className={`bg-white w-64 fixed left-0 top-0 h-screen rounded-r-xl overflow-hidden shadow-[9px_6px_19.6px_0px_rgba(0,0,0,0.25)] z-40 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <div className="flex justify-center pt-10">
                <img src={Logo} alt="Logo" className="w-[5.4rem] " />
            </div>

            <nav className="flex flex-col mt-14 gap-3 ml-2 ">
                <div>
                    <NavLink to="/callcenter/home" className={({ isActive }) => `flex p-4 gap-3 items-baseline transition-all ${isActive ? "shadow-md ml-3 rounded-r-none rounded-md bg-[#24ADE8] text-white " : " text-[#00A1E6] bg-white"}`}>
                        {({ isActive }) => (
                            <>
                                <img src={isActive ? iconHomeWhite : iconHome} alt="Icone Home" className="w-[1.6rem] translate-y-[5px]" />
                                <p className="font-lexend text-[18px]">Dashboard</p>
                            </>
                        )}
                    </NavLink>
                    <div className="ml-4 w-full h-[2px] bg-[rgba(238,238,238,0.54)]" />
                </div>

                <div>
                    <NavLink to="/callcenter/leads" className={({ isActive }) => `flex p-4 gap-3 items-baseline transition-all ${isActive ? "shadow-md ml-3 rounded-r-none rounded-md bg-[#24ADE8] text-white " : " text-[#00A1E6] bg-white"}`}>
                        {({ isActive }) => (
                            <>
                                <img src={isActive ? iconLeadsWhite : iconLeads} alt="Icone Leads" className="w-[1.6rem] translate-y-[5px]" />
                                <p className="font-lexend text-[18px]">Leads</p>
                            </>
                        )}
                    </NavLink>
                    <div className="ml-4 w-full h-[2px] bg-[rgba(238,238,238,0.61)]" />
                </div>

                <div>
                    <NavLink to="/callcenter/agenda" className={({ isActive }) => `flex p-4 gap-3 items-baseline transition-all ${isActive ? "shadow-md ml-3 rounded-r-none rounded-md bg-[#24ADE8] text-white " : " text-[#00A1E6] bg-white"}`}>
                        {({ isActive }) => (
                            <>
                                <img src={isActive ? iconAgendaWhite : iconAgenda} alt="Icone Agenda" className="w-[1.6rem] translate-y-[5px]" />
                                <p className="font-lexend text-[18px]">Agenda</p>
                            </>
                        )}
                    </NavLink>
                    <div className="ml-4 w-full h-[2px] bg-[rgba(238,238,238,0.61)]" />
                </div>



                <div>
                    <NavLink to="/callcenter/cadastro" className={({ isActive }) => `flex p-4 gap-3 items-baseline transition-all ${isActive ? "shadow-md ml-3 rounded-r-none rounded-md bg-[#24ADE8] text-white " : " text-[#00A1E6] bg-white"}`}>
                        {({ isActive }) => (
                            <>
                                <img src={isActive ? iconCadastroWhite : iconCadastro} alt="Icone Cadastro" className="w-[1.6rem] translate-y-[5px]" />
                                <p className="font-lexend text-[18px]">Cadastro</p>
                            </>
                        )}
                    </NavLink>
                    <div className="ml-4 w-full h-[2px] bg-[rgba(238,238,238,0.61)]" />
                </div>

                <div>
                    <NavLink to="/callcenter/historico" className={({ isActive }) => `flex p-4 gap-3 items-baseline transition-all ${isActive ? "shadow-md ml-3 rounded-r-none rounded-md bg-[#24ADE8] text-white " : " text-[#00A1E6] bg-white"}`}>
                        {({ isActive }) => (
                            <>
                                <img src={isActive ? iconHistoricoWhite : iconHistorico} alt="Icone Historico" className="w-[1.6rem] translate-y-[5px]" />
                                <p className="font-lexend text-[18px]">Histórico</p>
                            </>
                        )}
                    </NavLink>
                    <div className="ml-4 w-full h-[2px] bg-[rgba(238,238,238,0.61)]" />
                </div>
                
            </nav>
        </aside>
    );
};

export default AsideCallCenter;
