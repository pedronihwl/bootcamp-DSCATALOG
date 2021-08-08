package com.devnihwl.dscatalog.resources;

import com.devnihwl.dscatalog.dto.ProductDTO;
import com.devnihwl.dscatalog.entities.Category;
import com.devnihwl.dscatalog.entities.Product;
import com.devnihwl.dscatalog.services.ProductService;
import com.devnihwl.dscatalog.services.exceptions.NotFoundException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.ResultMatcher;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Date;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;

@WebMvcTest(ProductResources.class)
public class ProductResourceTest {

    static class Factory {
        public static Product createProduct(){
            Product p = new Product(1L, "Television", "String description", 199.90, "String imgUrl", new Date().toInstant());
            p.getCategories().add(createCategory());

            return p;
        }

        public static ProductDTO createDTO(){
            Product p = createProduct();
            return new ProductDTO(p,p.getCategories());
        }

        public static Category createCategory(){
            return new Category("Electronics",22L);
        }
    }

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService service;

    @Autowired
    private ObjectMapper mapper;


    private ProductDTO dto;
    private PageImpl<ProductDTO> page;
    private long existing;
    private long notExisting;

    @BeforeEach
    void setup(){
        existing = 10L;
        notExisting = 100L;
        dto = Factory.createDTO();
        page = new PageImpl<>(List.of(dto));

        // Simular service.findAllPaged
        when(service.findAllPaged(any())).thenReturn(page);

        // Simular service.findById
        when(service.findById(existing)).thenReturn(dto);
        when(service.findById(notExisting)).thenThrow(NotFoundException.class);

        // Simular service.update
        // Quando usa-se any() o outro argumento não poderá ser um tipo simples
        when(service.update(eq(existing),any())).thenReturn(dto);
        when(service.update(eq(notExisting),any())).thenThrow(NotFoundException.class);


        //Simular service.insert
        when(service.insert(any())).thenReturn(dto);

        // Simular service.delete
        doNothing().when(service).deleteById(existing);
        doThrow(NotFoundException.class).when(service).deleteById(notExisting);

    }

    @Test
    void insertShouldReturnSameDTO() throws Exception {
        String json = mapper.writeValueAsString(dto);
        ResultActions result = mockMvc.perform(MockMvcRequestBuilders.post("/products")
                .content(json).contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON));

        result.andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    void deleteShouldNoContentWhenIdExists() throws Exception{
        ResultActions result = mockMvc.perform(MockMvcRequestBuilders.delete("/products/{id}",existing)
                .accept(MediaType.APPLICATION_JSON));

        result.andExpect(MockMvcResultMatchers.status().isNoContent());
    }

    @Test
    void deleteShould404WhenIdNotExists() throws Exception{
        ResultActions result = mockMvc.perform(MockMvcRequestBuilders.delete("/products/{id}",notExisting)
                .accept(MediaType.APPLICATION_JSON));

        result.andExpect(MockMvcResultMatchers.status().isNotFound());
    }



    @Test
    void findAllShouldReturnPage() throws Exception{
        mockMvc.perform(MockMvcRequestBuilders
                .get("/products").accept(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void findByIdShouldReturnObjectWhenIdExists() throws Exception{
        ResultActions result = mockMvc.perform(MockMvcRequestBuilders.get("/products/{id}",existing).accept(MediaType.APPLICATION_JSON));

        result.andExpect(MockMvcResultMatchers.status().isOk());
        result.andExpect(MockMvcResultMatchers.jsonPath("$.name").exists());
        result.andExpect(MockMvcResultMatchers.jsonPath("$.id").exists());
    }

    @Test
    void findByIdShouldThrownWhenIdNotExists() throws Exception{
        ResultActions result = mockMvc.perform(MockMvcRequestBuilders.get("/products/{id}",notExisting).accept(MediaType.APPLICATION_JSON));
        result.andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @Test
    void updateShouldReturnObjectWhenIdExists() throws Exception{
        String json = mapper.writeValueAsString(dto);

        // content - Conteúdo da requisição, accept - Conteúdo da resposta
        ResultActions result = mockMvc.perform(MockMvcRequestBuilders.put("/products/{id}",existing)
                .content(json).contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON));

        result.andExpect(MockMvcResultMatchers.status().isOk());
        result.andExpect(MockMvcResultMatchers.jsonPath("$.name").exists());
        result.andExpect(MockMvcResultMatchers.jsonPath("$.id").exists());
    }


}
