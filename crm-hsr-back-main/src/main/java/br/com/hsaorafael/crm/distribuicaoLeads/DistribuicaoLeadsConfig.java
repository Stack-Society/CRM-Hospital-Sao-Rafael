package br.com.hsaorafael.crm.distribuicaoLeads;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class DistribuicaoLeadsConfig {
    @Id
    private Long id;

    private Integer ultimoIndex;

    public DistribuicaoLeadsConfig() {}

    public DistribuicaoLeadsConfig(Long id, Integer ultimoIndex) {
        this.id = id;
        this.ultimoIndex = ultimoIndex;
    }

}
