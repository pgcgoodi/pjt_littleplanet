package project.c203.server.contents.entity;

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
@Table(name="contents_url")
public class Contents {

    @Id
    @Column(name="contents_url_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer contentsUrlSequence;

    @Column(name="contents_url_name")
    private String contentsUrlName;

    @Column(name="contents_url_address")
    private String contentsUrlAddress;

    @Column(name="contents_url_type")
    private Integer contentsUrlType;

    @Column(name="contents_url_num")
    private Integer contentsUrlNum;

}
