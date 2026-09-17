package br.com.hsaorafael.crm.registroContato.dto;

import br.com.hsaorafael.crm.common.enums.ResultadoContato;
import br.com.hsaorafael.crm.common.enums.TipoContato;
import br.com.hsaorafael.crm.lead.Lead;
import br.com.hsaorafael.crm.lead.dto.LeadResponseDTO;
import br.com.hsaorafael.crm.registroContato.RegistroContato;

import java.time.LocalDateTime;

public record RegistroContatoResponseDTO(Long id, TipoContato tipo, ResultadoContato resultado, String observacao, LocalDateTime dataHora) {
    public static RegistroContatoResponseDTO fromEntity(RegistroContato registroContato) {
        return new RegistroContatoResponseDTO(
                registroContato.getId(),
                registroContato.getTipo(),
                registroContato.getResultado(),
                registroContato.getObservacao(),
                registroContato.getDataHora()
        );
    }
}
