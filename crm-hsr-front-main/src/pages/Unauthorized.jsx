import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Unauthorized() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const returnToLogin = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <section className="max-w-md w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">Acesso não autorizado</h1>
        <p className="mt-3 text-sm text-gray-500">
          Seu perfil não possui permissão para acessar esta página.
        </p>
        <button
          type="button"
          onClick={returnToLogin}
          className="mt-6 px-5 py-2 rounded-lg bg-[#24ADE8] text-white hover:bg-[#1a9fd6]"
        >
          Voltar ao login
        </button>
      </section>
    </main>
  );
}
