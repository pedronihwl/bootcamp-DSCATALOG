package com.devnihwl.dscatalog.dto;

import com.devnihwl.dscatalog.services.validation.UserValid;

@UserValid
public class UserInsertDTO extends UserDTO{
    private String password;

    UserInsertDTO(){
        super();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
