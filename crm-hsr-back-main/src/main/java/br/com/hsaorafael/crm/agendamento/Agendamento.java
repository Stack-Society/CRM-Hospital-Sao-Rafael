package br.com.hsaorafael.crm.agendamento;

import br.com.hsaorafael.crm.common.enums.Procedimento;
import br.com.hsaorafael.crm.common.enums.Status;
import br.com.hsaorafael.crm.funcionario.Funcionario;
import br.com.hsaorafael.crm.lead.Lead;
import br.com.hsaorafael.crm.medico.Medico;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "agendamentos")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Agendamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "lead_id", nullable = false)
    private Lead lead;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "funcionario_id", nullable = false)
    private Funcionario funcionario;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "medico_id", nullable = false)
    private Medico medico;

    @Column(nullable = false)
    private LocalTime horaAgendamento;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Procedimento procedimento;

    @Column(nullable = false)
    private LocalDate diaAgendamento;

    @Column(nullable = false)
    private LocalDateTime dataCriacao;

    @Column(columnDefinition = "TEXT")
    private String observacoes;

}
