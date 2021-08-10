package com.devnihwl.dscatalog.resources.exceptions;

import com.devnihwl.dscatalog.services.exceptions.DataBaseException;
import com.devnihwl.dscatalog.services.exceptions.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.InvocationTargetException;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@ControllerAdvice
public class ResourceExceptionHandler {

    @ExceptionHandler (NotFoundException.class)
    public ResponseEntity<StandardError> entityNotFound(NotFoundException e, HttpServletRequest request){
        StandardError error = new StandardError(
                Instant.now(),
                HttpStatus.NOT_FOUND.value(),
                e.getClass().toString(),
                e.getMessage(),
                request.getRequestURI()
        );

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler (DataBaseException.class)
    public ResponseEntity<StandardError> dataException(DataBaseException e, HttpServletRequest request){
        HttpStatus status = HttpStatus.BAD_REQUEST;
        StandardError error = new StandardError(
                Instant.now(),
                status.value(),
                e.getClass().toString(),
                e.getMessage(),
                request.getRequestURI()
        );

        return ResponseEntity.status(status).body(error);
    }

    @ExceptionHandler (MethodArgumentNotValidException.class)
    public ResponseEntity<StandardError> validationException(MethodArgumentNotValidException e, HttpServletRequest request){
        HttpStatus status = HttpStatus.UNPROCESSABLE_ENTITY; //422

        StandardError valError = new StandardError(Instant.now(),
                status.value(),
                e.getClass().toString(),
                null,
                request.getRequestURI()){

            private final List<FieldMessage> errors = new ArrayList<>();

            public List<FieldMessage> getErrors() {
                return errors;
            }

            @Override
            public void addError(String fieldName, String message){
                errors.add(new FieldMessage(fieldName, message));
            }
        };

        // valError.getClass().getMethod("addError").invoke(valError) - Muito feio


        e.getBindingResult().getFieldErrors().forEach(err -> valError.addError(err.getField(),err.getDefaultMessage()));

        return ResponseEntity.status(status).body(valError);
    }
}
