package br.com.hsaorafael.crm.historicoLead.dto;

import br.com.hsaorafael.crm.common.enums.TipoEvento;
import br.com.hsaorafael.crm.funcionario.Funcionario;
import br.com.hsaorafael.crm.historicoLead.HistoricoLead;
import br.com.hsaorafael.crm.lead.Lead;

import java.time.LocalDateTime;

public record HistoricoLeadResponseDTO(Long id, Long leadId, String leadNome,Long funcionarioId, String funcionarioNome, TipoEvento tipoEvento, String descricao, LocalDateTime dataHora) {
    public static HistoricoLeadResponseDTO fromEntity(HistoricoLead historicoLead){
        return new HistoricoLeadResponseDTO(
                historicoLead.getId(), historicoLead.getLead().getId(), historicoLead.getLead().getNome(), historicoLead.getFuncionario().getId(), historicoLead.getFuncionario().getNome(), historicoLead.getTipoEvento()
                ,historicoLead.getDescricao(), historicoLead.getDataHora()
        );
    }
}
