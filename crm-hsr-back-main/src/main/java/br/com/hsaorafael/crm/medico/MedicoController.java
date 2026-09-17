package br.com.hsaorafael.crm.medico;

import br.com.hsaorafael.crm.medico.dto.MedicoCreateDTO;
import br.com.hsaorafael.crm.medico.dto.MedicoResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medicos")
public class MedicoController {
    private final MedicoService medicoService;

    public MedicoController(MedicoService medicoService) {
        this.medicoService = medicoService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> CadastroMedico(@RequestBody MedicoCreateDTO medicoCreateDTO){
        medicoService.CadastrarMedico(medicoCreateDTO);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('CALL_CENTER', 'ADMIN')")
    public ResponseEntity<List<MedicoResponseDTO>> listarTodosMedicos(){
        return ResponseEntity.ok(medicoService.listarTodosMedicos());
    }
}
