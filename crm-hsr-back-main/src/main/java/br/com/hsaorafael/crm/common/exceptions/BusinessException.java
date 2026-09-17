package br.com.hsaorafael.crm.common.exceptions;

public class BusinessException extends RuntimeException {
    public BusinessException(String message){
        super(message);
    }
}
