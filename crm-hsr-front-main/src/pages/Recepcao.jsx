import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Recepcao() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <section className="max-w-lg w-full bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
        <h1 className="text-2xl font-semibold text-gray-900">Área da recepção</h1>
        <p className="mt-3 text-sm text-gray-500">
          Este módulo ainda está em desenvolvimento. O acesso foi reconhecido corretamente.
        </p>
        <button
          type="button"
          onClick={handleLogout}
          className="mt-6 px-5 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
        >
          Sair
        </button>
      </section>
    </main>
  );
}
