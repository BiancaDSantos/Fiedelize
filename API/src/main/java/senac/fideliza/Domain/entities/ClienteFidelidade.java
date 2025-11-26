package senac.fideliza.Domain.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.br.CPF;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "cliente_fidelidade",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_cpf_empresa",
                        columnNames = {"cpf", "id_empresa"}
                )
        }
)
public class ClienteFidelidade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "O nome é obrigatório")
    @Size(min = 3, max = 100, message = "O nome deve ter entre 3 e 100 caracteres")
    @Column(length = 100)
    private String nome;

    @NotBlank(message = "O CPF é obrigatório")
    @CPF(message = "CPF inválido")
    @Column(length = 11)
    private String cpf;

    @NotBlank(message = "O e-mail é obrigatório")
    @Email(message = "Formato de e-mail inválido")
    @Size(min = 5, max = 150, message = "O e-mail deve ter entre 5 e 150 caracteres")
    @Column(length = 150)
    private String email;

    @NotNull(message = "A pontuação não pode ser nula")
    @PositiveOrZero(message = "Apenas valores positivo ou zero")
    private Integer pontos = 0;

    @ManyToOne
    @JoinColumn(name = "id_empresa", nullable = false)
    private Empresa empresa;

}
