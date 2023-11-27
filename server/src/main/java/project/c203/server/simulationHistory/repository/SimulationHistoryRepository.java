package project.c203.server.simulationHistory.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.c203.server.simulationHistory.entity.SimulationHistory;

import java.util.List;

@Repository
public interface SimulationHistoryRepository extends JpaRepository<SimulationHistory, Integer> {
    List<SimulationHistory> findSimulationHistoriesBySimulationSeqAndMember_MemberEmail(Integer simulationSeq, String memberEmail);

    boolean existsSimulationHistoryBySimulationSeqAndStudent_StudentSeq(Integer simulationSeq, Integer studentSeq);
}
