package br.com.hsaorafael.crm.auth.jwt;

import br.com.hsaorafael.crm.funcionario.Funcionario;
import br.com.hsaorafael.crm.funcionario.FuncionarioRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final FuncionarioRepository funcionarioRepository;

    public JwtAuthFilter(JwtService jwtService,
                         FuncionarioRepository funcionarioRepository) {
        this.jwtService = jwtService;
        this.funcionarioRepository = funcionarioRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);

        String email;
        try {
            email = jwtService.extrairEmail(token);
        } catch (Exception ex) {
            SecurityContextHolder.clearContext();
            filterChain.doFilter(request, response);
            return;
        }

        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            Funcionario funcionario = funcionarioRepository.findByEmail(email)
                    .orElse(null);

            if (funcionario != null && jwtService.tokenValido(token)) {

                String setor = funcionario.getSetor().name();

                var authority = new SimpleGrantedAuthority("ROLE_" + setor);

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                funcionario,
                                null,
                                List.of(authority)
                        );

                authentication.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        filterChain.doFilter(request, response);
    }
}
