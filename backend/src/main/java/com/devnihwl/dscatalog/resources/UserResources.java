package com.devnihwl.dscatalog.resources;


import com.devnihwl.dscatalog.dto.UserDTO;
import com.devnihwl.dscatalog.dto.UserInsertDTO;
import com.devnihwl.dscatalog.dto.UserUpdateDTO;
import com.devnihwl.dscatalog.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping(value = "/users")
public class UserResources {

    @Autowired
    private UserService service;

    // Objeto do Spring que encapsula uma resposta HTTP
    // OK 200: Respostas padrão para requisições HTTP bem-sucedidas


    // Busca paginada
    @GetMapping
    public ResponseEntity<Page<UserDTO>> findAll(Pageable pageable){
        Page<UserDTO> list = service.findAllPaged(pageable);

        return ResponseEntity.ok().body(list);
    }

    @GetMapping (value = "/{id}")
    public ResponseEntity<UserDTO> findById(@PathVariable Long id){
        return ResponseEntity.ok().body(service.findById(id));
    }

    @PutMapping (value = "/{id}")
    public ResponseEntity<UserDTO> update(@PathVariable Long id, @Valid @RequestBody UserUpdateDTO dto){
        UserDTO u = service.update(id,dto);
        return ResponseEntity.ok().body(u);
    }

    @DeleteMapping (value = "/{id}")
    public ResponseEntity<UserDTO> delete(@PathVariable Long id){
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<UserDTO> insert(@Valid @RequestBody UserInsertDTO dto){
        UserDTO userDTO = service.insert(dto);

        // Inserir local da inserção no Header. 201 Created
        URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}").buildAndExpand(userDTO.getId()).toUri();

        return ResponseEntity.created(uri).body(userDTO);
    }
}
