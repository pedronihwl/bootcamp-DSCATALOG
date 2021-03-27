package com.devnihwl.dscatalog.dto;

import com.devnihwl.dscatalog.entities.Category;

import java.io.Serializable;

public class CategoryDTO implements Serializable {
    private Long id;

    private String name;

    public CategoryDTO(){

    }

    public CategoryDTO(Category category) {
        this.name = category.getName();
        this.id = category.getId();
    }

    public String getName() {

        return name;
    }

    public void setName(String name) {

        this.name = name;
    }

    public Long getId() {

        return id;
    }

    public void setId(Long id) {

        this.id = id;
    }
}
