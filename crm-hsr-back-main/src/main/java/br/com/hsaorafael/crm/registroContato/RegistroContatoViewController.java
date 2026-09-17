package br.com.hsaorafael.crm.registroContato;

import br.com.hsaorafael.crm.lead.LeadService;
import br.com.hsaorafael.crm.lead.dto.LeadResponseDTO;
import br.com.hsaorafael.crm.registroContato.dto.RegistroContatoResponseDTO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class RegistroContatoViewController {
    private final RegistroContatoService registroContatoService;

    public RegistroContatoViewController(RegistroContatoService registroContatoService) {
        this.registroContatoService = registroContatoService;
    }

    @GetMapping("/contatos")
    public String contatos(Model model) {

        List<RegistroContatoResponseDTO> registros = registroContatoService.listarTodosContatos();

        model.addAttribute("registros", registros);

        return "contatos";
    }
}
