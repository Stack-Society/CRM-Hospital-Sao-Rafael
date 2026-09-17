package br.com.hsaorafael.crm.distribuicaoLeads;

import br.com.hsaorafael.crm.common.enums.Setor;
import br.com.hsaorafael.crm.common.exceptions.BusinessException;
import br.com.hsaorafael.crm.funcionario.Funcionario;
import br.com.hsaorafael.crm.funcionario.FuncionarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DistribuicaoLeadsService {
    private final FuncionarioRepository funcionarioRepository;
    private final DistribuicaoLeadsRepository configRepository;

    public DistribuicaoLeadsService(FuncionarioRepository funcionarioRepository,
                                   DistribuicaoLeadsRepository configRepository) {
        this.funcionarioRepository = funcionarioRepository;
        this.configRepository = configRepository;
    }

    @Transactional
    public Funcionario distribuir() {

        List<Funcionario> funcionarios = funcionarioRepository.findBySetorAndAtivoTrueOrderByIdAsc(Setor.CALL_CENTER);

        if (funcionarios.isEmpty()) {
            throw new BusinessException("Nenhum funcionário disponível.");
        }

        DistribuicaoLeadsConfig config = configRepository.findById(1L)
                .orElse(new DistribuicaoLeadsConfig(1L, 0));

        int index = config.getUltimoIndex();

        if (index >= funcionarios.size()) {
            index = 0;
        }

        Funcionario escolhido = funcionarios.get(index);

        int proximoIndex = (index + 1) % funcionarios.size();
        config.setUltimoIndex(proximoIndex);

        configRepository.save(config);

        return escolhido;
    }
}
