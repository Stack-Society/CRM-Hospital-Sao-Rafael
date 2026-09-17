package br.com.hsaorafael.crm.registroContato;

import br.com.hsaorafael.crm.registroContato.dto.RegistroContatoCreateDTO;
import br.com.hsaorafael.crm.registroContato.dto.RegistroContatoResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contatos")
@PreAuthorize("hasAnyRole('CALL_CENTER', 'ADMIN')")
public class RegistroContatoController {
    private final RegistroContatoService registroContatoService;

    public RegistroContatoController(RegistroContatoService registroContatoService) {
        this.registroContatoService = registroContatoService;
    }

    @PostMapping
    public ResponseEntity<Void> registrarContato(@RequestBody RegistroContatoCreateDTO registroContatoCreateDTO){
        registroContatoService.registrarContato(registroContatoCreateDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<RegistroContatoResponseDTO>> listarTodosContatos() {
        return ResponseEntity.ok(registroContatoService.listarTodosContatos());
    }
}
