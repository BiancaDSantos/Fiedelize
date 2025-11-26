package senac.fideliza.application.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import senac.fideliza.Domain.entities.ClienteFidelidade;
import senac.fideliza.Domain.entities.Empresa;
import senac.fideliza.Domain.ports.ClienteFidelidadeServicePort;
import senac.fideliza.Domain.repositories.ClienteFidelidadeRepository;
import senac.fideliza.application.dtos.ClienteFidelidadeDTO;
import senac.fideliza.application.dtos.TransacaoDTO;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ClienteFidelidadeService implements ClienteFidelidadeServicePort {

    private final ClienteFidelidadeRepository clienteFidelidadeRepository;


    @Override
    public List<ClienteFidelidade> listarClientesPorEmpresaId(Long id) {
        return clienteFidelidadeRepository.findByEmpresaId(id);
    }

    @Override
    public ClienteFidelidade criarCliente(
            ClienteFidelidadeDTO.CriarClienteRequest request,
            Empresa empresa
    ) {
        return clienteFidelidadeRepository.save(request.transformaEmModel(empresa));
    }

    @Override
    @Transactional
    public ClienteFidelidade gerenciaTransacaoDePontos(
            TransacaoDTO.TransacaoRequest request,
            Long id,
            Long empresaId
    ) {
        ClienteFidelidade clienteFidelidade = buscaClientePorId(id, empresaId, true);

        this.validarOperacao(clienteFidelidade.getPontos(), request);

        clienteFidelidade.setPontos(this.calculaNovoSaldo(clienteFidelidade.getPontos(), request));

        clienteFidelidadeRepository.save(clienteFidelidade);

        return clienteFidelidade;
    }

    @Override
    public Integer calculaNovoSaldo(Integer saldo, TransacaoDTO.TransacaoRequest request) {

        Integer variacao = request.pontos() * request.tipoTransacao().getMultiplicador();

        return saldo + variacao;
    }

    @Override
    public void validarOperacao(Integer saldo, TransacaoDTO.TransacaoRequest request) {
        if (request.tipoTransacao().getMultiplicador() < 0 && request.pontos() > saldo) {
            throw new IllegalArgumentException("Saldo insuficiente para realizar a operação de resgate.");
        }
    }

    @Override
    public ClienteFidelidade buscaClientePorId(Long id, Long empresaId, boolean buscaPessimista) {

        Optional<ClienteFidelidade> clienteFidelidade = buscaPessimista ?
                clienteFidelidadeRepository.findByIdAndEmpresaIdPessimisticWrite(id, empresaId) :
                clienteFidelidadeRepository.findByIdAndEmpresaId(id, empresaId);

        return clienteFidelidade.orElseThrow(() -> new RuntimeException("Conta de fidelidade não encontrada!"));
    }

    @Override
    public ClienteFidelidade editarCliente(
            ClienteFidelidadeDTO.EditarClienteRequest request,
            Long id,
            Long empresaId
    ) {
        ClienteFidelidade clienteFidelidade = buscaClientePorId(id, empresaId, false);

        clienteFidelidadeRepository.save(request.atualizaModel(clienteFidelidade));

        return clienteFidelidade;
    }

    @Override
    public void deletarCliente(Long id, Long empresaId) {

        ClienteFidelidade clienteFidelidade = buscaClientePorId(id, empresaId, false);

        clienteFidelidadeRepository.delete(clienteFidelidade);
    }
}
