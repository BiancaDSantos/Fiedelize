package senac.fideliza.application.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.br.CPF;
import senac.fideliza.Domain.entities.ClienteFidelidade;
import senac.fideliza.Domain.entities.Empresa;

import java.util.List;

public interface ClienteFidelidadeDTO {
    record ListResponse(
            Long id,
            String nome,
            String cpf,
            String email
    ) {
        public ListResponse(ClienteFidelidade clienteFidelidade) {
            this(
                    clienteFidelidade.getId(),
                    clienteFidelidade.getNome(),
                    clienteFidelidade.getCpf(),
                    clienteFidelidade.getEmail()
            );
        }

        public static List<ListResponse> geraListaDeResponse(List<ClienteFidelidade> clientes) {
            return clientes.stream()
                    .map(ListResponse::new)
                    .toList();
        }
    }

    record ClienteResponse(
            Long id,
            String nome,
            String cpf,
            String email,
            Integer pontos
    ){
        public ClienteResponse(ClienteFidelidade clienteFidelidade) {
            this(
                    clienteFidelidade.getId(),
                    clienteFidelidade.getNome(),
                    clienteFidelidade.getCpf(),
                    clienteFidelidade.getEmail(),
                    clienteFidelidade.getPontos()
            );
        }
    }

    record CriarClienteRequest(

            @NotBlank(message = "O nome é obrigatório")
            @Size(min = 3, max = 100, message = "O nome deve ter entre 3 e 100 caracteres")
            String nome,

            @NotBlank(message = "O CPF é obrigatório")
            @CPF(message = "CPF inválido")
            String cpf,

            @NotBlank(message = "O e-mail é obrigatório")
            @Email(message = "Formato de e-mail inválido")
            @Size(min = 5, max = 150, message = "O e-mail deve ter entre 5 e 150 caracteres")
            String email

    ) {
        public ClienteFidelidade transformaEmModel(Empresa empresa) {

            return ClienteFidelidade.builder()
                    .nome(this.nome)
                    .cpf(this.cpf)
                    .email(this.email)
                    .pontos(0)
                    .empresa(empresa)
                    .build();

        }
    }

    record EditarClienteRequest(

            @Size(min = 3, max = 100, message = "O nome deve ter entre 3 e 100 caracteres")
            String nome,

            @CPF(message = "CPF inválido")
            String cpf,

            @Email(message = "Formato de e-mail inválido")
            @Size(min = 5, max = 150, message = "O e-mail deve ter entre 5 e 150 caracteres")
            String email

    ) {
        public ClienteFidelidade atualizaModel(ClienteFidelidade clienteFidelidade) {

            if (this.nome != null) clienteFidelidade.setNome(this.nome);
            if (this.cpf != null) clienteFidelidade.setCpf(this.cpf);
            if (this.email != null) clienteFidelidade.setEmail(this.email);

            return clienteFidelidade;
        }
    }
}
