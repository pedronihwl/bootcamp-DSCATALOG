package com.devnihwl.dscatalog.services;

import com.devnihwl.dscatalog.dto.CategoryDTO;
import com.devnihwl.dscatalog.dto.ProductDTO;
import com.devnihwl.dscatalog.entities.Category;
import com.devnihwl.dscatalog.entities.Product;
import com.devnihwl.dscatalog.repositories.CategoryRepository;
import com.devnihwl.dscatalog.repositories.ProductRepository;
import com.devnihwl.dscatalog.services.exceptions.DataBaseException;
import com.devnihwl.dscatalog.services.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repository;

    @Autowired
    private CategoryRepository catRepository;

//    @Transactional (readOnly = true)
//    public Page<ProductDTO> findAllPaged(Pageable pageRequest, String name, Long categoryId){
//        // getOne pega uma referência do objeto com o Id sem tocar o banco
//        Category cat = (categoryId == 0) ? null : catRepository.getOne(categoryId);
//        Page<Product> list = repository.find(cat, name, pageRequest);
//
//        // return list.stream().map(cat -> new ProductDTO(cat)).collect(Collectors.toList());
//        // Page já é um tipo Stream
//
//        return list.map(ProductDTO::new);
//    }

    @Transactional(readOnly = true)
    public Page<ProductDTO> findAllPaged(Long categoryId, String name, Pageable pageable) {
        List<Category> categories = (categoryId == 0) ? null : Collections.singletonList(catRepository.getOne(categoryId));
        Page<Product> page = repository.find(categories, name, pageable);
        repository.findProductsWithCategories(page.getContent());
        return page.map(x -> new ProductDTO(x, x.getCategories()));
    }

    @Transactional
    public ProductDTO insert (ProductDTO dto){
        Product product = new Product();
        dtoToEntity(dto,product);
        product = repository.save(product);
        return new ProductDTO(product,product.getCategories());
    }

    private void dtoToEntity(ProductDTO dto, Product product){
        product.setName(dto.getName());
        product.setDate(dto.getDate());
        product.setDescription(dto.getDescription());
        product.setPrice(dto.getPrice());
        product.setImgUrl(dto.getImgUrl());

        product.getCategories().clear();
        for(CategoryDTO catDto : dto.getCategories()){
            Category cat = catRepository.getOne(catDto.getId());
            product.getCategories().add(cat);
        }
    }

    @Transactional (readOnly = true)
    public ProductDTO findById(Long id){
        Optional<Product> entity = repository.findById(id);
        Product product = entity.orElseThrow(() -> new NotFoundException("Entity was not found"));

        return new ProductDTO(product,product.getCategories());
    }

    @Transactional
    public ProductDTO update(Long id, ProductDTO dto) {
        try{
            Product prod = repository.getOne(id);
            dtoToEntity(dto,prod);
            prod = repository.save(prod);
            return new ProductDTO(prod);
        } catch (EntityNotFoundException e) {
            throw new NotFoundException("ID not found" + id);
        }
    }

    public void deleteById(Long id) {
        try {
            repository.deleteById(id);
        } catch (EmptyResultDataAccessException e){
            throw new NotFoundException("Id non existent " + id);
        } catch (DataIntegrityViolationException e){
            throw new DataBaseException("Integrity Violation. You cannot delete a Product with products");
        }
    }
}
