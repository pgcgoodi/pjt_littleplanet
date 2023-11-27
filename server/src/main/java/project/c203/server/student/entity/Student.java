package project.c203.server.student.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import project.c203.server.member.entity.Member;

import javax.persistence.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table( name= "student")
public class Student {

    @Id
    @Column(name = "student_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer studentSeq;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "member_seq")
    private Member member;

    @Column(name = "student_name", length = 20)
    private String studentName;

    @Column(name = "student_grade", length = 10)
    private String studentGrade;

    @Column(name = "student_class", length = 10)
    private String studentClass;

}
