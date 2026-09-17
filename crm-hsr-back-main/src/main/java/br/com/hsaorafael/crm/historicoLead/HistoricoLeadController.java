package br.com.hsaorafael.crm.historicoLead;

import br.com.hsaorafael.crm.historicoLead.dto.HistoricoLeadCreateDTO;
import br.com.hsaorafael.crm.historicoLead.dto.HistoricoLeadResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leads/historico")
@PreAuthorize("hasAnyRole('CALL_CENTER', 'ADMIN')")
public class HistoricoLeadController {
    private final HistoricoLeadService historicoLeadService;

    public HistoricoLeadController(HistoricoLeadService historicoLeadService) {
        this.historicoLeadService = historicoLeadService;
    }

    @PostMapping
    public ResponseEntity<Void> registrarHistorico(@RequestBody HistoricoLeadCreateDTO historicoLeadCreateDTO){
        historicoLeadService.registrarHistorico(historicoLeadCreateDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/{leadId}")
    public ResponseEntity<List<HistoricoLeadResponseDTO>> obterHistoricoPorLead(@PathVariable Long leadId){
        return ResponseEntity.ok(historicoLeadService.obterHistoricoPorLead(leadId));
    }

    @GetMapping("/funcionario")
    public ResponseEntity<List<HistoricoLeadResponseDTO>> obterHistoricoPorFuncionario(){
        return ResponseEntity.ok(historicoLeadService.obterHistoricoPorFuncionario());
    }
}
