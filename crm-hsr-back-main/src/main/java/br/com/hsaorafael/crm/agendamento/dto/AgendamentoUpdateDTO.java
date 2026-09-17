package br.com.hsaorafael.crm.agendamento.dto;

import br.com.hsaorafael.crm.common.enums.Procedimento;

import java.time.LocalDate;
import java.time.LocalTime;

public record AgendamentoUpdateDTO(
        Long medicoId,
        Procedimento procedimento,
        LocalDate diaAgendamento,
        LocalTime horaAgendamento,
        String observacoes
) {
}
