package com.devnihwl.dscatalog.resources;


import com.devnihwl.dscatalog.entities.Category;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(value = "/categories")
public class CategoryResources {

    // Objeto do Spring que encapsula uma resposta HTTP
    // OK 200: Respostas padrão para requisições HTTP bem-sucedidas

    @GetMapping
    public ResponseEntity<List<Category>> findAll(){
        List<Category> list = new ArrayList<>();
        list.add(new Category("Books",1L));
        list.add(new Category("Electronics",2L));
        list.add(new Category("Computers",3L));

        return ResponseEntity.ok().body(list);
    }
}
