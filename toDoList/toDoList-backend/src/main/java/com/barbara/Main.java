package com.barbara;

import com.barbara.entity.Category;
import com.barbara.entity.TodoItem;
import com.barbara.entity.TodoList;
import com.barbara.entity.User;
import com.barbara.service.CategoryService;
import com.barbara.service.TodoItemService;
import com.barbara.service.TodoListService;
import com.barbara.service.UserService;

import java.util.List;
import java.util.Optional;
import java.util.Scanner;

public class Main {

    static final Scanner scanner = new Scanner(System.in);
    static final UserService userService = new UserService();
    static final CategoryService categoryService = new CategoryService();
    static final TodoListService listService = new TodoListService();
    static final TodoItemService itemService = new TodoItemService();

    public static void main(String[] args) {
        System.out.println("=== To-Do List ===");

        boolean rodando = true;
        while (rodando) {
            System.out.println("\n1. Cadastrar\n2. Login\n0. Sair");
            System.out.print("Opção: ");
            String opcao = scanner.nextLine().trim();

            switch (opcao) {
                case "1" -> menuCadastro();
                case "2" -> {
                    User usuario = menuLogin();
                    if (usuario != null) menuPrincipal(usuario);
                }
                case "0" -> rodando = false;
                default -> System.out.println("Opção inválida.");
            }
        }

        System.out.println("Até logo!");
    }

    // ─── Cadastro ────────────────────────────────────────────────────────────

    static void menuCadastro() {
        System.out.println("\n--- Cadastro ---");
        System.out.print("Nome: ");
        String nome = scanner.nextLine().trim();

        System.out.print("Email: ");
        String email = scanner.nextLine().trim();

        System.out.print("Senha: ");
        String senha = scanner.nextLine();

        System.out.print("Confirmar senha: ");
        String confirmar = scanner.nextLine();

        String erro = userService.cadastrar(nome, email, senha, confirmar);
        if (erro != null) {
            System.out.println("Erro: " + erro);
        } else {
            System.out.println("Cadastro realizado com sucesso!");
        }
    }

    // ─── Login ───────────────────────────────────────────────────────────────

    static User menuLogin() {
        System.out.println("\n--- Login ---");
        System.out.print("Email: ");
        String email = scanner.nextLine().trim();

        System.out.print("Senha: ");
        String senha = scanner.nextLine();

        Optional<User> usuario = userService.login(email, senha);
        if (usuario.isEmpty()) {
            System.out.println("Email ou senha incorretos.");
            return null;
        }

        System.out.println("Bem-vindo(a), " + usuario.get().getName() + "!");
        return usuario.get();
    }

    // ─── Menu principal (logado) ──────────────────────────────────────────────

    static void menuPrincipal(User usuario) {
        boolean ativo = true;
        while (ativo) {
            System.out.println("\n=== Menu Principal ===");
            System.out.println("1. Ver categorias");
            System.out.println("2. Adicionar categoria");
            System.out.println("3. Editar categoria");
            System.out.println("4. Deletar categoria");
            System.out.println("5. Gerenciar listas de uma categoria");
            System.out.println("0. Sair");
            System.out.print("Opção: ");
            String opcao = scanner.nextLine().trim();

            switch (opcao) {
                case "1" -> listarCategorias(usuario);
                case "2" -> adicionarCategoria(usuario);
                case "3" -> editarCategoria(usuario);
                case "4" -> deletarCategoria(usuario);
                case "5" -> {
                    Category cat = selecionarCategoria(usuario);
                    if (cat != null) menuListas(usuario, cat);
                }
                case "0" -> ativo = false;
                default -> System.out.println("Opção inválida.");
            }
        }
    }

    // ─── Categorias ──────────────────────────────────────────────────────────

    static void listarCategorias(User usuario) {
        List<Category> cats = categoryService.listar(usuario);
        if (cats.isEmpty()) {
            System.out.println("Nenhuma categoria cadastrada.");
            return;
        }
        System.out.println("\n--- Categorias ---");
        for (Category c : cats) {
            System.out.printf("[%d] %s (%d lista(s))%n", c.getId(), c.getName(), c.getLists().size());
        }
    }

    static void adicionarCategoria(User usuario) {
        System.out.print("Nome da categoria: ");
        String nome = scanner.nextLine().trim();
        String erro = categoryService.adicionar(usuario, nome);
        System.out.println(erro != null ? "Erro: " + erro : "Categoria adicionada!");
    }

    static void editarCategoria(User usuario) {
        listarCategorias(usuario);
        System.out.print("ID da categoria para editar: ");
        long id = lerLong();
        System.out.print("Novo nome: ");
        String nome = scanner.nextLine().trim();
        String erro = categoryService.editar(usuario, id, nome);
        System.out.println(erro != null ? "Erro: " + erro : "Categoria atualizada!");
    }

    static void deletarCategoria(User usuario) {
        listarCategorias(usuario);
        System.out.print("ID da categoria para deletar: ");
        long id = lerLong();
        String erro = categoryService.deletar(usuario, id);
        System.out.println(erro != null ? "Erro: " + erro : "Categoria deletada!");
    }

    static Category selecionarCategoria(User usuario) {
        listarCategorias(usuario);
        if (categoryService.listar(usuario).isEmpty()) return null;
        System.out.print("ID da categoria: ");
        long id = lerLong();
        Optional<Category> cat = categoryService.buscarPorId(usuario, id);
        if (cat.isEmpty()) System.out.println("Categoria não encontrada.");
        return cat.orElse(null);
    }

    // ─── Listas ──────────────────────────────────────────────────────────────

