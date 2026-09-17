package br.com.hsaorafael.crm.lead;

import br.com.hsaorafael.crm.lead.dto.LeadResponseDTO;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class LeadViewController {

    private final LeadService leadService;

    public LeadViewController(LeadService leadService) {
        this.leadService = leadService;
    }

    @GetMapping("/leads")
    public String leads(Model model) {

        List<LeadResponseDTO> leads = leadService.listarTodosLeads();

        model.addAttribute("leads", leads);

        return "leads";
    }
}
