import AdminLayout from "../../components/AdminLayout.jsx";
import FormularioFuncionario from "../../components/FormularioFuncionario.jsx";


const CadastroFuncionario = () => {
    return (
        <AdminLayout>
            <div className="flex justify-between items-center mb-6 bg-white w-full mt-10 p-4 shadow-lg  rounded-md">
                <div>
                    <p className="text-xs text-gray-400 font-lexend">Admin / Cadastro de Funcionário</p>
                    <p className="text-2xl font-medium font-lexend text-gray-900">Cadastro de Funcionário</p>
                </div>

            </div>
            <FormularioFuncionario/>

        </AdminLayout>
    )
}

export default CadastroFuncionario;
