package br.com.hsaorafael.crm.common.utils;

import java.security.SecureRandom;

public class PasswordGenerator {

    private static final String CARACTERES =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$!";
    private static final int TAMANHO_PADRAO = 10;

    private static final SecureRandom RANDOM = new SecureRandom();

    public static String gerarSenha() {
        StringBuilder senha = new StringBuilder();

        for (int i = 0; i < TAMANHO_PADRAO; i++) {
            int index = RANDOM.nextInt(CARACTERES.length());
            senha.append(CARACTERES.charAt(index));
        }

        return senha.toString();
    }
}
