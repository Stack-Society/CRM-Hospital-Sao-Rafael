package br.com.hsaorafael.crm.registroContato;

import br.com.hsaorafael.crm.common.enums.LeadStatus;
import br.com.hsaorafael.crm.common.enums.TipoEvento;
import br.com.hsaorafael.crm.common.exceptions.LeadNotFoundException;
import br.com.hsaorafael.crm.funcionario.Funcionario;
import br.com.hsaorafael.crm.historicoLead.HistoricoLead;
import br.com.hsaorafael.crm.historicoLead.HistoricoLeadService;
import br.com.hsaorafael.crm.historicoLead.dto.HistoricoLeadCreateDTO;
import br.com.hsaorafael.crm.lead.Lead;
import br.com.hsaorafael.crm.lead.LeadRepository;
import br.com.hsaorafael.crm.registroContato.dto.RegistroContatoCreateDTO;
import br.com.hsaorafael.crm.registroContato.dto.RegistroContatoResponseDTO;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class RegistroContatoService {
    private final RegistroContatoRepository registroContatoRepository;
    private final LeadRepository leadRepository;
    private final HistoricoLeadService historicoLeadService;

    public RegistroContatoService(RegistroContatoRepository registroContatoRepository, LeadRepository leadRepository, HistoricoLeadService historicoLeadService){
        this.registroContatoRepository = registroContatoRepository;
        this.leadRepository = leadRepository;
        this.historicoLeadService = historicoLeadService;
    }

    public void registrarContato(RegistroContatoCreateDTO registroContatoDTO){
        Lead lead = leadRepository.findById(registroContatoDTO.leadId())
                .orElseThrow(() -> new LeadNotFoundException(registroContatoDTO.leadId()));

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Funcionario funcionario = (Funcionario) authentication.getPrincipal();

        RegistroContato registroContato = new RegistroContato();
        registroContato.setLead(lead);
        registroContato.setFuncionario(funcionario);
        registroContato.setTipo(registroContatoDTO.tipoContato());
        registroContato.setResultado(registroContatoDTO.resultadoContato());
        registroContato.setObservacao(registroContatoDTO.observacao());
        registroContato.setDataHora(LocalDateTime.now());
        lead.setStatus(LeadStatus.EM_ATENDIMENTO);

        historicoLeadService.registrarHistorico(new HistoricoLeadCreateDTO(lead.getId(), TipoEvento.CONTATO, registroContato.getObservacao()));

        registroContatoRepository.save(registroContato);
    }

    public List<RegistroContatoResponseDTO> listarTodosContatos() {
        return registroContatoRepository.findAll()
                .stream()
                .map(RegistroContatoResponseDTO::fromEntity)
                .toList();
    }
}
