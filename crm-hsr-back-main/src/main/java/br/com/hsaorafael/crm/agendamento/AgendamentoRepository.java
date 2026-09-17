package br.com.hsaorafael.crm.agendamento;

import br.com.hsaorafael.crm.common.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
    List<Agendamento> findByFuncionarioId(Long funcionarioId);

    List<Agendamento> findTop5ByFuncionarioIdOrderByDiaAgendamentoAscHoraAgendamentoAsc(Long id);

    Optional<Agendamento> findByIdAndFuncionarioId(Long id, Long funcionarioId);

    List<Agendamento> findByFuncionarioIdAndDiaAgendamento(
            Long funcionarioId,
            LocalDate diaAgendamento
    );

    List<Agendamento> findByFuncionarioIdAndDiaAgendamentoAfter(
            Long funcionarioId,
            LocalDate diaAgendamento
    );

    List<Agendamento> findByFuncionarioIdAndStatus(
            Long funcionarioId,
            Status status
    );
}
