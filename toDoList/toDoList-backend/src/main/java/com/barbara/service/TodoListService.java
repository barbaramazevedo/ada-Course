package com.barbara.service;

import com.barbara.entity.Category;
import com.barbara.entity.TodoList;

import java.util.List;
import java.util.Optional;

public class TodoListService {

    public String adicionar(Category categoria, String titulo) {
        if (titulo == null || titulo.isBlank()) return "Título é obrigatório.";

        categoria.getLists().add(new TodoList(titulo));
        return null;
    }

    public String editar(Category categoria, long id, String novoTitulo) {
        if (novoTitulo == null || novoTitulo.isBlank()) return "Título é obrigatório.";

        Optional<TodoList> lista = buscarPorId(categoria, id);
        if (lista.isEmpty()) return "Lista não encontrada.";

        lista.get().setTitle(novoTitulo);
        return null;
    }

    public String deletar(Category categoria, long id) {
        boolean removida = categoria.getLists().removeIf(l -> l.getId() == id);
        return removida ? null : "Lista não encontrada.";
    }

    public List<TodoList> listar(Category categoria) {
        return categoria.getLists();
    }

    public Optional<TodoList> buscarPorId(Category categoria, long id) {
        return categoria.getLists().stream().filter(l -> l.getId() == id).findFirst();
    }
}
