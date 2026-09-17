package br.com.hsaorafael.crm.funcionario;

import br.com.hsaorafael.crm.funcionario.dto.FuncionarioResponseDTO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class FuncionarioViewController {

    private final FuncionarioService funcionarioService;

    public FuncionarioViewController(FuncionarioService funcionarioService) {
        this.funcionarioService = funcionarioService;
    }

    @GetMapping("/funcionarios")
    public String funcionarios(Model model) {

        List<FuncionarioResponseDTO> funcionarios =
                funcionarioService.listarTodosFuncionarios();

        model.addAttribute("funcionarios", funcionarios);

        return "funcionarios";
    }
}
