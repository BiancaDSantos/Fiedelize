package senac.fideliza.presentation.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import senac.fideliza.Domain.entities.Administrador;
import senac.fideliza.Domain.repositories.AdministradorRepository;
import senac.fideliza.application.dtos.AuthenticationDTO;
import senac.fideliza.infra.security.TokenService;

@RequiredArgsConstructor
@RestController
@RequestMapping("auth")
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;

    private final AdministradorRepository repository;

    private final TokenService tokenService;

    @PostMapping("/login")
    public ResponseEntity<AuthenticationDTO.LoginResponse> login(
            @RequestBody @Valid AuthenticationDTO.AuthenticationRequest data
    ){
        System.out.println(new BCryptPasswordEncoder().encode(data.senha()));
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.senha());

        var auth = this.authenticationManager.authenticate(usernamePassword);

        var token = tokenService.generateToken((Administrador) auth.getPrincipal());

        return ResponseEntity.ok(new AuthenticationDTO.LoginResponse(token));
    }
}