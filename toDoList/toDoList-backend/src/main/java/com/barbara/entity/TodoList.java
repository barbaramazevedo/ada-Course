package com.barbara.entity;

import java.util.ArrayList;
import java.util.List;

public class TodoList {
    private static long counter = 1;

    private long id;
    private String title;
    private List<TodoItem> items;

    public TodoList(String title) {
        this.id = counter++;
        this.title = title;
        this.items = new ArrayList<>();
    }

    public long getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public List<TodoItem> getItems() { return items; }
}
