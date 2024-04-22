package eu.partyn.app.controller;

import lombok.Data;


// Placeholder class for debugging :))
@Data
public class ErrorMessage {
    private String message;

    public ErrorMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}

