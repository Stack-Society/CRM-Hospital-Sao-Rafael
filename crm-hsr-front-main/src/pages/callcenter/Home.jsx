import { useState, useEffect } from "react";
import CallCenterLayout from "../../components/CallCenterLayout.jsx";
import iconLeadsGray from "../../assets/iconLeadsGray.svg"
import iconSeta from "../../assets/iconSeta.svg"
import iconAgendaGray from "../../assets/iconAgendaGray.svg"
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";


const Home = () => {
    const navigate = useNavigate()
    const [countLeadsHoje, setCountLeadsHoje] = useState(0);
    const [countLeadsAtivos, setCountLeadsAtivos] = useState(0);

    useEffect(() => {

        const fetchCountLeadsHoje = async () => {
            try {
                const response = await api.get("/api/leads/hoje/count")
                setCountLeadsHoje(response.data)
            } catch (error) {
                console.error(error)
            }
        }

        const fetchCountLeadsAtivos = async () => {
            try {
                const response = await api.get("/api/leads/ativos/count")
                setCountLeadsAtivos(response.data)
            } catch (error) {
                console.error(error)
            }
        }

        fetchCountLeadsHoje();
        fetchCountLeadsAtivos();


    }, []);



    return (
        <CallCenterLayout>
            <div className="flex justify-between items-center mb-6 bg-white w-full mt-10 p-4 shadow-lg  rounded-md">
                <div>
                    <p className="text-xs text-gray-400 font-lexend">Call Center / Dashboard</p>
                    <p className="text-2xl font-medium font-lexend text-gray-900">Dashboard</p>
                </div>

            </div>
            <div className="grid grid-cols-6 gap-6 mt-10 w-full mr-10 mb-4">


                <div className="col-span-2 bg-white rounded-lg h-[350px] w-full flex flex-col shadow-xl">
                    <div className="flex justify-between items-start pt-3 px-4 font-space">
                        <p className="text-[#00A1E6]  font-medium xl:text-[1.4rem] text-xl ">Leads novos hoje</p>
                        <img src={iconLeadsGray} alt="Icone Leads" className="w-9" />
                    </div>

                    <div className="flex-1 flex flex-col justify-center items-center">
                        <p className="font-space text-[#00A1E6] text-[2.5rem] font-bold rounded-full border border-[#B9B9B9] flex items-center justify-center w-36 h-36 shadow-sm">{countLeadsHoje}</p>
                        <p className="mt-2 font-space text-[#AAA9A9] font-bold ">Leads cadastrados hoje</p>
                    </div>

                    <div className=" flex justify-end items-end mr-2 mb-2">
                        <button onClick={() => navigate("/callcenter/leads")}>
                            <div className="bg-[#00A1E6] hover:bg-[#00a1e6de] transition-colors duration-300 p-2 w-auto rounded-xl flex gap-2">
                                <p className="ml-1 text-white font-space font-semibold text-[16px]">Ver detalhes</p>
                                <img src={iconSeta} alt="Icone Seta" className="w-[24px]" />
                            </div>
                        </button>
                    </div>
                </div>

                <div className="col-span-2 bg-white rounded-lg h-[350px] w-full flex flex-col shadow-xl">
                    <div className="flex justify-between items-start pt-3 px-4 font-space">
                        <p className="text-[#00A1E6] xl:text-[1.4rem] text-xl font-medium">Leads ativos</p>
                        <img src={iconLeadsGray} alt="Icone Leads" className="w-9" />
                    </div>

                    <div className="flex-1 flex flex-col justify-center items-center">
                        <p className="font-space text-[#00A1E6] text-[2.5rem] font-bold rounded-full border border-[#B9B9B9] flex items-center justify-center w-36 h-36 shadow-sm">{countLeadsAtivos}</p>
                        <p className="mt-2 font-space text-[#AAA9A9] font-bold">Seus leads ativos</p>
                    </div>

                    <div className=" flex justify-end items-end mr-2 mb-2">
                        <button onClick={() => navigate("/callcenter/leads")}>
                            <div className="bg-[#00A1E6] hover:bg-[#00a1e6de] transition-colors duration-300 p-2 w-auto rounded-xl flex gap-2">
                                <p className="ml-1 text-white font-space font-semibold text-[16px]">Ver detalhes</p>
                                <img src={iconSeta} alt="Icone Seta" className="w-[24px]" />
                            </div>
                        </button>
                    </div>
                </div>

                <div className="col-span-2 bg-white rounded-lg h-[350px] w-full flex flex-col shadow-xl">
                    <div className="flex justify-between items-start pt-3 px-4 font-space ">
                        <p className="text-[#00A1E6] xl:text-[1.4rem] text-xl font-medium max-w-[80%]">Consultas agendadas hoje</p>
                        <img src={iconAgendaGray} alt="Icone Leads" className="w-9 shrink-0" />
                    </div>

                    <div className="flex-1 flex flex-col justify-center items-center">
                        <p className="font-space text-[#00A1E6] text-[2.5rem] font-bold rounded-full border border-[#B9B9B9] flex items-center justify-center w-36 h-36 shadow-sm">3</p>
                        <p className="mt-2 font-space text-[#AAA9A9] font-bold w-full text-center max-w-[70%]">Consultas agendadas por você hoje</p>
                    </div>

                    <div className=" flex justify-end items-end mr-2 mb-2">
                        <button onClick={() => navigate("/callcenter/agenda")}>
                            <div className="bg-[#00A1E6] hover:bg-[#00a1e6de] transition-colors duration-300 p-2 w-auto rounded-xl flex gap-2">
                                <p className="ml-1 text-white font-space font-semibold text-[16px]">Ver detalhes</p>
                                <img src={iconSeta} alt="Icone Seta" className="w-[24px]" />
                            </div>
                        </button>
                    </div>
                </div>

                <div className="col-span-3  bg-white rounded-lg h-[350px] w-full flex flex-col shadow-xl">
                    <div className="flex justify-between items-start pt-3 px-4 font-space">
                        <p className="text-[#00A1E6] xl:text-[1.4rem] text-xl font-medium max-w-[70%]">Consultas pendentes de confirmação</p>
                        <img src={iconAgendaGray} alt="Icone Leads" className="w-9" />
                    </div>

                    <div className="flex-1 flex flex-col justify-center items-center">
                        <p className="font-space text-[#00A1E6] text-[2.5rem] font-bold rounded-full border border-[#B9B9B9] flex items-center justify-center w-36 h-36 shadow-sm">2</p>
                        <p className="mt-2 font-space text-[#AAA9A9] font-bold w-full text-center">Consultas que você precisa confirmar</p>
                    </div>

                    <div className=" flex justify-end items-end mr-2 mb-2">
                        <button onClick={() => navigate("/callcenter/agenda")}>
                            <div className="bg-[#00A1E6] hover:bg-[#00a1e6de] transition-colors duration-300 p-2 w-auto rounded-xl flex gap-2">
                                <p className="ml-1 text-white font-space font-semibold text-[16px]">Ver detalhes</p>
                                <img src={iconSeta} alt="Icone Seta" className="w-[24px]" />
                            </div>
                        </button>
                    </div>
                </div>

                <div className="col-span-3  bg-white rounded-lg h-[350px] w-full flex flex-col shadow-xl">
                    <div className="flex justify-between items-start pt-3 px-4 font-space">
                        <p className="text-[#00A1E6] xl:text-[1.4rem] text-xl font-medium w-full text-start max-w-[70%]">Total de contatos feitos hoje</p>
                        <img src={iconLeadsGray} alt="Icone Leads" className="w-9" />
                    </div>

                    <div className="flex-1 flex flex-col justify-center items-center ">
                        <p className="font-space text-[#00A1E6] text-[2.5rem] font-bold rounded-full border border-[#B9B9B9] flex items-center justify-center w-36 h-36 shadow-sm">15</p>
                        <p className="mt-2 font-space text-[#AAA9A9] font-bold w-full text-center">Contatos que você fez hoje</p>
                    </div>

                    <div className=" flex justify-end items-end mr-2 mb-2">
                        <button onClick={() => navigate("/callcenter/leads")}>
                            <div className="bg-[#00A1E6] hover:bg-[#00a1e6de] transition-colors duration-300 p-2 w-auto rounded-xl flex gap-2">
                                <p className="ml-1 text-white font-space font-semibold text-[16px]">Ver detalhes</p>
                                <img src={iconSeta} alt="Icone Seta" className="w-[24px]" />
                            </div>
                        </button>
                    </div>
                </div>

            </div>
        </CallCenterLayout>
    )
}

export default Home;
