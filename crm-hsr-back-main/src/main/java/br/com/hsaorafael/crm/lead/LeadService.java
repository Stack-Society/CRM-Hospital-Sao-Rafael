package br.com.hsaorafael.crm.lead;

import br.com.hsaorafael.crm.common.enums.LeadStatus;
import br.com.hsaorafael.crm.common.enums.TipoEvento;
import br.com.hsaorafael.crm.common.exceptions.BusinessException;
import br.com.hsaorafael.crm.common.exceptions.LeadNotFoundException;
import br.com.hsaorafael.crm.distribuicaoLeads.DistribuicaoLeadsService;
import br.com.hsaorafael.crm.funcionario.Funcionario;
import br.com.hsaorafael.crm.historicoLead.HistoricoLeadService;
import br.com.hsaorafael.crm.historicoLead.dto.HistoricoLeadCreateDTO;
import br.com.hsaorafael.crm.lead.dto.LeadContactRequestDTO;
import br.com.hsaorafael.crm.lead.dto.LeadCreateRequestDTO;
import br.com.hsaorafael.crm.lead.dto.LeadUpdateRequestDTO;
import br.com.hsaorafael.crm.lead.dto.LeadResponseDTO;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class LeadService {
    private final LeadRepository leadRepository;
    private final DistribuicaoLeadsService distribuicaoLeadService;
    private final HistoricoLeadService historicoLeadService;

    public LeadService(LeadRepository leadRepository, DistribuicaoLeadsService distribuicaoLeadService, HistoricoLeadService historicoLeadService) {
        this.leadRepository = leadRepository;
        this.distribuicaoLeadService = distribuicaoLeadService;
        this.historicoLeadService = historicoLeadService;
    }


    public LeadResponseDTO cadastroLead(LeadCreateRequestDTO leadRequestDTO){
        Funcionario responsavel = distribuicaoLeadService.distribuir();
        Lead lead = new Lead();
        lead.setNome(leadRequestDTO.nome());
        lead.setTelefone(leadRequestDTO.telefone());
        lead.setEmail(leadRequestDTO.email());
        lead.setProcedimentoInteresse(leadRequestDTO.procedimentoInteresse());
        lead.setOrigem(leadRequestDTO.origem());
        lead.setObservacoes(leadRequestDTO.observacoes());
        lead.setPreferenciaMedico(leadRequestDTO.preferenciaMedico());

        lead.setStatus(LeadStatus.NOVO);
        lead.setDataCriacao(LocalDateTime.now());
        lead.setAtivo(true);
        lead.setResponsavel(responsavel);
        lead.setDataUltimoContato(null);

        leadRepository.save(lead);

        return LeadResponseDTO.fromEntity(lead);
    }

    public List<LeadResponseDTO> listarTodosLeads(){
        return leadRepository.findAll()
                .stream()
                .map(LeadResponseDTO::fromEntity)
                .toList();
    }

    public LeadResponseDTO buscarLeadPorId(Long id){
        return LeadResponseDTO.fromEntity(leadRepository.findById(id).orElseThrow(() -> new LeadNotFoundException(id)));
    }

    public void assumirLead(Long id){
        Lead lead = leadRepository.findById(id).orElseThrow(() -> new LeadNotFoundException(id));

        if (lead.getResponsavel() != null){
            throw new BusinessException("Lead já tem responsável.");
        }

        if (!lead.getAtivo()) {
            throw new BusinessException("Lead está inativo.");
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Funcionario funcionario = (Funcionario) authentication.getPrincipal();
        lead.setResponsavel(funcionario);
        lead.setStatus(LeadStatus.NOVO);
        lead.setDataUltimoContato(LocalDateTime.now());
        leadRepository.save(lead);
    }

    public void atualizarLead(Long id, LeadUpdateRequestDTO lead){
        Lead leadAntigo = leadRepository.findById(id).orElseThrow(() -> new LeadNotFoundException(id));
        if (!leadAntigo.getAtivo()) {
            throw new BusinessException("Não é possível atualizar um lead inativo.");
        }
        leadAntigo.setNome(lead.nome());
        leadAntigo.setTelefone(lead.telefone());
        leadAntigo.setEmail(lead.email());
        leadAntigo.setProcedimentoInteresse(lead.procedimentoInteresse());
        leadAntigo.setObservacoes(lead.observacoes());
        leadAntigo.setDataUltimoContato(LocalDateTime.now());
        leadRepository.save(leadAntigo);
    }

    public void registrarContato(Long id, LeadContactRequestDTO leadContact){
        Lead lead = leadRepository.findById(id).orElseThrow(()-> new LeadNotFoundException(id));
        if (!lead.getAtivo()) {
            throw new BusinessException("Não é possível registrar contato em lead inativo.");
        }
        lead.setObservacoes(leadContact.observacoes());
        lead.setDataUltimoContato(LocalDateTime.now());
        leadRepository.save(lead);
    }

    public void encaminharLead(Long id){
        Lead lead = leadRepository.findById(id).orElseThrow(()-> new LeadNotFoundException(id));
        lead.setStatus(LeadStatus.ENCAMINHADO_VENDAS);
        lead.setDataUltimoContato(LocalDateTime.now());
        historicoLeadService.registrarHistorico(new HistoricoLeadCreateDTO(lead.getId(), TipoEvento.ENCAMINHADO, lead.getObservacoes()));
        leadRepository.save(lead);
    }

    public List<LeadResponseDTO> listarLeadsCriadosHojePorFuncionario(){
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        Funcionario funcionario =
                (Funcionario) authentication.getPrincipal();


        LocalDate hoje = LocalDate.now();
        LocalDateTime inicio = hoje.atStartOfDay();
        LocalDateTime fim = hoje.atTime(23, 59, 59);

        List<Lead> leads = leadRepository.findByResponsavelIdAndDataCriacaoBetween(funcionario.getId(),inicio,fim);

        return leads.stream()
                .map(LeadResponseDTO::fromEntity)
                .toList();
    }

    public Long contarLeadsCriadosHojePorFuncionario(){

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        Funcionario funcionario =
                (Funcionario) authentication.getPrincipal();

        LocalDate hoje = LocalDate.now();

        LocalDateTime inicio = hoje.atStartOfDay();
        LocalDateTime fim = hoje.atTime(23, 59, 59);

        return leadRepository.countByResponsavelIdAndDataCriacaoBetween(
                funcionario.getId(),
                inicio,
                fim
        );
    }

    public Integer contarLeadsAtivos(){
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        Funcionario funcionario =
                (Funcionario) authentication.getPrincipal();

        return leadRepository.countByResponsavelIdAndAtivoTrue(funcionario.getId());
    }

    public void desativarLead(Long id){
        Lead lead = leadRepository.findById(id).orElseThrow(()-> new LeadNotFoundException(id));
        lead.setAtivo(false);
        lead.setResponsavel(null);
        lead.setDataUltimoContato(LocalDateTime.now());
        lead.setStatus(LeadStatus.PERDIDO);
        leadRepository.save(lead);
    }

    public List<LeadResponseDTO> listarTodosLeadsPorFuncionario(Long id) {
        return leadRepository.findByResponsavelId(id)
                .stream()
                .map(LeadResponseDTO::fromEntity)
                .toList();
    }

    public List<LeadResponseDTO> listarTodosLeadsPorFuncionarioSemId() {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        Funcionario funcionario =
                (Funcionario) authentication.getPrincipal();

        return leadRepository.findByResponsavelId(funcionario.getId())
                .stream()
                .map(LeadResponseDTO::fromEntity)
                .toList();
    }

    public LeadResponseDTO buscarLeadPorIdPorFuncionario(Long idFunc, Long idLead) {
        return LeadResponseDTO.fromEntity(leadRepository.findByResponsavelIdAndId(idFunc, idLead).orElseThrow(() -> new LeadNotFoundException(idLead)));
    }
}
