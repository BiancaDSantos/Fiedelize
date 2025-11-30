import { useEffect, useMemo, useState } from "react";
import contaFidelidadeService from "../services/ContaFidelidadeService";
import transacaoService from "../services/TransacaoService";
import type { ClienteFidelidade } from "../types/ClienteFidelidade";
import { TipoTransacao } from "../types/Transacao";
import SideBar from "../components/SideBar/SideBar";

const multiplicadorMap: Record<string, number> = {
	ACUMULO: 1,
	ACUMULO_DOBRO: 2,
	RESGATE: -1,
	EXPIRACAO: -1,
	AJUSTE_POSITIVO: 1,
	AJUSTE_NEGATIVO: -1,
};

function LancarPontos() {
	const [clientes, setClientes] = useState<ClienteFidelidade[]>([]);
	const [contaId, setContaId] = useState<string>("");
	const [tipo, setTipo] = useState<string>(TipoTransacao.ACUMULO);
	const [pontos, setPontos] = useState<number>(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		contaFidelidadeService
			.listarContasFidelidade()
			.then((res) => setClientes(res.data))
			.catch((err) => console.error("Erro ao listar contas:", err));
	}, []);

	const multiplicador = useMemo(() => multiplicadorMap[tipo] ?? 1, [tipo]);
	const pontosEfetivos = pontos * multiplicador;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!contaId) {
			alert("Selecione um cliente");
			return;
		}
		if (!pontos || Math.abs(pontos) <= 0) {
			alert("Informe a quantidade de pontos maior que zero");
			return;
		}

		setLoading(true);

		transacaoService
			.lancarTransacao(contaId, { pontos, tipoTransacao: tipo })
			.then(() => {
				alert("Transação lançada com sucesso");
				// reset
				setPontos(0);
				setTipo(TipoTransacao.ACUMULO);
				setContaId("");
			})
			.catch((err) => {
				console.error(err);
				alert("Falha ao lançar transação");
			})
			.finally(() => setLoading(false));
	};


	return (
		<div className="container mt-4">
            <SideBar />
			<h2>Lançar Pontos</h2>

			<form onSubmit={handleSubmit} className="mt-3">
				<div className="mb-3">
					<label className="form-label">Cliente</label>
					<select className="form-select" value={contaId} onChange={(e) => setContaId(e.target.value)}>
						<option value="">-- selecione --</option>
						{clientes.map((c) => (
							<option key={c.id} value={c.id}>{c.nome} ({c.cpf})</option>
						))}
					</select>
				</div>

				<div className="row">
					<div className="col-md-4 mb-3">
						<label className="form-label">Tipo de Transação</label>
						<select className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
							{Object.values(TipoTransacao).map((t) => (
								<option key={t} value={t}>{t}</option>
							))}
						</select>
					</div>

					<div className="col-md-4 mb-3">
						<label className="form-label">Pontos</label>
						<input type="number" min={0} className="form-control" value={pontos} onChange={(e) => setPontos(Number(e.target.value))} />
					</div>

					<div className="col-md-4 mb-3">
						<label className="form-label">Pontos efetivos</label>
						<input className="form-control" readOnly value={pontosEfetivos} />
					</div>
				</div>

				<button className="btn btn-primary" type="submit" disabled={loading}>{loading ? 'Enviando...' : 'Lançar'}</button>
			</form>
		</div>
	);
}

export default LancarPontos;
