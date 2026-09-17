package br.com.hsaorafael.crm.dashboard;

import br.com.hsaorafael.crm.lead.LeadService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DashboardViewController {

    private final LeadService leadService;

    public DashboardViewController(LeadService leadService) {
        this.leadService = leadService;
    }

    @GetMapping("/dashboard")
    public String dashboard(Model model) {

        model.addAttribute("leadsAtivos", leadService.contarLeadsAtivos());

        model.addAttribute(
                "leadsHoje",
                leadService.listarLeadsCriadosHojePorFuncionario().size()
        );

        return "dashboard";
    }
}
