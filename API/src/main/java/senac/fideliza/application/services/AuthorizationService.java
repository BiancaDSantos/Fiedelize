package senac.fideliza.application.services;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import senac.fideliza.Domain.repositories.AdministradorRepository;

@RequiredArgsConstructor
@Service
public class AuthorizationService implements UserDetailsService {

    private final AdministradorRepository repository;

    @Override
    public UserDetails loadUserByUsername(String email) {
        return repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email nao encontrado"));
    }
}
