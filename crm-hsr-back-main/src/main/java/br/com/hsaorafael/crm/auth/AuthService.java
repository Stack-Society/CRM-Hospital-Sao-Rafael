package br.com.hsaorafael.crm.auth;

import br.com.hsaorafael.crm.auth.dto.AuthResponseDTO;
import br.com.hsaorafael.crm.auth.jwt.JwtService;
import br.com.hsaorafael.crm.common.exceptions.BusinessException;
import br.com.hsaorafael.crm.config.SecurityConfig;
import br.com.hsaorafael.crm.funcionario.Funcionario;
import br.com.hsaorafael.crm.funcionario.FuncionarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    private final FuncionarioRepository funcionarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(FuncionarioRepository funcionarioRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.funcionarioRepository = funcionarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public AuthResponseDTO login(String email, String senha) {
        Funcionario funcionario = funcionarioRepository.findByEmail(email).orElseThrow(() -> new BusinessException("Email ou senha inválidos."));;

        if (!passwordEncoder.matches( senha, funcionario.getSenha())){
            throw new BusinessException("Email ou senha inválidos.");
        }

        if (!funcionario.getAtivo()){
            throw new BusinessException("Funcionário não ativo.");
        }

        String token = jwtService.gerarToken(funcionario);

        return new AuthResponseDTO(token, funcionario.getNome(), funcionario.getSetor());
    }
}