    static void menuListas(User usuario, Category categoria) {
        boolean ativo = true;
        while (ativo) {
            System.out.println("\n=== Listas de: " + categoria.getName() + " ===");
            System.out.println("1. Ver listas");
            System.out.println("2. Adicionar lista");
            System.out.println("3. Editar lista");
            System.out.println("4. Deletar lista");
            System.out.println("5. Gerenciar itens de uma lista");
            System.out.println("0. Voltar");
            System.out.print("Opção: ");
            String opcao = scanner.nextLine().trim();

            switch (opcao) {
                case "1" -> listarListas(categoria);
                case "2" -> adicionarLista(categoria);
                case "3" -> editarLista(categoria);
                case "4" -> deletarLista(categoria);
                case "5" -> {
                    TodoList lista = selecionarLista(categoria);
                    if (lista != null) menuItens(lista);
                }
                case "0" -> ativo = false;
                default -> System.out.println("Opção inválida.");
            }
        }
    }

    static void listarListas(Category categoria) {
        List<TodoList> listas = listService.listar(categoria);
        if (listas.isEmpty()) {
            System.out.println("Nenhuma lista nessa categoria.");
            return;
        }
        System.out.println("\n--- Listas ---");
        for (TodoList l : listas) {
            System.out.printf("[%d] %s (%d item(s))%n", l.getId(), l.getTitle(), l.getItems().size());
        }
    }

    static void adicionarLista(Category categoria) {
        System.out.print("Título da lista: ");
        String titulo = scanner.nextLine().trim();
        String erro = listService.adicionar(categoria, titulo);
        System.out.println(erro != null ? "Erro: " + erro : "Lista adicionada!");
    }

    static void editarLista(Category categoria) {
        listarListas(categoria);
        System.out.print("ID da lista para editar: ");
        long id = lerLong();
        System.out.print("Novo título: ");
        String titulo = scanner.nextLine().trim();
        String erro = listService.editar(categoria, id, titulo);
        System.out.println(erro != null ? "Erro: " + erro : "Lista atualizada!");
    }

    static void deletarLista(Category categoria) {
        listarListas(categoria);
        System.out.print("ID da lista para deletar: ");
        long id = lerLong();
        String erro = listService.deletar(categoria, id);
        System.out.println(erro != null ? "Erro: " + erro : "Lista deletada!");
    }

    static TodoList selecionarLista(Category categoria) {
        listarListas(categoria);
        if (listService.listar(categoria).isEmpty()) return null;
        System.out.print("ID da lista: ");
        long id = lerLong();
        Optional<TodoList> lista = listService.buscarPorId(categoria, id);
        if (lista.isEmpty()) System.out.println("Lista não encontrada.");
        return lista.orElse(null);
    }

    // ─── Itens ───────────────────────────────────────────────────────────────

    static void menuItens(TodoList lista) {
        boolean ativo = true;
        while (ativo) {
            System.out.println("\n=== Itens de: " + lista.getTitle() + " ===");
            System.out.println("1. Ver itens");
            System.out.println("2. Adicionar item");
            System.out.println("3. Editar item");
            System.out.println("4. Marcar/desmarcar como concluído");
            System.out.println("5. Deletar item");
            System.out.println("0. Voltar");
            System.out.print("Opção: ");
            String opcao = scanner.nextLine().trim();

            switch (opcao) {
                case "1" -> listarItens(lista);
                case "2" -> adicionarItem(lista);
                case "3" -> editarItem(lista);
                case "4" -> alternarItem(lista);
                case "5" -> deletarItem(lista);
                case "0" -> ativo = false;
                default -> System.out.println("Opção inválida.");
            }
        }
    }

    static void listarItens(TodoList lista) {
        List<TodoItem> itens = itemService.listar(lista);
        if (itens.isEmpty()) {
            System.out.println("Nenhum item nessa lista.");
            return;
        }
        System.out.println("\n--- Itens ---");
        for (TodoItem i : itens) {
            String status = i.isCompleted() ? "[x]" : "[ ]";
            System.out.printf("%s [%d] %s%n", status, i.getId(), i.getDescription());
        }
    }

    static void adicionarItem(TodoList lista) {
        System.out.print("Descrição do item: ");
        String desc = scanner.nextLine().trim();
        String erro = itemService.adicionar(lista, desc);
        System.out.println(erro != null ? "Erro: " + erro : "Item adicionado!");
    }

    static void editarItem(TodoList lista) {
        listarItens(lista);
        System.out.print("ID do item para editar: ");
        long id = lerLong();
        System.out.print("Nova descrição: ");
        String desc = scanner.nextLine().trim();
        String erro = itemService.editar(lista, id, desc);
        System.out.println(erro != null ? "Erro: " + erro : "Item atualizado!");
    }

    static void alternarItem(TodoList lista) {
        listarItens(lista);
        System.out.print("ID do item: ");
        long id = lerLong();
        String erro = itemService.alternarConcluido(lista, id);
        System.out.println(erro != null ? "Erro: " + erro : "Status alterado!");
    }

    static void deletarItem(TodoList lista) {
        listarItens(lista);
        System.out.print("ID do item para deletar: ");
        long id = lerLong();
        String erro = itemService.deletar(lista, id);
        System.out.println(erro != null ? "Erro: " + erro : "Item deletado!");
    }

    // ─── Utilitário ──────────────────────────────────────────────────────────

    static long lerLong() {
        try {
            return Long.parseLong(scanner.nextLine().trim());
        } catch (NumberFormatException e) {
            return -1;
        }
    }
}
