package project.c203.server.member.dto;

import lombok.Data;

@Data
public class MemberResponse {

    private boolean success;
    private String message;

    public MemberResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

}
