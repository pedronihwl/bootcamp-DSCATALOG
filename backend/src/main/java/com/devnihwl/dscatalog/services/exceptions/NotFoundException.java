package com.devnihwl.dscatalog.services.exceptions;

public class NotFoundException extends RuntimeException{
    public NotFoundException(String msg){
        super (msg);
    }
}
