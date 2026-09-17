package br.com.hsaorafael.crm.funcionario.dto;

import br.com.hsaorafael.crm.common.enums.Setor;

import java.time.LocalDate;

public record FuncionarioCreateRequestDTO (String nome, String email, LocalDate dataNascimento, Setor setor) {
}
