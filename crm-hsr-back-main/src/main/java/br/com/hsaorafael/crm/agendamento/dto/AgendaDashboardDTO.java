package br.com.hsaorafael.crm.agendamento.dto;

public record AgendaDashboardDTO(
        Integer hoje,
        Integer proximos,
        Integer finalizados
) {
}
