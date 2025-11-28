import api from "./Api";

const contaFidelidadeService = {

    listarContasFidelidade: () => api.get('/fidelidade'),

    obterContaFidelidade: (id: string) => api.get(`/fidelidade/${id}`),

    criarContaFidelidade: (payload: { nome: string; cpf: string; email: string }) => api.post('/fidelidade', payload),

    atualizarContaFidelidade: (id: string, payload: { nome?: string; cpf?: string; email?: string }) => api.put(`/fidelidade/${id}`, payload),

    deletarContaFidelidade: (id: string) => api.delete(`/fidelidade/${id}`),
}

export default contaFidelidadeService;