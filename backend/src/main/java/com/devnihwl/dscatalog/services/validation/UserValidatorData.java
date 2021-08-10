package com.devnihwl.dscatalog.services.validation;

import java.util.*;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import com.devnihwl.dscatalog.dto.UserInsertDTO;
import com.devnihwl.dscatalog.repositories.UserRepository;
import com.devnihwl.dscatalog.resources.exceptions.FieldMessage;
import org.springframework.beans.factory.annotation.Autowired;

public class UserValidatorData implements ConstraintValidator<UserValid, UserInsertDTO> {

    @Autowired
    private UserRepository repository;

    @Override
    public boolean isValid(UserInsertDTO dto, ConstraintValidatorContext context) {

        List<FieldMessage> list = new ArrayList<>();

        if(repository.findByEmail(dto.getEmail()) != null){
            list.add(new FieldMessage("email","Email já existe no banco de dados"));
        }

        for(FieldMessage f : list){
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(f.getMessage()).addPropertyNode(f.getFieldName()).addConstraintViolation();
        }

        return list.isEmpty();
    }
}
