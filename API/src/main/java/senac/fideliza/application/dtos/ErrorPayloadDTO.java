package senac.fideliza.application.dtos;

import java.time.LocalDateTime;

public record ErrorPayloadDTO(
        LocalDateTime timestamp,
        Integer status,
        String error,
        String message,
        String path
) {
}
