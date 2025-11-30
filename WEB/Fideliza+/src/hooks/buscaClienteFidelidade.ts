import { useEffect, useState } from "react";
import contaFidelidadeService from "../services/ContaFidelidadeService";
import type { ClienteFidelidade } from "../types/ClienteFidelidade";

/**
 * Hook customizado para buscar e gerenciar a lista de clientes fidelidade.
 * @returns Um array contendo a lista de clientes.
 */
export function useClientesFidelidade(): ClienteFidelidade[] {
	const [clientes, setClientes] = useState<ClienteFidelidade[]>([]);

	useEffect(() => {
		contaFidelidadeService
			.listarContasFidelidade()
			.then((res) => setClientes(res.data))
			.catch((err) => console.error("Erro ao listar contas:", err));
	}, []);

	return clientes;
}