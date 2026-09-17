package br.com.hsaorafael.crm.lead;

import br.com.hsaorafael.crm.lead.dto.LeadContactRequestDTO;
import br.com.hsaorafael.crm.lead.dto.LeadCreateRequestDTO;
import br.com.hsaorafael.crm.lead.dto.LeadResponseDTO;
import br.com.hsaorafael.crm.lead.dto.LeadUpdateRequestDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/leads")
public class LeadController {
    private final  LeadService leadService;

    public LeadController(LeadService leadService) {
        this.leadService = leadService;
    }


    @PostMapping
    public ResponseEntity<LeadResponseDTO> cadastroLead(@RequestBody LeadCreateRequestDTO leadRequestDTO){
        LeadResponseDTO responseDTO = leadService.cadastroLead(leadRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDTO);
    }

    @PreAuthorize("hasAnyRole('CALL_CENTER', 'ADMIN')")
    @GetMapping
    public ResponseEntity<List<LeadResponseDTO>> listarTodosLeads(){
        return ResponseEntity.ok(leadService.listarTodosLeads());
    }

    @PreAuthorize("hasAnyRole('CALL_CENTER', 'ADMIN')")
    @GetMapping("/funcionario/{id}")
    public ResponseEntity<List<LeadResponseDTO>> listarTodosLeadsPorFuncionario(@PathVariable Long id){
        return ResponseEntity.ok(leadService.listarTodosLeadsPorFuncionario(id));
    }

    @PreAuthorize("hasAnyRole('CALL_CENTER', 'ADMIN')")
    @GetMapping("/funcionario")
    public ResponseEntity<List<LeadResponseDTO>> listarTodosLeadsPorFuncionarioSemId(){
        return ResponseEntity.ok(leadService.listarTodosLeadsPorFuncionarioSemId());
    }

    @PreAuthorize("hasAnyRole('CALL_CENTER', 'ADMIN')")
    @GetMapping("/funcionario/{idFunc}/{idLead}")
    public ResponseEntity<LeadResponseDTO> buscarLeadPorIdPorFuncionario(@PathVariable Long idFunc, @PathVariable Long idLead){
        return ResponseEntity.ok(leadService.buscarLeadPorIdPorFuncionario(idFunc, idLead));
    }

    @PreAuthorize("hasAnyRole('CALL_CENTER', 'ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<LeadResponseDTO> buscarLeadPorId(@PathVariable Long id){
        return ResponseEntity.ok(leadService.buscarLeadPorId(id));
    }

    @PreAuthorize("hasAnyRole('CALL_CENTER', 'ADMIN')")
    @PatchMapping("/{id}/assumir")
    public ResponseEntity<Void> assumirLead(@PathVariable Long id){
        leadService.assumirLead(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PreAuthorize("hasAnyRole('CALL_CENTER', 'ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Void> atualizarLead(@PathVariable Long id, @RequestBody LeadUpdateRequestDTO leadUpdateRequestDTO){
        leadService.atualizarLead(id, leadUpdateRequestDTO);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PreAuthorize("hasAnyRole('CALL_CENTER', 'ADMIN')")
    @PatchMapping("/{id}/contato")
    public ResponseEntity<Void> registrarContato(@PathVariable Long id, @RequestBody LeadContactRequestDTO leadContactRequestDTO){
        leadService.registrarContato(id, leadContactRequestDTO);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PatchMapping("/{id}/encaminhar")
    @PreAuthorize("hasAnyRole('CALL_CENTER', 'ADMIN')")
    public ResponseEntity<Void> encaminharLead(@PathVariable Long id){
        leadService.encaminharLead(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAnyRole('CALL_CENTER', 'ADMIN')")
    @GetMapping("/hoje")
    public ResponseEntity<List<LeadResponseDTO>> listarLeadsCriadosHojePorFuncionario(){
        return ResponseEntity.ok(leadService.listarLeadsCriadosHojePorFuncionario());
    }

    @PreAuthorize("hasAnyRole('CALL_CENTER', 'ADMIN')")
    @GetMapping("/hoje/count")
    public ResponseEntity<Long> contarLeadsCriadosHojePorFuncionario(){
        return ResponseEntity.ok(leadService.contarLeadsCriadosHojePorFuncionario());
    }

    @PreAuthorize("hasAnyRole('CALL_CENTER', 'ADMIN')")
    @GetMapping("/ativos/count")
    public ResponseEntity<Integer> contarLeadsAtivos(){
        return ResponseEntity.ok(leadService.contarLeadsAtivos());
    }

    @PreAuthorize("hasAnyRole('CALL_CENTER', 'ADMIN')")
    @PatchMapping("/{id}/desativar")
    public ResponseEntity<Void> desativarLead(@PathVariable Long id){
        leadService.desativarLead(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

}
