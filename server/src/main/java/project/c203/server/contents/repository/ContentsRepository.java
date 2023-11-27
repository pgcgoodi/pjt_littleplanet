package project.c203.server.contents.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.c203.server.contents.entity.Contents;

import java.util.List;

@Repository
public interface ContentsRepository extends JpaRepository<Contents, Integer> {
    List<Contents> findContentsByContentsUrlTypeAndContentsUrlNum(Integer type, Integer num);
    List<Contents> findContentsByContentsUrlType(Integer type);

}
