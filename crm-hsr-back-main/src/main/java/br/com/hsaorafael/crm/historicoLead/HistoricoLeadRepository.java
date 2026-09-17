package br.com.hsaorafael.crm.historicoLead;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface HistoricoLeadRepository extends JpaRepository<HistoricoLead, Long> {
    List<HistoricoLead> findByLeadId(Long leadId);

    List<HistoricoLead> findByFuncionarioId(Long id);


}
