package br.com.hsaorafael.crm.agendamento;

import br.com.hsaorafael.crm.agendamento.dto.AgendaDashboardDTO;
import br.com.hsaorafael.crm.agendamento.dto.AgendamentoCreateDTO;
import br.com.hsaorafael.crm.agendamento.dto.AgendamentoResponseDTO;
import br.com.hsaorafael.crm.agendamento.dto.AgendamentoUpdateDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/agendamento")
@PreAuthorize("hasAnyRole('CALL_CENTER', 'ADMIN')")
public class AgendamentoController {
    private final AgendamentoService agendamentoService;

    public AgendamentoController(AgendamentoService agendamentoService) {
        this.agendamentoService = agendamentoService;
    }

    @PostMapping
    public ResponseEntity<Void> marcarAgendamento(@RequestBody AgendamentoCreateDTO agendamentoCreateDTO){
        agendamentoService.marcarAgendamento(agendamentoCreateDTO);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/funcionario")
    public ResponseEntity<List<AgendamentoResponseDTO>> listarAgendamentosPorFuncionario(){
        return ResponseEntity.ok(agendamentoService.listarAgendamentosPorFuncionario());
    }

    @GetMapping("/funcionario/proximos")
    public ResponseEntity<List<AgendamentoResponseDTO>> listarProximosAgendamentos() {
        return ResponseEntity.ok(agendamentoService.listarProximosAgendamentosPorFuncionario());
    }

    @GetMapping("/funcionario/{id}")
    public ResponseEntity<AgendamentoResponseDTO> buscarAgendamentoPorId(@PathVariable Long id){
        return ResponseEntity.ok(agendamentoService.buscarAgendamentoPorId(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AgendamentoResponseDTO> atualizar(@PathVariable Long id, @RequestBody AgendamentoUpdateDTO dto) {
        return ResponseEntity.ok(agendamentoService.atualizar(id, dto));
    }

    @PatchMapping("/{id}/cancelar")
    public void cancelar(@PathVariable Long id) {
        agendamentoService.cancelar(id);
    }

    @GetMapping("/funcionario/filtro/{status}")
    public ResponseEntity<List<AgendamentoResponseDTO>> listar(@PathVariable String status) {
        return ResponseEntity.ok(agendamentoService.listarPorFuncionario(status));
    }

    @GetMapping("/funcionario/dashboard")
    public ResponseEntity<AgendaDashboardDTO> dashboard() {
        return ResponseEntity.ok(agendamentoService.dashboard());
    }
}
