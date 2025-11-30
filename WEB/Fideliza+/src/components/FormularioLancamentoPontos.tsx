// src/components/FormularioLancamentoPontos/FormularioLancamentoPontos.tsx

import { useMemo, useState } from "react";
import type { ClienteFidelidade } from "../types/ClienteFidelidade";
import { TipoTransacao } from "../types/Transacao";

// Definição do shape para as propriedades (props) do componente
interface FormProps {
	clientes: ClienteFidelidade[];
	onLancarTransacao: (contaId: string, pontos: number, tipo: string) => Promise<void>;
}

// Mapeamento dos multiplicadores, pode ficar aqui ou ser exportado de um arquivo de constantes
const multiplicadorMap: Record<string, number> = {
	[TipoTransacao.ACUMULO]: 1,
	[TipoTransacao.ACUMULO_DOBRO]: 2,
	[TipoTransacao.RESGATE]: -1,
	[TipoTransacao.EXPIRACAO]: -1,
	[TipoTransacao.AJUSTE_POSITIVO]: 1,
	[TipoTransacao.AJUSTE_NEGATIVO]: -1,
};

export default function FormularioLancamentoPontos({ clientes, onLancarTransacao }: FormProps) {
	const [contaId, setContaId] = useState<string>("");
	const [tipo, setTipo] = useState<string>(TipoTransacao.ACUMULO);
	const [pontos, setPontos] = useState<number>(0);
	const [loading, setLoading] = useState(false);

	const multiplicador = useMemo(() => multiplicadorMap[tipo] ?? 1, [tipo]);
	const pontosEfetivos = pontos * multiplicador;

	const handleSubmit = async (e: React.FormEvent) => {
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

		try {
			// Chama a função passada via prop para lidar com a lógica de serviço
			await onLancarTransacao(contaId, pontos, tipo);

			alert("Transação lançada com sucesso");
			// reset
			setPontos(0);
			setTipo(TipoTransacao.ACUMULO);
			setContaId("");
		} catch (err) {
			console.error(err);
			alert("Falha ao lançar transação");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="mt-3">
			<div className="mb-3">
				<label className="form-label">Cliente</label>
				<select className="form-select" value={contaId} onChange={(e) => setContaId(e.target.value)}>
					<option value="">-- selecione --</option>
					{clientes.map((c) => (
						<option key={c.id} value={c.id}>
							{c.nome} ({c.cpf})
						</option>
					))}
				</select>
			</div>

			<div className="row">
				<div className="col-md-4 mb-3">
					<label className="form-label">Tipo de Transação</label>
					<select className="form-select" value={tipo} onChange={(e) => setTipo(e.target.value)}>
						{Object.values(TipoTransacao).map((t) => (
							<option key={t} value={t}>
								{t}
							</option>
						))}
					</select>
				</div>

				<div className="col-md-4 mb-3">
					<label className="form-label">Pontos</label>
					<input
						type="number"
						min={0}
						className="form-control"
						value={pontos}
						onChange={(e) => setPontos(Number(e.target.value))}
					/>
				</div>

				<div className="col-md-4 mb-3">
					<label className="form-label">Pontos efetivos</label>
					<input className="form-control" readOnly value={pontosEfetivos} />
				</div>
			</div>

			<button className="btn btn-primary" type="submit" disabled={loading}>
				{loading ? "Enviando..." : "Lançar"}
			</button>
		</form>
	);
}