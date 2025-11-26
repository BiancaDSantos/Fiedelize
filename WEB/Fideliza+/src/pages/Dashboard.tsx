import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import contaFidelidadeService from "../services/ContaFidelidadeService";
import SideBar from "../components/SideBar/SideBar";

function Dashboard() {

    const navigate = useNavigate();
    const dispath = useDispatch();

    useEffect(() => {
        contaFidelidadeService.listarContasFidelidade()
            .then((response) => {
                console.log("Contas de Fidelidade:", response.data);
            })
            .catch((error) => {
                console.error("Erro ao listar contas de fidelidade:", error);
            });
    }, []);

    
    return (
        <div className="d-flex flex-nowrap">
            <SideBar />
            <div className="container">
                <h2>Painel Administrador</h2>
                <p>Bem-vindo ao painel administrador!</p>
            </div>
        </div>
    )
}

export default Dashboard;