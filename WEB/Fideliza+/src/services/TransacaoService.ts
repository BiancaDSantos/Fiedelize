import api from './Api';

const transacaoService = {
  lancarTransacao: (contaId: string, payload: { pontos: number; tipoTransacao: string }) =>
    api.post(`/fidelidade/${contaId}/transacao`, payload),
};

export default transacaoService;
