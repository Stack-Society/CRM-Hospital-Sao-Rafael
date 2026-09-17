package br.com.hsaorafael.crm.config;

import br.com.hsaorafael.crm.common.enums.Setor;
import br.com.hsaorafael.crm.funcionario.Funcionario;
import br.com.hsaorafael.crm.funcionario.FuncionarioRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Configuration
public class AdminBootstrapConfig {

    private static final Logger log = LoggerFactory.getLogger(AdminBootstrapConfig.class);

    @Bean
    @ConditionalOnProperty(name = "app.bootstrap-admin.enabled", havingValue = "true")
    CommandLineRunner bootstrapAdmin(
            FuncionarioRepository funcionarioRepository,
            PasswordEncoder passwordEncoder,
            @Value("${app.bootstrap-admin.name}") String name,
            @Value("${app.bootstrap-admin.email}") String email,
            @Value("${app.bootstrap-admin.password}") String password,
            @Value("${app.bootstrap-admin.birth-date}") LocalDate birthDate
    ) {
        return args -> {
            if (email.isBlank() || password.isBlank()) {
                throw new IllegalStateException(
                        "BOOTSTRAP_ADMIN_EMAIL e BOOTSTRAP_ADMIN_PASSWORD são obrigatórios quando o bootstrap está habilitado."
                );
            }

            if (password.length() < 8) {
                throw new IllegalStateException("A senha inicial do administrador deve ter ao menos 8 caracteres.");
            }

            if (funcionarioRepository.findByEmail(email).isPresent()) {
                log.info("Bootstrap ignorado: o usuário administrador {} já existe.", email);
                return;
            }

            Funcionario admin = new Funcionario();
            admin.setNome(name);
            admin.setEmail(email);
            admin.setSenha(passwordEncoder.encode(password));
            admin.setDataNascimento(birthDate);
            admin.setDataCriacao(LocalDateTime.now());
            admin.setAtivo(true);
            admin.setSetor(Setor.ADMIN);
            funcionarioRepository.save(admin);

            log.info("Usuário administrador inicial criado para {}.", email);
        };
    }
}
