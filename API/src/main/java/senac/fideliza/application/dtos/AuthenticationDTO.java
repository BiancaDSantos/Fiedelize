package senac.fideliza.application.dtos;

public interface AuthenticationDTO {

    record AuthenticationRequest(String email, String senha) {
    }

    record LoginResponse(String token) {
    }

}