package com.devnihwl.dscatalog.repositories;

import com.devnihwl.dscatalog.entities.Category;
import com.devnihwl.dscatalog.entities.Product;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.Instant;

@DataJpaTest
public class ProductRepositoryTest {

    private long idExist;
    private long idNotExist;

    @BeforeEach
    void setUp() throws Exception{
        idExist = 24;
        idNotExist = 26;
    }

    @Autowired
    private ProductRepository repository;

    @Test
    void deleteShouldDeleteProductWhenValidProductId(){
        long expected = 1L;

        repository.deleteById(expected);

        Assertions.assertFalse(repository.findById(expected).isPresent());

    }

    // Exercício

    @Test
    void findByIdShouldGetOptionalWhenIdExists(){
        Assertions.assertFalse(repository.findById(idExist).isEmpty());
    }

    @Test
    void findByIdShouldGetOptionalEmptyWhenIdExists(){
        Assertions.assertTrue(repository.findById(idNotExist).isEmpty());
    }
}
