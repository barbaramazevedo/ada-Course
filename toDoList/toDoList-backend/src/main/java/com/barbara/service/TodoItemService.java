package com.barbara.service;

import com.barbara.entity.TodoItem;
import com.barbara.entity.TodoList;

import java.util.List;
import java.util.Optional;

public class TodoItemService {

    public String adicionar(TodoList lista, String descricao) {
        if (descricao == null || descricao.isBlank()) return "Descrição é obrigatória.";

        lista.getItems().add(new TodoItem(descricao));
        return null;
    }

    public String editar(TodoList lista, long id, String novaDescricao) {
        if (novaDescricao == null || novaDescricao.isBlank()) return "Descrição é obrigatória.";

        Optional<TodoItem> item = buscarPorId(lista, id);
        if (item.isEmpty()) return "Item não encontrado.";

        item.get().setDescription(novaDescricao);
        return null;
    }

    public String alternarConcluido(TodoList lista, long id) {
        Optional<TodoItem> item = buscarPorId(lista, id);
        if (item.isEmpty()) return "Item não encontrado.";

        item.get().setCompleted(!item.get().isCompleted());
        return null;
    }

    public String deletar(TodoList lista, long id) {
        boolean removido = lista.getItems().removeIf(i -> i.getId() == id);
        return removido ? null : "Item não encontrado.";
    }

    public List<TodoItem> listar(TodoList lista) {
        return lista.getItems();
    }

    public Optional<TodoItem> buscarPorId(TodoList lista, long id) {
        return lista.getItems().stream().filter(i -> i.getId() == id).findFirst();
    }
}
