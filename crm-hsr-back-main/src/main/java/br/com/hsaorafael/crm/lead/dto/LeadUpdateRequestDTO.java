package br.com.hsaorafael.crm.lead.dto;

import br.com.hsaorafael.crm.common.enums.LeadStatus;

import java.time.LocalDateTime;

public record LeadUpdateRequestDTO(String nome, String telefone, String email, String procedimentoInteresse, String observacoes) {
}

