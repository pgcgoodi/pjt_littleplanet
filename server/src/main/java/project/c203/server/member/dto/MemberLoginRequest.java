package project.c203.server.member.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class MemberLoginRequest {

    @NotBlank
    private String memberEmail;

    @NotBlank
    private String memberPassword;
}
