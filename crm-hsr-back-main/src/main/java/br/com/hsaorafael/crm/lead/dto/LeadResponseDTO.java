package br.com.hsaorafael.crm.lead.dto;

import br.com.hsaorafael.crm.common.enums.LeadOrigem;
import br.com.hsaorafael.crm.common.enums.LeadStatus;
import br.com.hsaorafael.crm.lead.Lead;

import java.time.LocalDateTime;

public record LeadResponseDTO(
        Long id,
        String nome,
        String telefone,
        String email,
        String procedimentoInteresse,
        LeadOrigem origem,
        LeadStatus status,
        String responsavelNome,
        LocalDateTime dataCriacao,
        LocalDateTime dataUltimoContato,
        String observacoes,
        Boolean ativo,
        String preferenciaMedico
) {
    public static LeadResponseDTO fromEntity(Lead lead) {
        return new LeadResponseDTO(
                lead.getId(),
                lead.getNome(),
                lead.getTelefone(),
                lead.getEmail(),
                lead.getProcedimentoInteresse(),
                lead.getOrigem(),
                lead.getStatus(),
                lead.getResponsavel() != null ? lead.getResponsavel().getNome() : null,
                lead.getDataCriacao(),
                lead.getDataUltimoContato(),
                lead.getObservacoes(),
                lead.getAtivo(),
                lead.getPreferenciaMedico()
        );
    }
}
