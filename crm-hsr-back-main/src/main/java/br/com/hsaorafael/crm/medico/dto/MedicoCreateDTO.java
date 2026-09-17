package br.com.hsaorafael.crm.medico.dto;

import java.time.LocalDate;
import java.util.List;

public record MedicoCreateDTO(String nome, String crm, String telefone, String email, List<String> procedimentosAtendidos, LocalDate dataNascimento, String cpf) {

}
