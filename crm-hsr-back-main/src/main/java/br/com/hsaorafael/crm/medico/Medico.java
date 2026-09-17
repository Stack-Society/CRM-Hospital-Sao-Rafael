package br.com.hsaorafael.crm.medico;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.jspecify.annotations.Nullable;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "medicos")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Medico {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false)
    private String crm;


    @Column(nullable = false)
    private String telefone;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private List<String> procedimentosAtendidos;

    @Column(nullable = false)
    private LocalDate dataNascimento;

    @Column(nullable = false)
    private String cpf;

    @Column(nullable = false)
    private Boolean ativo;
}
