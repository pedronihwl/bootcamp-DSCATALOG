package com.devnihwl.dscatalog.services.validation;

import com.devnihwl.dscatalog.dto.UserUpdateDTO;
import com.devnihwl.dscatalog.entities.User;
import com.devnihwl.dscatalog.repositories.UserRepository;
import com.devnihwl.dscatalog.resources.exceptions.FieldMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerMapping;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class UserUpdateValidatorData implements ConstraintValidator<UserValid, UserUpdateDTO> {

    @Autowired
    private HttpServletRequest request;

    @Autowired
    private UserRepository repository;

    @Override
    public boolean isValid(UserUpdateDTO dto, ConstraintValidatorContext context) {
        @SuppressWarnings("unchecked")
        var uriVars = (Map<String,String>) request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE);
        long id = Long.parseLong(uriVars.get("id"));

        List<FieldMessage> list = new ArrayList<>();

        User user = repository.findByEmail(dto.getEmail());
        if(user != null && id != user.getId()){
            list.add(new FieldMessage("email","Email já existe no banco de dados"));
        }

        for(FieldMessage f : list){
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(f.getMessage()).addPropertyNode(f.getFieldName()).addConstraintViolation();
        }

        return list.isEmpty();
    }
}
