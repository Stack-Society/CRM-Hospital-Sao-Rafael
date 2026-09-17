package br.com.hsaorafael.crm.auth;

import br.com.hsaorafael.crm.auth.dto.AuthRequestDTO;
import br.com.hsaorafael.crm.auth.dto.AuthResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody AuthRequestDTO authRequestDTO) {
        return ResponseEntity.ok(authService.login(authRequestDTO.email(), authRequestDTO.senha()));
    }
}
