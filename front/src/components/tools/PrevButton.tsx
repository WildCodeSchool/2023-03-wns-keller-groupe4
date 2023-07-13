// Some usefull components which can be reusable
import { useNavigate } from "react-router-dom";

export const PrevButton = () => {
    const navigate = useNavigate();
    return (
        <button className="bg-gray-500 hover:bg-orange-500 text-white font-bold py-2 px-4 mb-5 rounded"
            onClick={() => navigate(-1)}
        >
            Retour
        </button>
    )
};