import api from "./Api";

const contaFidelidadeService = {

    listarContasFidelidade: () => api.get('/fidelidade'),
    cadastrarPontos: (contaId: string, payload: TransacaoRequest) =>
        api.post(`${contaId}/transacao`, payload),
}

export default contaFidelidadeService;