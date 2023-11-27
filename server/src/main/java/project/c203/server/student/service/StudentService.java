package project.c203.server.student.service;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import project.c203.server.member.entity.Member;
import project.c203.server.member.repository.MemberRepository;
import project.c203.server.student.dto.StudentRegisterRequest;
import project.c203.server.student.entity.Student;
import project.c203.server.student.repository.StudentRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class StudentService {

    private final StudentRepository studentRepository;
    private final MemberRepository memberRepository;

    public StudentService(StudentRepository studentRepository, MemberRepository memberRepository) {
        this.studentRepository = studentRepository;
        this.memberRepository = memberRepository;
    }
    public List<Student> getStudentList(Authentication authentication) {
        String memberEmail = authentication.getName();
        List<Student> studentList = studentRepository.findStudentByMember_MemberEmail(memberEmail);
        return studentList;
    }

    public void registerStudent(Authentication authentication, StudentRegisterRequest studentRegisterRequest) {
        String memberEmail = authentication.getName();
        Member member = memberRepository.findMemberByMemberEmail(memberEmail).get();

        Student student = Student.builder()
                .studentName(studentRegisterRequest.getStudentName())
                .studentGrade(studentRegisterRequest.getStudentGrade())
                .studentClass(studentRegisterRequest.getStudentClass())
                .member(member)
                .build();
        studentRepository.save(student);
    }
    @Transactional
    public void deleteStudent(Authentication authentication, Integer studentSeq) {
        String memberEmail = authentication.getName();
        boolean isExisted = studentRepository.existsStudentByStudentSeqAndAndMember_MemberEmail(studentSeq, memberEmail);
        if (isExisted) {
            studentRepository.deleteStudentByStudentSeqAndMember_MemberEmail(studentSeq, memberEmail);
        } else {
            throw new EntityNotFoundException();
        }
    }
}
