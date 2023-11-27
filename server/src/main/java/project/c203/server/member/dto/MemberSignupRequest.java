package project.c203.server.member.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Data
public class MemberSignupRequest {

    @NotBlank
    @Pattern(regexp = "^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$", message = "올바른 이메일 형식이 아닙니다.")
    private String memberEmail;

    @NotBlank
    @Pattern(regexp = "^(?=.*?[a-zxA-Z])(?=.*\\d)[A-Za-z\\d@$!%*?&#]{8,20}$", message = "올바른 비밀번호 형식이 아닙니다.")
    private String memberPassword;

    @NotBlank
    private String memberSchool;
}
