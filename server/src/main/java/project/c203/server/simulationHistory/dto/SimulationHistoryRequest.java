package project.c203.server.simulationHistory.dto;

import lombok.Data;
import org.springframework.lang.Nullable;

import javax.validation.constraints.NotNull;

@Data
public class SimulationHistoryRequest {
    @NotNull
    private Integer studentSeq;
    @NotNull
    private Integer simulationSeq;
}
