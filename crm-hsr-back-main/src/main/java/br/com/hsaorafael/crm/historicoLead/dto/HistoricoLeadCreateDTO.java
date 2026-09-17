package br.com.hsaorafael.crm.historicoLead.dto;

import br.com.hsaorafael.crm.common.enums.TipoEvento;

public record HistoricoLeadCreateDTO(Long leadId, TipoEvento tipoEvento, String descricao) {
}
