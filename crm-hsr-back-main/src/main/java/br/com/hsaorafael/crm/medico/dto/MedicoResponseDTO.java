package br.com.hsaorafael.crm.medico.dto;

import br.com.hsaorafael.crm.medico.Medico;

import java.time.LocalDate;
import java.util.List;

public record MedicoResponseDTO(Long id, String nome, String crm, String telefone, String email, List<String> procedimentosAtendidos, LocalDate dataNascimento, String cpf, Boolean ativo) {
    public static MedicoResponseDTO fromEntity(Medico medico){
        return new MedicoResponseDTO(medico.getId(), medico.getNome(), medico.getCrm(), medico.getTelefone(), medico.getEmail(), medico.getProcedimentosAtendidos(), medico.getDataNascimento(), medico.getCpf(), medico.getAtivo());
    }

}
