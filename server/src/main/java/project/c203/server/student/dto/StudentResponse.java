package project.c203.server.student.dto;

import lombok.Data;

@Data
public class StudentResponse {

    private boolean success;
    private String message;

    public StudentResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
}
