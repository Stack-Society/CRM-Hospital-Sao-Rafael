import FundoLogin from "../assets/fundo-login2.png"
import Logo from "../assets/logo.svg"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { authApi } from "../services/authApi";

const Login = () => {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErro("");

        try {
            const response = await authApi.post("/auth/login", {
                email,
                senha
            });

            login(response.data); 

            if (response.data.setor === "ADMIN") {
                navigate("/admin/cadastroFuncionario");
            } else if (response.data.setor === "CALL_CENTER") {
                navigate("/callcenter/home", { state: { fromLogin: true } });
            } else {
                navigate("/recepcao");
            }

        } catch {
            setErro("Usuário ou senha inválidos");
        } finally {
            setLoading(false);
        }
    };

    



    return (

        <div className="min-h-screen flex">
            <div className="w-1/2">
                <img src={FundoLogin} alt="Fundo do login" className="h-full w-full object-cover"/>
            </div>

            <div className="w-1/2 bg-[#F4F4F4] flex flex-col gap-10 shadow-[-43px_0px_26.5px_0px_rgba(0,0,0,0.25)]">


                <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="pb-28 pt-4">
                        <img src={Logo} alt="Logo" className="w-[9rem] " />
                    </div> 
                    <form onSubmit={handleSubmit} className="bg-[rgba(0,161,230,0.85)] w-full max-w-sm md:max-w-md 2xl:max-w-lg mb-8  rounded-3xl px-6  pb-10 pt-7 shadow-2xl flex flex-col  ">

                        <h1 className="font-lexend text-white text-3xl text-center mb-5 mt-4">Login</h1>

                        <div className="flex flex-col items-start w-full gap-12 px-5">
                            <div className="w-full">
                                <p className="font-lexend text-white text-[20px] mb-2">Email</p>
                                <input value={email} onChange={(e) => setEmail(e.target.value)}     type="email" name="email" autoComplete="email" placeholder="Digite seu email..." className=" placeholder:font-konkhmer placeholder:text-[#b8b8b8c5] text-[16px] w-full py-6 px-3 rounded-lg font-lexend font-thin outline-none border-none appearance-none focus:outline-none focus:ring-0"/>
                            </div>

                            <div className="w-full">
                                <p className="font-lexend text-white text-[20px] mb-2">Senha</p>
                                <input type="password" value={senha} name="password" autoComplete="current-password" onChange={(e)=> setSenha(e.target.value)} placeholder="Digite sua senha..." className="w-full font-konkhmer placeholder:text-[#b8b8b8c5] text-black text-[16px] py-6 px-3 rounded-lg outline-none border-none appearance-none focus:outline-none focus:ring-0 "/>
                            </div> 

                        {erro &&
                                <div className="w-full flex items-start justify-between gap-4 border border-red-500 bg-red-50 rounded-lg px-4 py-3">
                                    
                                    <p className="text-red-700 text-sm">
                                    {erro}
                                    </p>

                                    <button
                                    type="button"
                                    onClick={() => setErro("")}
                                    className="text-red-700 font-bold hover:text-red-900"
                                    aria-label="Fechar mensagem de erro"
                                    >
                                    ✕
                                    </button>

                                </div>
                            }              
                        </div>

                        <div className="flex justify-center mt-8">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-10 py-3 rounded-xl bg-white text-[rgba(0,161,230,0.85)] shadow-lg font-lexend text-lg 2xl:text-xl hover:bg-slate-50 flex items-center justify-center min-w-[140px] "
                            >
                                {loading ? (
                                    <div className="w-6 h-6 border-4 border-[rgba(0,161,230,0.85)] border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    "Entrar"
                                )}
                            </button>
                        </div>

                    </form>                    
                </div>               

                
            </div>
        </div>
    )
}

export default Login;
