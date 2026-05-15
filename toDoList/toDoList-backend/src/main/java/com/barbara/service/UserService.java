package com.barbara.service;

import com.barbara.entity.User;
import com.barbara.util.Validator;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class UserService {
    private final List<User> usuarios = new ArrayList<>();

    public String cadastrar(String nome, String email, String senha, String confirmar) {
        if (nome == null || nome.isBlank()) return "Nome é obrigatório.";
        if (!Validator.isEmailValido(email)) return "Email inválido.";
        if (!Validator.isSenhaValida(senha)) return "A senha deve ter pelo menos 6 caracteres.";
        if (!Validator.senhasConferem(senha, confirmar)) return "As senhas não coincidem.";
        if (buscarPorEmail(email).isPresent()) return "Email já cadastrado.";

        usuarios.add(new User(nome, email, senha));
        return null;
    }

    public Optional<User> login(String email, String senha) {
        return usuarios.stream()
                .filter(u -> u.getEmail().equalsIgnoreCase(email) && u.getPassword().equals(senha))
                .findFirst();
    }

    public Optional<User> buscarPorEmail(String email) {
        return usuarios.stream()
                .filter(u -> u.getEmail().equalsIgnoreCase(email))
                .findFirst();
    }

    public List<User> listar() {
        return usuarios;
    }
}
