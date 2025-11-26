import api from "./Api";

const contaFidelidadeService = {

    listarContasFidelidade: () => api.get('/fidelidade'),
}

export default contaFidelidadeService;