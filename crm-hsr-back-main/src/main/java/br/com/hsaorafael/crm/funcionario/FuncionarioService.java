package br.com.hsaorafael.crm.funcionario;

import br.com.hsaorafael.crm.common.enums.Setor;
import br.com.hsaorafael.crm.common.exceptions.BusinessException;
import br.com.hsaorafael.crm.common.exceptions.FuncionarioNotFoundException;
import br.com.hsaorafael.crm.common.utils.PasswordGenerator;
import br.com.hsaorafael.crm.funcionario.dto.FuncionarioCreateRequestDTO;
import br.com.hsaorafael.crm.funcionario.dto.FuncionarioCreateResponseDTO;
import br.com.hsaorafael.crm.funcionario.dto.FuncionarioResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class FuncionarioService {
    private final FuncionarioRepository funcionarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public FuncionarioService(FuncionarioRepository funcionarioRepository) {
        this.funcionarioRepository = funcionarioRepository;
    }

    public FuncionarioResponseDTO dtoConverte(Funcionario funcionario) {
        return new FuncionarioResponseDTO(funcionario.getId(), funcionario.getNome(), funcionario.getEmail(), funcionario.getDataCriacao(), funcionario.getSetor(), funcionario.getAtivo());
    }

    public FuncionarioCreateResponseDTO cadastroFuncionario(FuncionarioCreateRequestDTO funcionario) {
        if (funcionarioRepository.existsByEmail(funcionario.email())){
            throw new BusinessException("Já existe um funcionário com esse email.");
        }

        String senhaTemporaria = PasswordGenerator.gerarSenha();

        String senhaCriptografada = passwordEncoder.encode(senhaTemporaria);

        Funcionario funcionarioCriado = new Funcionario();
        funcionarioCriado.setNome(funcionario.nome());
        funcionarioCriado.setEmail(funcionario.email());
        funcionarioCriado.setSenha(senhaCriptografada);
        funcionarioCriado.setSetor(funcionario.setor());
        funcionarioCriado.setDataNascimento(funcionario.dataNascimento());
        funcionarioCriado.setDataCriacao(LocalDateTime.now());
        funcionarioCriado.setAtivo(true);
        funcionarioRepository.save(funcionarioCriado);

        return FuncionarioCreateResponseDTO.fromEntity(funcionarioCriado, senhaTemporaria);
    }

    public List<FuncionarioResponseDTO> listarTodosFuncionarios() {
        List<Funcionario> funcionarios = funcionarioRepository.findAll();
        return funcionarios.stream().map(this::dtoConverte).toList();
    }

    public FuncionarioResponseDTO buscarPorId(Long id) {
        Funcionario funcionario = funcionarioRepository.findById(id).orElseThrow(() -> new FuncionarioNotFoundException(id));
        return dtoConverte(funcionario);
    }

    public void desativarFuncionario(Long id) {
        Funcionario funcionario = funcionarioRepository.findById(id)
                .orElseThrow(() -> new FuncionarioNotFoundException(id));

        if (!funcionario.getAtivo()){
            throw new BusinessException("Funcionário já está desativado.");
        }

        funcionario.setAtivo(false);

        funcionarioRepository.save(funcionario);
    }

    public void ativarFuncionario(Long id) {
        Funcionario funcionario = funcionarioRepository.findById(id)
                .orElseThrow(() -> new FuncionarioNotFoundException(id));

        if (funcionario.getAtivo()){
            throw new BusinessException("Funcionário já está ativado.");
        }

        funcionario.setAtivo(true);

        funcionarioRepository.save(funcionario);
    }

    public List<FuncionarioResponseDTO> listarTodosFuncionariosPorSetor(Setor setor) {
        List<Funcionario> funcionarios = funcionarioRepository.findBySetorAndAtivoTrueOrderByIdAsc(setor);
        return funcionarios.stream().map(this::dtoConverte).toList();
    }
}
