package br.com.hsaorafael.crm;

import br.com.hsaorafael.crm.common.enums.LeadOrigem;
import br.com.hsaorafael.crm.common.enums.Setor;
import br.com.hsaorafael.crm.funcionario.FuncionarioService;
import br.com.hsaorafael.crm.funcionario.dto.FuncionarioCreateRequestDTO;
import br.com.hsaorafael.crm.lead.LeadService;
import br.com.hsaorafael.crm.lead.dto.LeadContactRequestDTO;
import br.com.hsaorafael.crm.lead.dto.LeadCreateRequestDTO;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}



//    @Bean
//    public CommandLineRunner teste(LeadService leadService, FuncionarioService funcionarioService) {
//        return args -> {
//
//            System.out.println("Iniciando testes");
//
//
//            try {
//                // Teste 1 - Criar funcionario
//                System.out.println("Criando funcionário...");
//                var funcionario = funcionarioService.cadastroFuncionario(
//                        new FuncionarioCreateRequestDTO(
//                                "João Silva",
//                                "joao@email.com",
//                                LocalDate.of(1990, 2, 8),
//                                Setor.CALL_CENTER
//                        )
//                );
//                System.out.println("Funcionário criado: " + funcionario);
//
//                // Teste 2 - Criar lead
//                System.out.println("Criando lead...");
//                var lead = leadService.cadastroLead(
//                        new LeadCreateRequestDTO(
//                                "Maria Souza",
//                                "11999999999",
//                                "maria@email.com",
//                                "Botox",
//                                LeadOrigem.INSTAGRAM,
//                                "Primeiro contato"
//                        )
//                );
//                System.out.println("Lead criado: " + lead);
//
//                // Teste 3 - Buscar lead
//                System.out.println("Buscando lead...");
//                var leadBuscado = leadService.buscarLeadPorId(lead.id());
//                System.out.println("Lead encontrado: " + leadBuscado);
//
//                // Teste 4 - Registrar contato
//                System.out.println("Registrando contato...");
//                leadService.registrarContato(
//                        lead.id(),
//                        new LeadContactRequestDTO("Cliente respondeu no WhatsApp")
//                );
//
//                System.out.println("Contato registrado com sucesso!");
//
//                // Teste 5 - Listar leads
//                System.out.println("Listando leads...");
//                leadService.listarTodosLeads()
//                        .forEach(System.out::println);
//
//            } catch (Exception e) {
//                System.out.println("Erro durante testes: " + e.getMessage());
//            }
//
//            System.out.println("Testes concluídos");
//        };
//    }

}
