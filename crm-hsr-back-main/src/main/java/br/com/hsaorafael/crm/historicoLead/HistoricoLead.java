package br.com.hsaorafael.crm.historicoLead;

import br.com.hsaorafael.crm.common.enums.TipoEvento;
import br.com.hsaorafael.crm.funcionario.Funcionario;
import br.com.hsaorafael.crm.lead.Lead;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Table(name = "historicoLead")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HistoricoLead {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "lead_id")
    private Lead lead;

    @ManyToOne
    @JoinColumn(name = "funcionario_id")
    private Funcionario funcionario;

    @Column
    private TipoEvento tipoEvento;

    @Column(nullable = false)
    private String descricao;

    @Column
    private LocalDateTime dataHora;
}
