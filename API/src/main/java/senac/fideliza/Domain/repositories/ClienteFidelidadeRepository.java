package senac.fideliza.Domain.repositories;

import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import senac.fideliza.Domain.entities.ClienteFidelidade;

import java.util.List;
import java.util.Optional;

public interface ClienteFidelidadeRepository extends JpaRepository<ClienteFidelidade, Long> {

    List<ClienteFidelidade> findByEmpresaId(Long id);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT c FROM ClienteFidelidade c WHERE c.id = :clienteId AND c.empresa.id = :empresaId")
    Optional<ClienteFidelidade> findByIdAndEmpresaIdPessimisticWrite(Long clienteId, Long empresaId);

    Optional<ClienteFidelidade> findByIdAndEmpresaId(Long id, Long empresaId);
}
