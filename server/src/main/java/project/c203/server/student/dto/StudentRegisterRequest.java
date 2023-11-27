package project.c203.server.student.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class StudentRegisterRequest {

    @NotBlank
    private String studentName;

    @NotBlank
    private String studentGrade;

    @NotBlank
    private String studentClass;


}
