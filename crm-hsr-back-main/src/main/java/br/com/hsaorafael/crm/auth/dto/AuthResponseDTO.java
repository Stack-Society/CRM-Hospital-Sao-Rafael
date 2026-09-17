package br.com.hsaorafael.crm.auth.dto;

import br.com.hsaorafael.crm.common.enums.Setor;

public record AuthResponseDTO (String token, String nome, Setor setor) {
}
