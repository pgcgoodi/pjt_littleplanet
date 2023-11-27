package project.c203.server.simulationHistory.service;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import project.c203.server.member.entity.Member;
import project.c203.server.member.repository.MemberRepository;
import project.c203.server.simulationHistory.dto.SimulationHistoryRequest;
import project.c203.server.simulationHistory.entity.SimulationHistory;
import project.c203.server.simulationHistory.repository.SimulationHistoryRepository;
import project.c203.server.student.entity.Student;
import project.c203.server.student.repository.StudentRepository;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class SimulationHistoryService {

    private final SimulationHistoryRepository simulationHistoryRepository;
    private final StudentRepository studentRepository;
    private final MemberRepository memberRepository;

    public SimulationHistoryService (SimulationHistoryRepository simulationHistoryRepository, StudentRepository studentRepository, MemberRepository memberRepository) {
        this.simulationHistoryRepository = simulationHistoryRepository;
        this.studentRepository = studentRepository;
        this.memberRepository = memberRepository;
    }

    public List<SimulationHistory> getHistory (Integer seq, Authentication authentication) {
        Integer simulationSeq = seq;
        String memberEmail = authentication.getName();
        return simulationHistoryRepository.findSimulationHistoriesBySimulationSeqAndMember_MemberEmail(simulationSeq, memberEmail);
    }

    public void createHistory (SimulationHistoryRequest simulationHistoryRequest, Authentication authentication) {
        Integer simulationSeq = simulationHistoryRequest.getSimulationSeq();
        Integer studentSeq = simulationHistoryRequest.getStudentSeq();

        Student student = studentRepository.findStudentByStudentSeq(studentSeq)
                .orElseThrow(()->new EntityNotFoundException());
        Member member = memberRepository.findMemberByMemberEmail(authentication.getName()).get();

        boolean isDuplicate = simulationHistoryRepository.existsSimulationHistoryBySimulationSeqAndStudent_StudentSeq(simulationSeq, studentSeq);

        if (!isDuplicate) {
            SimulationHistory simulationHistory = SimulationHistory.builder()
                    .simulationSeq(simulationSeq)
                    .student(student)
                    .member(member)
                    .build();
            simulationHistoryRepository.save(simulationHistory);
        } else {
            throw new EntityExistsException();
        }
    }
}
