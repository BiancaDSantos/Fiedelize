package senac.fideliza.presentation.controller;


import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import senac.fideliza.Domain.entities.Administrador;
import senac.fideliza.Domain.ports.ClienteFidelidadeServicePort;
import senac.fideliza.application.dtos.ClienteFidelidadeDTO;
import senac.fideliza.application.dtos.TransacaoDTO;

import java.util.List;

@RestController
@RequestMapping("/fidelidade")
@RequiredArgsConstructor
public class ClienteFidelidadeController {

    private final ClienteFidelidadeServicePort clienteFidelidadeService;

    @GetMapping
    @Operation(summary = "Lista contas por empresa")
    public ResponseEntity<List<ClienteFidelidadeDTO.ListResponse>> listarClientesFidelidadePorEmpresa(
            @AuthenticationPrincipal Administrador administrador
    ) {
        List<ClienteFidelidadeDTO.ListResponse> lista =
                ClienteFidelidadeDTO.ListResponse.geraListaDeResponse(
                        clienteFidelidadeService.listarClientesPorEmpresaId(administrador.getEmpresa().getId())
                );

        return ResponseEntity.ok(lista);
    }

    @PostMapping
    @Operation(summary = "Criar nova conta de fidelidade")
    public ResponseEntity<ClienteFidelidadeDTO.ClienteResponse> criarCliente(
            @Valid @RequestBody ClienteFidelidadeDTO.CriarClienteRequest request,
            @AuthenticationPrincipal Administrador administrador
    ) {
        return ResponseEntity.ok(
                new ClienteFidelidadeDTO.ClienteResponse(
                        clienteFidelidadeService.criarCliente(request, administrador.getEmpresa())
                )
        );
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar conta de fidelidade")
    public ResponseEntity<ClienteFidelidadeDTO.ClienteResponse> buscaCliente(
            @PathVariable Long id,
            @AuthenticationPrincipal Administrador administrador
    ) {
        return ResponseEntity.ok(
                new ClienteFidelidadeDTO.ClienteResponse(
                        clienteFidelidadeService.buscaClientePorId(id, administrador.getEmpresa().getId(), false)
                )
        );
    }

    @PutMapping("/{id}")
    @PatchMapping("/{id}")
    @Operation(summary = "Editar conta de fidelidade")
    public ResponseEntity<ClienteFidelidadeDTO.ClienteResponse> editarCliente(
            @Valid @RequestBody ClienteFidelidadeDTO.EditarClienteRequest request,
            @PathVariable Long id,
            @AuthenticationPrincipal Administrador administrador
    ) {
        return ResponseEntity.ok(
                new ClienteFidelidadeDTO.ClienteResponse(
                        clienteFidelidadeService.editarCliente(request, id, administrador.getEmpresa().getId())
                )
        );
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Deletar conta de fidelidade")
    public ResponseEntity<Void> deletarCliente(
            @PathVariable Long id,
            @AuthenticationPrincipal Administrador administrador
    ) {
        clienteFidelidadeService.deletarCliente(id, administrador.getEmpresa().getId());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/transacao")
    @Operation(summary = "Criar nova transação de pontos")
    public ResponseEntity<ClienteFidelidadeDTO.ClienteResponse> gerenciaTransacaoDePontos(
            @Valid @RequestBody TransacaoDTO.TransacaoRequest request,
            @PathVariable Long id,
            @AuthenticationPrincipal Administrador administrador
    ) {
        return ResponseEntity.ok(
                new ClienteFidelidadeDTO.ClienteResponse(
                        clienteFidelidadeService.gerenciaTransacaoDePontos(
                                request, id, administrador.getEmpresa().getId()
                        )
                )
        );
    }
}
