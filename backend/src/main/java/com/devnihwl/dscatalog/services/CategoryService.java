package com.devnihwl.dscatalog.services;

import com.devnihwl.dscatalog.dto.CategoryDTO;
import com.devnihwl.dscatalog.entities.Category;
import com.devnihwl.dscatalog.repositories.CategoryRepository;
import com.devnihwl.dscatalog.services.exceptions.DataBaseException;
import com.devnihwl.dscatalog.services.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
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

    @Transactional
    public CategoryDTO insert (CategoryDTO dto){
        Category category = new Category(dto);
        category = repository.save(category);
        return new CategoryDTO(category);
    }

    @Transactional (readOnly = true)
    public CategoryDTO findById(Long id){
        Optional<Category> entity = repository.findById(id);
        Category category = entity.orElseThrow(() -> new NotFoundException("Entity was not found"));

        return new CategoryDTO(category);
    }

    @Transactional
    public CategoryDTO update(Long id, CategoryDTO dto) {
        try{
            Category cat = repository.getOne(id);
            cat.setName(dto.getName());
            cat = repository.save(cat);
            return new CategoryDTO(cat);
        } catch (EntityNotFoundException e) {
            throw new NotFoundException("ID not found" + id);
        }
    }

    public void deleteById(Long id) {
        try {
            repository.deleteById(id);
        } catch (EmptyResultDataAccessException e){
            throw new NotFoundException("Id non existent" + id);
        } catch (DataIntegrityViolationException e){
            throw new DataBaseException("Integrity Violation. You cannot delete a category with products");
        }
    }
}
