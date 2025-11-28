import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import contaFidelidadeService from "../services/ContaFidelidadeService";
import type { ClienteFidelidade } from "../types/ClienteFidelidade";

function ConsultarClientes() {
  const [clientes, setClientes] = useState<ClienteFidelidade[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const load = () => {
    setLoading(true);
    contaFidelidadeService
      .listarContasFidelidade()
      .then((res) => setClientes(res.data))
      .catch((err) => console.error("Erro ao listar:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = (id: string) => {
    if (!confirm("Tem certeza que deseja remover este cliente?")) return;

    setLoading(true);
    contaFidelidadeService.deletarContaFidelidade(id)
      .then(() => {
        alert('Cliente removido');
        load();
      })
      .catch((err) => {
        console.error(err);
        alert('Falha ao remover cliente');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Consultar Clientes Fidelidade</h2>
        <button className="btn btn-success" onClick={() => navigate('/cadastrar-cliente')}>
          Novo Cliente
        </button>
      </div>

      {loading ? <p>Carregando...</p> : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CPF</th>
                <th>Email</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((c) => (
                <tr key={c.id}>
                  <td>{c.nome}</td>
                  <td>{c.cpf}</td>
                  <td>{c.email}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-outline-primary btn-sm" onClick={() => navigate(`/cadastrar-cliente/${c.id}`)}>Editar</button>
                      <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(c.id)}>Deletar</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ConsultarClientes;
