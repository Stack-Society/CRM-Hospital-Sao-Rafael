import { useNavigate } from "react-router-dom";

const CardLeads = ({ lead }) => {

    const navigate = useNavigate();
    return (
        <div className="bg-white rounded-md shadow-md p-4 flex justify-between flex-col gap-3" key={lead.id}>
            <div className="flex flex-col gap-1">
                <p className="text-sm">
                    <span className="font-bold">Nome: </span>
                    {lead.nome.split(" ").slice(0, 2).join(" ")}
                </p>

                <p className="text-sm">
                    <span className="font-bold">Numero: </span>
                    {lead.telefone}
                </p>

                <p className="text-sm">
                    <span className="font-bold">ID: </span>
                    {lead.id}
                </p>

            </div>

            <button 
                onClick={() => navigate(`/callcenter/leads/${lead.id}`)}
                className="text-sm font-lexend font-normal bg-[#00A1E6] p-2 rounded-lg text-white hover:bg-[#00a1e6de]"
            >
                Ver Detalhes
            </button>

        </div>
    )
}

export default CardLeads