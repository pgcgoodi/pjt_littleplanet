package project.c203.server.simulationHistory.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import project.c203.server.simulationHistory.dto.SimulationHistoryRequest;
import project.c203.server.simulationHistory.dto.SimulationHistoryResponse;
import project.c203.server.simulationHistory.entity.SimulationHistory;
import project.c203.server.simulationHistory.repository.SimulationHistoryRepository;
import project.c203.server.simulationHistory.service.SimulationHistoryService;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/simulationHistory")
public class SimulationHistoryController {
    private final SimulationHistoryService simulationHistoryService;

    public SimulationHistoryController(SimulationHistoryService simulationHistoryService) {
        this.simulationHistoryService = simulationHistoryService;
    }

    @GetMapping
    public List<SimulationHistory> getHistory (@RequestParam Integer seq, Authentication authentication) {
        return simulationHistoryService.getHistory(seq, authentication);
    }

    @PostMapping
    public ResponseEntity<SimulationHistoryResponse> createHistory (@RequestBody SimulationHistoryRequest simulationHistoryRequest, Authentication authentication) {
        try {
            simulationHistoryService.createHistory(simulationHistoryRequest, authentication);
            return ResponseEntity.ok(new SimulationHistoryResponse(true, "히스토리가 생성되었습니다."));
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new SimulationHistoryResponse(false, "학생 또는 시뮬레이션 seq 확인"));
        } catch (EntityExistsException ex) {
            return ResponseEntity.ok(new SimulationHistoryResponse(true, "해당 학생은 이미 이 시뮬레이션에 참여하였습니다."));
        }
    }

}
