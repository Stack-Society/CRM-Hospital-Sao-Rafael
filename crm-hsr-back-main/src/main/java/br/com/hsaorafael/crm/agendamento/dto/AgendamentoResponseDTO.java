package br.com.hsaorafael.crm.agendamento.dto;

import br.com.hsaorafael.crm.agendamento.Agendamento;
import br.com.hsaorafael.crm.common.enums.Procedimento;
import br.com.hsaorafael.crm.common.enums.Status;

import java.time.LocalDate;
import java.time.LocalTime;

public record AgendamentoResponseDTO(Long id, Long medicoId, Status status, String nomeLead, String nomeMedico, LocalTime horaAgendamento, Procedimento procedimento, LocalDate diaAgendamento, String observacoes) {
    public static AgendamentoResponseDTO fromEntity(Agendamento agendamento){
        return new AgendamentoResponseDTO(agendamento.getId(),agendamento.getMedico().getId(), agendamento.getStatus(), agendamento.getLead().getNome(), agendamento.getMedico().getNome(), agendamento.getHoraAgendamento(), agendamento.getProcedimento(), agendamento.getDiaAgendamento(), agendamento.getObservacoes());
    }

}
