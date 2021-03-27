package com.devnihwl.dscatalog.services;

import com.devnihwl.dscatalog.dto.CategoryDTO;
import com.devnihwl.dscatalog.entities.Category;
import com.devnihwl.dscatalog.repositories.CategoryRepository;
import com.devnihwl.dscatalog.services.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository repository;

    @Transactional (readOnly = true)
    public List<CategoryDTO> findAll(){
        List<Category> list = repository.findAll();

        // return list.stream().map(cat -> new CategoryDTO(cat)).collect(Collectors.toList());
        return list.stream().map(CategoryDTO::new).collect(Collectors.toList());
    }

    @Transactional (readOnly = true)
    public CategoryDTO findById(Long id){
        Optional<Category> entity = repository.findById(id);
        Category category = entity.orElseThrow(() -> new NotFoundException("Entity was not found"));

        return new CategoryDTO(category);
    }


}
