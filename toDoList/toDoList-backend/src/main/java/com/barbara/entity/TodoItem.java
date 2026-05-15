package com.barbara.entity;

public class TodoItem {
    private static long counter = 1;

    private long id;
    private String description;
    private boolean completed;

    public TodoItem(String description) {
        this.id = counter++;
        this.description = description;
        this.completed = false;
    }

    public long getId() { return id; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public boolean isCompleted() { return completed; }
    public void setCompleted(boolean completed) { this.completed = completed; }
}
