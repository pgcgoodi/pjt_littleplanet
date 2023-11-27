package project.c203.server.member.dto;

import lombok.Data;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotNull;

@Data
public class ContentsRequest {

    @NotNull
    private Integer contentsSeq;

    @NotNull
    private Integer situationNum;


}
