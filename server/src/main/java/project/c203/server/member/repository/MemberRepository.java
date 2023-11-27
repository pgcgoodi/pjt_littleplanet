package project.c203.server.member.repository;

import project.c203.server.member.entity.Member;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {

    boolean existsMemberByMemberEmail(String memberEmail);

    Optional<Member> findMemberByMemberEmail(String memberEmail);

}
