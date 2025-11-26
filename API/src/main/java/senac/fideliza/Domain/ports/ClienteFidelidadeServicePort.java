package senac.fideliza.Domain.ports;

import senac.fideliza.Domain.entities.ClienteFidelidade;
import senac.fideliza.Domain.entities.Empresa;
import senac.fideliza.application.dtos.ClienteFidelidadeDTO;
import senac.fideliza.application.dtos.TransacaoDTO;

import java.util.List;

public interface ClienteFidelidadeServicePort {

    List<ClienteFidelidade> listarClientesPorEmpresaId(Long empresaId);

    ClienteFidelidade criarCliente(ClienteFidelidadeDTO.CriarClienteRequest request, Empresa empresa);

    ClienteFidelidade gerenciaTransacaoDePontos(TransacaoDTO.TransacaoRequest request, Long id, Long empresaId);

    Integer calculaNovoSaldo(Integer saldo, TransacaoDTO.TransacaoRequest request);

    void validarOperacao(Integer saldo, TransacaoDTO.TransacaoRequest request);

    ClienteFidelidade buscaClientePorId(Long id, Long empresaId, boolean buscaPessimista);

    ClienteFidelidade editarCliente(ClienteFidelidadeDTO.EditarClienteRequest request, Long id, Long empresaId);

    void deletarCliente(Long id, Long empresaId);
}
