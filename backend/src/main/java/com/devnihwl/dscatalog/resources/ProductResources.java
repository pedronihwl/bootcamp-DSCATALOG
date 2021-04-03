package com.devnihwl.dscatalog.resources;


import com.devnihwl.dscatalog.dto.CategoryDTO;
import com.devnihwl.dscatalog.dto.ProductDTO;
import com.devnihwl.dscatalog.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping(value = "/products")
public class ProductResources {

    @Autowired
    private ProductService service;

    // Objeto do Spring que encapsula uma resposta HTTP
    // OK 200: Respostas padrão para requisições HTTP bem-sucedidas


    // Busca paginada
    @GetMapping
    public ResponseEntity<Page<ProductDTO>> findAll(
            @RequestParam (value = "page", defaultValue = "0") Integer page,
            @RequestParam (value = "lines", defaultValue = "6") Integer lines,
            @RequestParam (value = "direction", defaultValue = "DESC") String direction,
            @RequestParam (value = "order", defaultValue = "name")  String order
    ){
        PageRequest pageRequest = PageRequest.of(page,lines, Sort.Direction.valueOf(direction),order);
        Page<ProductDTO> list = service.findAllPaged(pageRequest);

        return ResponseEntity.ok().body(list);
    }

    @GetMapping (value = "/{id}")
    public ResponseEntity<ProductDTO> findById(@PathVariable Long id){
        return ResponseEntity.ok().body(service.findById(id));
    }


    @PutMapping (value = "/{id}")
    public ResponseEntity<ProductDTO> update(@PathVariable Long id, @RequestBody ProductDTO dto){
        dto = service.update(id,dto);
        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping (value = "/{id}")
    public ResponseEntity<ProductDTO> delete(@PathVariable Long id){
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<ProductDTO> insert(@RequestBody ProductDTO product){
        product = service.insert(product);

        // Inserir local da inserção no Header. 201 Created
        URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}").buildAndExpand(product.getId()).toUri();

        return ResponseEntity.created(uri).body(product);

    }
}
