package com.barbara.util;

public class Validator {

    public static boolean isEmailValido(String email) {
        return email != null && email.matches("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
    }

    public static boolean isSenhaValida(String senha) {
        return senha != null && senha.length() >= 6;
    }

    public static boolean senhasConferem(String senha, String confirmar) {
        return senha != null && senha.equals(confirmar);
    }
}
