package project.c203.server.simulationHistory.dto;

import lombok.Data;

@Data
public class SimulationHistoryResponse {

    private boolean success;
    private String message;

    public SimulationHistoryResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }


}
