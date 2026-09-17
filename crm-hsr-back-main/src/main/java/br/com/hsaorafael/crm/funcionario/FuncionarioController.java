package br.com.hsaorafael.crm.funcionario;

import br.com.hsaorafael.crm.common.enums.Setor;
import br.com.hsaorafael.crm.funcionario.dto.FuncionarioCreateRequestDTO;
import br.com.hsaorafael.crm.funcionario.dto.FuncionarioCreateResponseDTO;
import br.com.hsaorafael.crm.funcionario.dto.FuncionarioResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

        import java.util.List;

@RestController
@RequestMapping("/api/funcionarios")
public class FuncionarioController {
    private final FuncionarioService funcionarioService;

    public FuncionarioController(FuncionarioService funcionarioService) {
        this.funcionarioService = funcionarioService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<FuncionarioCreateResponseDTO> CadastrarFuncionario (@RequestBody FuncionarioCreateRequestDTO funcionarioCreateRequestDTO) {
        FuncionarioCreateResponseDTO response = funcionarioService.cadastroFuncionario(funcionarioCreateRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<FuncionarioResponseDTO>> listarFuncionarios(@RequestParam(required = false) Setor setor) {
        if (setor != null) {
            return ResponseEntity.ok(funcionarioService.listarTodosFuncionariosPorSetor(setor));
        }
        return ResponseEntity.ok(funcionarioService.listarTodosFuncionarios());
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<FuncionarioResponseDTO> buscarFuncionarioPorId(@PathVariable Long id) {
        FuncionarioResponseDTO response = funcionarioService.buscarPorId(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}/desativar")
    public ResponseEntity<Void> desativarFuncionarioPorId(@PathVariable Long id) {
        funcionarioService.desativarFuncionario(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/{id}/ativar")
    public ResponseEntity<Void> ativarFuncionarioPorId(@PathVariable Long id) {
        funcionarioService.ativarFuncionario(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/me")
    public ResponseEntity<FuncionarioResponseDTO> me(Authentication authentication) {
        Funcionario funcionario = (Funcionario) authentication.getPrincipal();
        return ResponseEntity.ok(
                FuncionarioResponseDTO.fromEntity(funcionario)
        );
    }

}
