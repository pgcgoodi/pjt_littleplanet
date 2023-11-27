package project.c203.server.member.dto;

import lombok.Data;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class MemberCommandRequest {

  @NotNull
  private String memberEmail;

  @NotNull
  private String memberCommand;
}
