package project.c203.server.member.dto;

import lombok.Data;

@Data
public class ContentsResponse {

    private boolean success;
    private String message;

    public ContentsResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

}
