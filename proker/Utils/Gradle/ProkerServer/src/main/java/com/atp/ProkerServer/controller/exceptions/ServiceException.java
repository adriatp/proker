package com.atp.ProkerServer.controller.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.BAD_REQUEST)
public class ServiceException extends RuntimeException {
    public ServiceException(String message) {
        super(message);
    }
}