package br.com.hsaorafael.crm.funcionario.dto;

import br.com.hsaorafael.crm.common.enums.Setor;
import br.com.hsaorafael.crm.funcionario.Funcionario;
import org.jspecify.annotations.Nullable;

import java.time.LocalDate;
import java.time.LocalDateTime;

public record FuncionarioResponseDTO(Long id, String nome, String email, LocalDateTime dataCriacao, Setor setor, Boolean ativo) {
    public static FuncionarioResponseDTO fromEntity(Funcionario f) {
        
        return new FuncionarioResponseDTO(
                f.getId(),
                f.getNome(),
                f.getEmail(),
                f.getDataCriacao(),
                f.getSetor(),
                f.getAtivo()
        );
    }
}
