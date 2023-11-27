package project.c203.server.student.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import project.c203.server.student.dto.StudentRegisterRequest;
import project.c203.server.student.dto.StudentResponse;
import project.c203.server.student.entity.Student;
import project.c203.server.student.service.StudentService;

import javax.persistence.EntityNotFoundException;
import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/student")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public ResponseEntity<List<Student>> getStudentList(Authentication authentication) {
        List<Student> studentList = studentService.getStudentList(authentication);
        return ResponseEntity.status(HttpStatus.OK)
                .body(studentList);
    }

    @PostMapping("/register")
    public ResponseEntity<StudentResponse> registerStudent(@Valid @RequestBody StudentRegisterRequest studentRegisterRequest, Authentication authentication) {
        studentService.registerStudent(authentication, studentRegisterRequest);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(new StudentResponse(true, "학생 정보가 등록되었습니다."));
    }

    @DeleteMapping("/delete")
    public ResponseEntity<StudentResponse> deleteStudent(@RequestParam Integer studentSeq, Authentication authentication) {
        try {
            studentService.deleteStudent(authentication, studentSeq);
            return ResponseEntity.ok(new StudentResponse(true, "학생 정보가 삭제되었습니다."));
        } catch (EntityNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new StudentResponse(false, "해당하는 학생이 없습니다."));
        }
    }

}
