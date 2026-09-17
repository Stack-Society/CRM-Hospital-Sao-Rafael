package br.com.hsaorafael.crm.funcionario;

import br.com.hsaorafael.crm.common.enums.Setor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {

    Optional<Funcionario> findByEmail(String email);

    boolean existsByEmail(String email);

    List<Funcionario> findBySetorAndAtivoTrueOrderByIdAsc(Setor setor);

}
