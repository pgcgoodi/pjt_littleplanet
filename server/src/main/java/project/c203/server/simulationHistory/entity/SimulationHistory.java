package project.c203.server.simulationHistory.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.c203.server.member.entity.Member;
import project.c203.server.student.entity.Student;

import javax.persistence.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table( name= "simulation_history")
public class SimulationHistory {

    @Id
    @Column(name="simulation_history_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer simulationHistorySeq;

    @Column(name="simulation_seq")
    private Integer simulationSeq;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name="member_seq")
    private Member member;

    @ManyToOne
//    @JsonIgnore
    @JoinColumn(name="student_seq")
    private Student student;
}
