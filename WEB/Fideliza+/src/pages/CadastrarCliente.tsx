import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import contaFidelidadeService from "../services/ContaFidelidadeService";
import type { ClienteFidelidade } from "../types/ClienteFidelidade";

import SideBar from "../components/SideBar/SideBar";

function CadastrarCliente() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ nome: "", cpf: "", email: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      contaFidelidadeService
        .obterContaFidelidade(id)
        .then((res) => {
          const data = res.data as ClienteFidelidade;
          setForm({ nome: data.nome, cpf: data.cpf, email: data.email });
        })
        .catch((err) => console.error("Erro ao obter conta:", err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.nome || !form.cpf || !form.email) {
      alert("Preencha todos os campos.");
      return;
    }

    setLoading(true);

    const promise = id
      ? contaFidelidadeService.atualizarContaFidelidade(id, form)
      : contaFidelidadeService.criarContaFidelidade(form);

    promise
      .then(() => {
        alert(id ? "Cliente atualizado com sucesso" : "Cliente criado com sucesso");
        navigate("/consultar-clientes");
      })
      .catch((err) => {
        console.error(err);
        alert("Ocorreu um erro ao salvar o cliente.");
      })
      .finally(() => setLoading(false));
  };

  return (
    
    
    <div className="container mt-4">
        <div><SideBar /></div>
      <h2>{id ? "Editar Cliente Fidelidade" : "Cadastrar Cliente Fidelidade"}</h2>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Nome</label>
          <input name="nome" value={form.nome} onChange={handleChange} className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">CPF</label>
          <input name="cpf" value={form.cpf} onChange={handleChange} className="form-control" />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input name="email" value={form.email} onChange={handleChange} type="email" className="form-control" />
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {id ? "Atualizar" : "Cadastrar"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CadastrarCliente;
