package br.com.hsaorafael.crm.lead.dto;

import br.com.hsaorafael.crm.common.enums.LeadOrigem;

public record LeadCreateRequestDTO (String nome, String telefone, String email, String procedimentoInteresse, LeadOrigem origem, String observacoes, String preferenciaMedico) {
}
