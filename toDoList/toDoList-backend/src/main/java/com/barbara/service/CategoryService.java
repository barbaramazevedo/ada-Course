package com.barbara.service;

import com.barbara.entity.Category;
import com.barbara.entity.User;

import java.util.List;
import java.util.Optional;

public class CategoryService {

    public String adicionar(User usuario, String nome) {
        if (nome == null || nome.isBlank()) return "Nome da categoria é obrigatório.";
        if (buscarPorNome(usuario, nome).isPresent()) return "Já existe uma categoria com esse nome.";

        usuario.getCategories().add(new Category(nome));
        return null;
    }

    public String editar(User usuario, long id, String novoNome) {
        if (novoNome == null || novoNome.isBlank()) return "Nome da categoria é obrigatório.";

        Optional<Category> cat = buscarPorId(usuario, id);
        if (cat.isEmpty()) return "Categoria não encontrada.";

        cat.get().setName(novoNome);
        return null;
    }

    public String deletar(User usuario, long id) {
        boolean removida = usuario.getCategories().removeIf(c -> c.getId() == id);
        return removida ? null : "Categoria não encontrada.";
    }

    public List<Category> listar(User usuario) {
        return usuario.getCategories();
    }

    public Optional<Category> buscarPorId(User usuario, long id) {
        return usuario.getCategories().stream().filter(c -> c.getId() == id).findFirst();
    }

    private Optional<Category> buscarPorNome(User usuario, String nome) {
        return usuario.getCategories().stream()
                .filter(c -> c.getName().equalsIgnoreCase(nome))
                .findFirst();
    }
}
