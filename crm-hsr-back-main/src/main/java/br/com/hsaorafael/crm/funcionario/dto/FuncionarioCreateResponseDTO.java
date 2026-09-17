package br.com.hsaorafael.crm.funcionario.dto;

import br.com.hsaorafael.crm.common.enums.Setor;
import br.com.hsaorafael.crm.funcionario.Funcionario;

import java.time.LocalDateTime;

public record FuncionarioCreateResponseDTO(
        Long id,
        String nome,
        String email,
        LocalDateTime dataCriacao,
        Setor setor,
        Boolean ativo,
        String senhaTemporaria
) {
    public static FuncionarioCreateResponseDTO fromEntity(Funcionario funcionario, String senhaTemporaria) {
        return new FuncionarioCreateResponseDTO(
                funcionario.getId(),
                funcionario.getNome(),
                funcionario.getEmail(),
                funcionario.getDataCriacao(),
                funcionario.getSetor(),
                funcionario.getAtivo(),
                senhaTemporaria
        );
    }
}
