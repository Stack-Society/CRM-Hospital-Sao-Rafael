package br.com.hsaorafael.crm.common.exceptions;

public class LeadNotFoundException extends NotFoundException {
    public LeadNotFoundException(Long id) {
        super("Lead com ID " + id + " não encontrado.");
    }
}
