import { useEffect, useState } from "react";
import contaFidelidadeService from "../services/ContaFidelidadeService";
import SideBar from "../components/SideBar/SideBar";
import type { ClienteFidelidade } from "../types/ClienteFidelidade";

function Dashboard() {

    const [clientes, setClientes] = useState<ClienteFidelidade[]>([]);

    useEffect(() => {
        contaFidelidadeService.listarContasFidelidade()
            .then((response) => {
                console.log("Contas de Fidelidade:", response.data);
                setClientes(response.data);
            })
            .catch((error) => {
                console.error("Erro ao listar contas de fidelidade:", error);
            });
    }, []);


    
    return (
        <div className="d-flex row bg-light">
            <SideBar />
            <div className="container col-md-3 m-4 p-4">
                <h2>Painel Administrador</h2>
                <p>Bem-vindo ao painel administrador!</p>
            </div>
            <div className="card col-md-9 mt-4 p-4">
                <h3>Clientes cadastrados</h3>
                <ul>
                    {clientes.map((cliente) => (
                        <li key={cliente.id}>
                            {cliente.nome} - {cliente.email} - {cliente.cpf}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Dashboard;