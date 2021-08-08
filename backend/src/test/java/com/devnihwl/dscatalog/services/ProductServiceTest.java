package com.devnihwl.dscatalog.services;

import com.devnihwl.dscatalog.dto.ProductDTO;
import com.devnihwl.dscatalog.entities.Category;
import com.devnihwl.dscatalog.entities.Product;
import com.devnihwl.dscatalog.repositories.CategoryRepository;
import com.devnihwl.dscatalog.repositories.ProductRepository;
import com.devnihwl.dscatalog.services.exceptions.DataBaseException;
import com.devnihwl.dscatalog.services.exceptions.NotFoundException;
import org.aspectj.weaver.ast.Not;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.engine.support.hierarchical.ThrowableCollector;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import javax.persistence.EntityNotFoundException;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@ExtendWith(SpringExtension.class)
public class ProductServiceTest {
    static class Factory {

        public static Product createProduct(){
            Product p = new Product(null, "Television", "String description", 199.90, "String imgUrl", new Date().toInstant());
            p.getCategories().add(createCategory());

            return p;
        }

        public static ProductDTO createDTO(){
            Product p = createProduct();
            return new ProductDTO(p,p.getCategories());
        }

        public static Category createCategory(){
            return new Category("Electronics",2L);
        }
    }
    /*  Mock x MockBean
        MockBean usado quando o contexto da Aplicação é carregado.
        Mock usado quando não há carregamento do contexto da aplicação. (Em conjunto com @ExtendWith)
    */

    @Mock
    private ProductRepository repository;

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private ProductService service;

    private Long existent;
    private Long notExistent;
    private Long dependent;
    private Product product;
    private PageImpl<Product> page;
    private ProductDTO dto;

    @BeforeEach
    void setUp() throws Exception{
        existent = 1L;
        notExistent = 100L;
        dependent = 4L;
        product = Factory.createProduct();
        dto = Factory.createDTO();

        // PageImpl é a implementação de uma Page
        page = new PageImpl<>(List.of(product));

        Category cat = Factory.createCategory();


        /*
        * Quando o método não retorna void, o Mockito inicia-se com When
        * Para a simulação de método não é importante o tipo de argumento passado. Para isso
        * usa-se ArgumentMatchers. Porém, quando o método é sobrecarregado é necessário usar typecast
        */

        Mockito.when(repository.findAll((Pageable) ArgumentMatchers.any())).thenReturn(page);
        Mockito.when(repository.save(ArgumentMatchers.any())).thenReturn(product);
        Mockito.when(repository.findById(existent)).thenReturn(Optional.of(product));
        Mockito.when(repository.findById(notExistent)).thenReturn(Optional.empty());

        // Quando cria-se um mock deve criar o comportamento simulado do método a ser usado.
        Mockito.doNothing().when(repository).deleteById(existent);
        Mockito.doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(notExistent);
        Mockito.doThrow(DataIntegrityViolationException.class).when(repository).deleteById(dependent);

        Mockito.when(repository.getOne(existent)).thenReturn(product);
        //Mockito.doThrow(EntityNotFoundException.class).when(repository).getOne(notExistent);
        Mockito.when(repository.getOne(notExistent)).thenThrow(EntityNotFoundException.class);
        Mockito.when(repository.findById(existent)).thenReturn(Optional.of(product));
        Mockito.when(repository.findById(notExistent)).thenReturn(Optional.empty());

        // Não tem que passar o Id de um produto específico e sim de um que exista
        Mockito.when(categoryRepository.getOne(existent)).thenReturn(cat);
        Mockito.when(categoryRepository.getOne(notExistent)).thenThrow(EntityNotFoundException.class);
    }

    // Exercício

    @Test
    void findByShouldReturnProductWhenIdExists(){
        Assertions.assertDoesNotThrow(() -> {
            ProductDTO p = service.findById(existent);
        });

        Assertions.assertNotNull(service.findById(existent));

        //Mockito.verify(repository).findById(existent);
    }

    @Test
    void findByShouldThrowExceptionWhenIdNotExists(){
        Assertions.assertThrows(NotFoundException.class,() -> {
            service.findById(notExistent);
        });
    }

    @Test
    void updateShouldReturnDTOWhenIdExists(){
        // Isso não faz sentido
        ProductDTO p = service.update(existent,dto);
        Assertions.assertNotNull(p);
        //Mockito.verify(categoryRepository, Mockito.times(dto.getCategories().size())).getOne(existent);
        //Mockito.verify(repository).getOne(existent);
    }

    @Test
    void updateShouldThrowExceptionWhenIdNotExists(){
        Assertions.assertThrows(NotFoundException.class, () -> {
            service.update(notExistent,dto);
        });

    }

    @Test
    void findAllPagedShouldReturnPage(){
        Pageable pageable = PageRequest.of(0,10);
        Page<ProductDTO> res = service.findAllPaged(pageable);

        Assertions.assertNotNull(res);

        Mockito.verify(repository).findAll(pageable);
    }

    @Test
    void deleteShouldDoNothingWhenIdExists(){
        Assertions.assertDoesNotThrow(() -> {
            service.deleteById(existent);
        });
        // Verificar se algum método do Mock foi chamada
        Mockito.verify(repository, Mockito.times(1)).deleteById(existent);
    }

    @Test
    void deleteShouldThrowEmptyException(){
        Assertions.assertThrows(NotFoundException.class,() -> {
           service.deleteById(notExistent);
        });

        Mockito.verify(repository).deleteById(notExistent);
    }

    @Test
    void deleteShouldThrowIntegrityException(){
        Assertions.assertThrows(DataBaseException.class,() -> {
            service.deleteById(dependent);
        });

        Mockito.verify(repository).deleteById(dependent);
    }
}
