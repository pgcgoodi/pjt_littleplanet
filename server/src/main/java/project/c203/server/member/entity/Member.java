package project.c203.server.member.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table( name= "member")
public class Member {
    @Id
    @Column(name = "member_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer memberSeq;

    @Column(name = "member_email", unique = true, length = 50)
    private String memberEmail;

    @JsonIgnore
    @Column(name = "member_password", length = 64)
    private String memberPassword;

    @Column(name = "member_school", length = 40)
    private String memberSchool;
}
