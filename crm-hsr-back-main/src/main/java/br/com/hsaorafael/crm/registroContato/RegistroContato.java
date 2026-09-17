package br.com.hsaorafael.crm.registroContato;

import br.com.hsaorafael.crm.common.enums.ResultadoContato;
import br.com.hsaorafael.crm.common.enums.TipoContato;
import br.com.hsaorafael.crm.funcionario.Funcionario;
import br.com.hsaorafael.crm.lead.Lead;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.jspecify.annotations.Nullable;

import java.time.LocalDateTime;


@Entity
@Table(name = "registro_contato")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegistroContato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "lead_id")
    private Lead lead;

    @ManyToOne
    @JoinColumn(name = "funcionario_id")
    private Funcionario funcionario;

    @Enumerated(EnumType.STRING)
    private TipoContato tipo;

    @Enumerated(EnumType.STRING)
    private ResultadoContato resultado;

    @Column
    private String observacao;

    @Column
    private LocalDateTime dataHora;
}
