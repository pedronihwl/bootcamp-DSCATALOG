package com.devnihwl.dscatalog.services;


import com.devnihwl.dscatalog.dto.RoleDTO;
import com.devnihwl.dscatalog.dto.UserDTO;
import com.devnihwl.dscatalog.dto.UserInsertDTO;
import com.devnihwl.dscatalog.entities.User;
import com.devnihwl.dscatalog.repositories.RoleRepository;
import com.devnihwl.dscatalog.repositories.UserRepository;
import com.devnihwl.dscatalog.services.exceptions.DataBaseException;
import com.devnihwl.dscatalog.services.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository repository;

    private final RoleRepository roleRepository;

    private BCryptPasswordEncoder encoder;

    @Autowired
    UserService(UserRepository repository, RoleRepository roleRepository, BCryptPasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.roleRepository = roleRepository;
        encoder = passwordEncoder;
    }

    private void dtoToEntity(User user, UserDTO dto){
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());

        user.getRoles().clear();
        for(RoleDTO role : dto.getRoles()){
            user.getRoles().add(roleRepository.getOne(role.getId()));
        }
    }

    @Transactional (readOnly = true)
    public Page<UserDTO> findAllPaged(Pageable pageRequest){
        Page<User> list = repository.findAll(pageRequest);
        return list.map(UserDTO::new);
    }

    @Transactional
    public UserDTO insert (UserInsertDTO dto){
        User user = new User();
        dtoToEntity(user,dto);
        user.setPassword(encoder.encode(dto.getPassword()));
        user = repository.save(user);
        return new UserDTO(user);
    }

    @Transactional (readOnly = true)
    public UserDTO findById(Long id){
        Optional<User> entity = repository.findById(id);
        User user = entity.orElseThrow(() -> new NotFoundException("Entity was not found"));

        return new UserDTO(user);
    }

    @Transactional
    public UserDTO update(Long id, UserDTO dto) {
        try{
            User u = repository.getOne(id);
            dtoToEntity(u,dto);
            u = repository.save(u);
            return new UserDTO(u);
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
