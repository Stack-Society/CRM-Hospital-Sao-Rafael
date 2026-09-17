package br.com.hsaorafael.crm.common.exceptions;

public class FuncionarioNotFoundException extends NotFoundException {
    public FuncionarioNotFoundException(Long id) {
        super("Funcionário com ID " + id + " não encontrado.");
    }
}
