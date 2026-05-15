package com.barbara.entity;

import java.util.ArrayList;
import java.util.List;

public class Category {
    private static long counter = 1;

    private long id;
    private String name;
    private List<TodoList> lists;

    public Category(String name) {
        this.id = counter++;
        this.name = name;
        this.lists = new ArrayList<>();
    }

    public long getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public List<TodoList> getLists() { return lists; }
}
