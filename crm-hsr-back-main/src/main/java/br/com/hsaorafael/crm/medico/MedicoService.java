package br.com.hsaorafael.crm.medico;

import br.com.hsaorafael.crm.medico.dto.MedicoCreateDTO;
import br.com.hsaorafael.crm.medico.dto.MedicoResponseDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicoService {
    private final MedicoRepository medicoRepository;

    public MedicoService(MedicoRepository medicoRepository) {
        this.medicoRepository = medicoRepository;
    }

    public void CadastrarMedico(MedicoCreateDTO medicoCreateDTO){
        Medico medico = new Medico();
        medico.setNome(medicoCreateDTO.nome());
        medico.setCpf(medicoCreateDTO.cpf());
        medico.setCrm(medicoCreateDTO.crm());
        medico.setEmail(medicoCreateDTO.email());
        medico.setProcedimentosAtendidos(medicoCreateDTO.procedimentosAtendidos());
        medico.setDataNascimento(medicoCreateDTO.dataNascimento());
        medico.setTelefone(medicoCreateDTO.telefone());
        medico.setAtivo(true);

        medicoRepository.save(medico);
    }

    public List<MedicoResponseDTO> listarTodosMedicos(){
        return medicoRepository.findAll().stream().map(MedicoResponseDTO::fromEntity).toList();
    }
}
