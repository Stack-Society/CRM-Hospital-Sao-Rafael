package br.com.hsaorafael.crm.agendamento.dto;

import br.com.hsaorafael.crm.common.enums.Procedimento;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

public record AgendamentoCreateDTO(Long leadId, Long medicoId, LocalTime horaAgendamento, Procedimento procedimento, LocalDate diaAgendamento, String observacoes) {
}
