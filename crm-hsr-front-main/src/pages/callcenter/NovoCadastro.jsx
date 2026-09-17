import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CallCenterLayout from "../../components/CallCenterLayout.jsx";
import iconSetaEsquerda from "../../assets/IconSetaEsquerda.svg";
import { api } from "../../services/api.js";
import ModalSucesso from "../../components/ModalSucesso.jsx";

const NovoCadastro = () => {

    const navigate = useNavigate();

    const [modalSucesso, setModalSucesso] = useState(false)

    const [formulario, setFormulario] = useState({
        nome: "",
        telefone: "",
        email: "",
        procedimentoInteresse: "",
        origem: null,
        preferenciaMedico: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (campo, valor) => {

        setFormulario((prev) => ({
            ...prev,
            [campo]: valor
        }));
    };

    const salvarCadastro = async (e) => {

        e.preventDefault();

        try {

            setLoading(true);

            await api.post("/api/leads", formulario);

            setModalSucesso(true)

            setFormulario({
                nome: "",
                telefone: "",
                email: "",
                procedimentoInteresse: "",
                origem: null,
                preferenciaMedico: ""
            })


        } catch (error) {

            console.error(error);

            alert("Erro ao cadastrar lead.");

        } finally {

            setLoading(false);
        }
    };

    return (
        <CallCenterLayout>

            <div className="flex flex-col w-full mr-10 mt-8 font-space">

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
                            Call Center / Cadastro
                        </p>

                        <p className="text-lg font-medium font-lexend text-gray-800">
                            Novo Cadastro
                        </p>

                    </div>
                </div>

                <form
                    onSubmit={salvarCadastro}
                    className="bg-white rounded-xl shadow-lg p-8 flex flex-col gap-8"
                >

                    <div>

                        <p className="text-[#00A1E6] text-2xl font-bold">
                            Informações do paciente
                        </p>

                        <p className="text-[#A1A1A1] font-medium mt-1">
                            Preencha os dados abaixo para realizar o cadastro.
                        </p>

                    </div>

                    <div className="grid grid-cols-2 gap-5">

                        <div className="flex flex-col gap-2">

                            <label className="text-[#A1A1A1] font-semibold">
                                Nome completo
                            </label>

                            <input
                                type="text"
                                required
                                value={formulario.nome}
                                onChange={(e) =>
                                    handleChange("nome", e.target.value)
                                }
                                placeholder="Digite o nome completo"
                                className="bg-[#F4F4F4] rounded-xl px-4 py-4 outline-none border border-transparent focus:border-[#00A1E6]"
                            />
                        </div>

                        <div className="flex flex-col gap-2">

                            <label className="text-[#A1A1A1] font-semibold">
                                Telefone
                            </label>

                            <input
                                type="text"
                                required
                                value={formulario.telefone}
                                onChange={(e) =>
                                    handleChange("telefone", e.target.value)
                                }
                                placeholder="(11) 99999-9999"
                                className="bg-[#F4F4F4] rounded-xl px-4 py-4 outline-none border border-transparent focus:border-[#00A1E6]"
                            />
                        </div>

                        <div className="flex flex-col gap-2">

                            <label className="text-[#A1A1A1] font-semibold">
                                E-mail
                            </label>

                            <input
                                type="email"
                                required
                                value={formulario.email}
                                onChange={(e) =>
                                    handleChange("email", e.target.value)
                                }
                                placeholder="email@exemplo.com"
                                className="bg-[#F4F4F4] rounded-xl px-4 py-4 outline-none border border-transparent focus:border-[#00A1E6]"
                            />
                        </div>

                        <div className="flex flex-col gap-2">

                            <label className="text-[#A1A1A1] font-semibold">
                                Procedimento de interesse
                            </label>

                            <input
                                type="text"
                                required
                                value={formulario.procedimentoInteresse}
                                onChange={(e) =>
                                    handleChange("procedimentoInteresse", e.target.value)
                                }
                                placeholder="Ex: Rinoplastia"
                                className="bg-[#F4F4F4] rounded-xl px-4 py-4 outline-none border border-transparent focus:border-[#00A1E6]"
                            />
                        </div>

                        <div className="flex flex-col gap-2">

                            <label className="text-[#A1A1A1] font-semibold">
                                Preferência por médico
                            </label>

                            <input
                                type="text"
                                required
                                value={formulario.preferenciaMedico}
                                onChange={(e) =>
                                    handleChange("preferenciaMedico", e.target.value)
                                }
                                placeholder="Ex: Carlos Augusto"
                                className="bg-[#F4F4F4] rounded-xl px-4 py-4 outline-none border border-transparent focus:border-[#00A1E6]"
                            />
                        </div>

                    </div>

                    <div className="flex justify-end gap-4">

                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="bg-[#F4F4F4] hover:bg-[#e9e9e9] transition-all duration-300 px-6 py-4 rounded-xl text-[#5A5A5A] font-bold"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-[#00A1E6] hover:bg-[#00a1e6de] transition-all duration-300 px-8 py-4 rounded-xl text-white font-bold shadow-md disabled:opacity-50"
                        >
                            {loading ? "Salvando..." : "Salvar cadastro"}
                        </button>
                    </div>
                </form>
            </div>

            {modalSucesso && (<ModalSucesso mensagem={"Alterações feitas com sucesso!"} titulo={"Sucesso!"} onClose={() => setModalSucesso(false)} />)}
        </CallCenterLayout>
    );
};

export default NovoCadastro;