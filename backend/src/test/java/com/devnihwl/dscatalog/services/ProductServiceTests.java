package com.devnihwl.dscatalog.services;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;

import java.util.List;
import java.util.Optional;

import com.devnihwl.dscatalog.dto.ProductDTO;
import com.devnihwl.dscatalog.entities.Product;
import com.devnihwl.dscatalog.repositories.ProductRepository;
import com.devnihwl.dscatalog.services.exceptions.DataBaseException;
import com.devnihwl.dscatalog.services.exceptions.NotFoundException;
import com.devnihwl.dscatalog.tests.Factory;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
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



@ExtendWith(SpringExtension.class)
public class ProductServiceTests {

	@InjectMocks
	private ProductService service;
	
	@Mock
	private ProductRepository repository;
	
	private long existingId;
	private long nonExistingId;
	private long dependentId;
	private Product product;
	private PageImpl<Product> page;
	
	@BeforeEach
	void setUp() throws Exception {
		existingId = 1L;
		nonExistingId = 2L;
		dependentId = 3L;
		product = Factory.createProduct();
		page = new PageImpl<>(List.of(product));
		
		Mockito.when(repository.findAll((Pageable)any())).thenReturn(page);
		
		Mockito.when(repository.save(any())).thenReturn(product);
		
		Mockito.when(repository.findById(existingId)).thenReturn(Optional.of(product));
		Mockito.when(repository.findById(nonExistingId)).thenReturn(Optional.empty());
		
		Mockito.when(repository.find(any(), any(), any())).thenReturn(page);
		
		Mockito.doNothing().when(repository).deleteById(existingId);
		Mockito.doThrow(EmptyResultDataAccessException.class).when(repository).deleteById(nonExistingId);
		Mockito.doThrow(DataIntegrityViolationException.class).when(repository).deleteById(dependentId);
	}

	@Test
	public void findAllPagedShouldReturnPage() {
		
		Pageable pageable = PageRequest.of(0, 12);
		
		Page<ProductDTO> result = service.findAllPaged(0L, "", pageable);
		
		Assertions.assertNotNull(result);
	}
	
	@Test
	public void deleteShouldThrowDatabaseExceptionWhenDependentId() {
		
		Assertions.assertThrows(DataBaseException.class, () -> {
			service.deleteById(dependentId);
		});
		
		Mockito.verify(repository, times(1)).deleteById(dependentId);
	}
	
	@Test
	public void deleteShouldThrowResourceNotFoundExceptionWhenIdDoesNotExist() {
		
		Assertions.assertThrows(NotFoundException.class, () -> {
			service.deleteById(nonExistingId);
		});

		Mockito.verify(repository, times(1)).deleteById(nonExistingId);
	}
	
	@Test
	public void deleteShouldDoNothingWhenIdExists() {
		
		Assertions.assertDoesNotThrow(() -> {
			service.deleteById(existingId);
		});
		
		Mockito.verify(repository, times(1)).deleteById(existingId);
	}
}