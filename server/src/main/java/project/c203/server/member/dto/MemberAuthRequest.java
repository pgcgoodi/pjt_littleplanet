package project.c203.server.member.dto;

import lombok.Data;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotNull;

@Data
public class MemberAuthRequest {

    @NotNull
    private String emailAddress;

    @Nullable
    private Integer status;

    @Nullable
    private String authCode;

    @Nullable
    private String memberPassword;


}
