package br.com.hsaorafael.crm.registroContato.dto;

import br.com.hsaorafael.crm.common.enums.ResultadoContato;
import br.com.hsaorafael.crm.common.enums.TipoContato;

public record RegistroContatoCreateDTO(Long leadId, TipoContato tipoContato, ResultadoContato resultadoContato, String observacao) {
}
