package br.com.hsaorafael.crm.agendamento;

import br.com.hsaorafael.crm.agendamento.dto.AgendaDashboardDTO;
import br.com.hsaorafael.crm.agendamento.dto.AgendamentoCreateDTO;
import br.com.hsaorafael.crm.agendamento.dto.AgendamentoResponseDTO;
import br.com.hsaorafael.crm.agendamento.dto.AgendamentoUpdateDTO;
import br.com.hsaorafael.crm.common.enums.Status;
import br.com.hsaorafael.crm.common.exceptions.LeadNotFoundException;
import br.com.hsaorafael.crm.common.exceptions.NotFoundException;
import br.com.hsaorafael.crm.funcionario.Funcionario;
import br.com.hsaorafael.crm.lead.LeadRepository;
import br.com.hsaorafael.crm.lead.LeadService;
import br.com.hsaorafael.crm.medico.Medico;
import br.com.hsaorafael.crm.medico.MedicoRepository;
import com.sun.tools.jconsole.JConsoleContext;
import org.jspecify.annotations.Nullable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class AgendamentoService {
    private final AgendamentoRepository agendamentoRepository;
    private final LeadRepository leadRepository;
    private final MedicoRepository medicoRepository;

    public AgendamentoService(AgendamentoRepository agendamentoRepository, LeadRepository leadRepository, MedicoRepository medicoRepository) {
        this.agendamentoRepository = agendamentoRepository;
        this.leadRepository = leadRepository;
        this.medicoRepository = medicoRepository;
    }

    public void marcarAgendamento(AgendamentoCreateDTO agendamentoCreateDTO){
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        Funcionario funcionario =
                (Funcionario) authentication.getPrincipal();

        System.out.println(agendamentoCreateDTO.diaAgendamento());

        Agendamento agendamento = new Agendamento();
        agendamento.setLead(leadRepository.findById(agendamentoCreateDTO.leadId()).orElseThrow(() -> new LeadNotFoundException(agendamentoCreateDTO.leadId())));
        agendamento.setFuncionario(funcionario);
        agendamento.setMedico(medicoRepository.findById(agendamentoCreateDTO.medicoId()).orElseThrow(() -> new NotFoundException("Medico nao encontrado")));
        agendamento.setDiaAgendamento(agendamentoCreateDTO.diaAgendamento());
        agendamento.setProcedimento(agendamentoCreateDTO.procedimento());
        agendamento.setHoraAgendamento(agendamentoCreateDTO.horaAgendamento());
        agendamento.setDataCriacao(LocalDateTime.now());
        agendamento.setObservacoes(agendamentoCreateDTO.observacoes());
        agendamento.setStatus(Status.AGENDADO);

        agendamentoRepository.save(agendamento);
    }

    public List<AgendamentoResponseDTO> listarAgendamentosPorFuncionario(){
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        Funcionario funcionario =
                (Funcionario) authentication.getPrincipal();

        return agendamentoRepository.findByFuncionarioId(funcionario.getId()).stream().map(AgendamentoResponseDTO::fromEntity).toList();
    }

    public List<AgendamentoResponseDTO> listarProximosAgendamentosPorFuncionario(){
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        Funcionario funcionario =
                (Funcionario) authentication.getPrincipal();

        return agendamentoRepository.findTop5ByFuncionarioIdOrderByDiaAgendamentoAscHoraAgendamentoAsc(funcionario.getId()).stream().map(AgendamentoResponseDTO::fromEntity).toList();
    }

    public AgendamentoResponseDTO buscarAgendamentoPorId(Long idAgendamento){
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        Funcionario funcionario =
                (Funcionario) authentication.getPrincipal();

        Agendamento agendamento = agendamentoRepository
                .findByIdAndFuncionarioId(idAgendamento, funcionario.getId())
                .orElseThrow(() -> new NotFoundException("Agendamento não encontrado"));

        return AgendamentoResponseDTO.fromEntity(agendamento);
    }

    public List<AgendamentoResponseDTO> listarTodosAgendamentos(){
        return agendamentoRepository.findAll().stream().map(AgendamentoResponseDTO::fromEntity).toList();
    }

    public AgendamentoResponseDTO atualizar(Long id, AgendamentoUpdateDTO dto) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        Funcionario funcionario =
                (Funcionario) authentication.getPrincipal();

        Agendamento agendamento = agendamentoRepository
                .findByIdAndFuncionarioId(id, funcionario.getId())
                .orElseThrow(() -> new NotFoundException("Agendamento não encontrado"));

        Medico medico = medicoRepository
                .findById(dto.medicoId())
                .orElseThrow(() -> new NotFoundException("Médico não encontrado"));

        agendamento.setMedico(medico);
        agendamento.setProcedimento(dto.procedimento());
        agendamento.setDiaAgendamento(dto.diaAgendamento());
        agendamento.setHoraAgendamento(dto.horaAgendamento());
        agendamento.setObservacoes(dto.observacoes());

        agendamentoRepository.save(agendamento);

        return AgendamentoResponseDTO.fromEntity(agendamento);
    }

    public void cancelar(Long id) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        Funcionario funcionario =
                (Funcionario) authentication.getPrincipal();

        Agendamento agendamento = agendamentoRepository
                .findByIdAndFuncionarioId(id, funcionario.getId())
                .orElseThrow(() -> new NotFoundException("Agendamento não encontrado"));

        agendamento.setStatus(Status.CANCELADO);

        agendamentoRepository.save(agendamento);
    }

    public List<AgendamentoResponseDTO> listarPorFuncionario(String filtro) {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        Funcionario funcionario =
                (Funcionario) authentication.getPrincipal();

        List<Agendamento> agendamentos;

        if (filtro == null || filtro.equals("todas")) {

            agendamentos =
                    agendamentoRepository.findByFuncionarioId(funcionario.getId());

        } else if (filtro.equals("hoje")) {

            agendamentos =
                    agendamentoRepository.findByFuncionarioIdAndDiaAgendamento(
                            funcionario.getId(),
                            LocalDate.now()
                    );

        } else if (filtro.equals("proximos")) {

            agendamentos =
                    agendamentoRepository
                            .findByFuncionarioIdAndDiaAgendamentoAfter(
                                    funcionario.getId(),
                                    LocalDate.now()
                            );

        } else if (filtro.equals("finalizados")) {

            agendamentos =
                    agendamentoRepository
                            .findByFuncionarioIdAndStatus(
                                    funcionario.getId(),
                                    Status.FINALIZADO
                            );

        } else {

            agendamentos = List.of();
        }

        return agendamentos.stream()
                .map(AgendamentoResponseDTO::fromEntity)
                .toList();
    }

    public AgendaDashboardDTO dashboard() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        Funcionario funcionario =
                (Funcionario) authentication.getPrincipal();

        List<Agendamento> agendamentos =
                agendamentoRepository.findByFuncionarioId(funcionario.getId());

        LocalDate hoje = LocalDate.now();

        int hojeCount = (int) agendamentos.stream()
                .filter(a -> a.getDiaAgendamento().equals(hoje))
                .count();

        int proximosCount = (int) agendamentos.stream()
                .filter(a -> a.getDiaAgendamento().isAfter(hoje))
                .count();

        int finalizadosCount = (int) agendamentos.stream()
                .filter(a -> a.getStatus() == Status.FINALIZADO)
                .count();

        return new AgendaDashboardDTO(
                hojeCount,
                proximosCount,
                finalizadosCount
        );
    }
}
