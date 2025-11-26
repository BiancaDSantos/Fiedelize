package senac.fideliza.Domain.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import senac.fideliza.Domain.entities.Administrador;

import java.util.Optional;

public interface AdministradorRepository extends JpaRepository<Administrador, Long> {
    Optional<Administrador> findByEmail(String email);
}
