package br.com.hsaorafael.crm.historicoLead;

import br.com.hsaorafael.crm.agendamento.dto.AgendamentoResponseDTO;
import br.com.hsaorafael.crm.common.enums.TipoEvento;
import br.com.hsaorafael.crm.common.exceptions.LeadNotFoundException;
import br.com.hsaorafael.crm.funcionario.Funcionario;
import br.com.hsaorafael.crm.historicoLead.dto.HistoricoLeadCreateDTO;
import br.com.hsaorafael.crm.historicoLead.dto.HistoricoLeadResponseDTO;
import br.com.hsaorafael.crm.lead.Lead;
import br.com.hsaorafael.crm.lead.LeadRepository;
import br.com.hsaorafael.crm.registroContato.dto.RegistroContatoResponseDTO;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class HistoricoLeadService {

    private final HistoricoLeadRepository historicoLeadRepository;
    private final LeadRepository leadRepository;

    public HistoricoLeadService(HistoricoLeadRepository historicoLeadRepository,
                                LeadRepository leadRepository) {
        this.historicoLeadRepository = historicoLeadRepository;
        this.leadRepository = leadRepository;
    }

    public void registrarHistorico(HistoricoLeadCreateDTO historicoLeadCreateDTO) {

        Lead lead = leadRepository.findById(historicoLeadCreateDTO.leadId())
                .orElseThrow(() -> new LeadNotFoundException(historicoLeadCreateDTO.leadId()));

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        Funcionario funcionario =
                (Funcionario) authentication.getPrincipal();

        HistoricoLead historico = new HistoricoLead();

        historico.setLead(lead);
        historico.setFuncionario(funcionario);
        historico.setTipoEvento(historicoLeadCreateDTO.tipoEvento());
        historico.setDescricao(historicoLeadCreateDTO.descricao());
        historico.setDataHora(LocalDateTime.now());

        historicoLeadRepository.save(historico);
    }

    public List<HistoricoLeadResponseDTO> obterHistoricoPorLead(Long id){
        leadRepository.findById(id)
                .orElseThrow(() -> new LeadNotFoundException(id));

        List<HistoricoLead> historicoLeads = historicoLeadRepository.findByLeadId(id);

        return historicoLeads.stream()
                .map(HistoricoLeadResponseDTO::fromEntity)
                .toList();
    }

    public List<HistoricoLeadResponseDTO> obterHistoricoPorFuncionario() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        Funcionario funcionario =
                (Funcionario) authentication.getPrincipal();

        return historicoLeadRepository.findByFuncionarioId(funcionario.getId()).stream().map(HistoricoLeadResponseDTO::fromEntity).toList();
    }
}
