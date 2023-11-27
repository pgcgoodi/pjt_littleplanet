package project.c203.server.config.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import project.c203.server.member.entity.Member;
import project.c203.server.member.repository.MemberRepository;

import javax.persistence.EntityNotFoundException;
import java.security.Key;
import java.util.Collections;
import java.util.Date;

@Component
public class JwtUtils {

    private final JwtConfig jwtConfig;
    private final Key key;
    private final MemberRepository memberRepository;


    @Autowired
    public JwtUtils(JwtConfig jwtConfig, MemberRepository memberRepository) {
        this.jwtConfig = jwtConfig;
        this.key = Keys.hmacShaKeyFor(jwtConfig.getSecretKey().getBytes());
        this.memberRepository = memberRepository;
    }

    public String generateToken(String memberEmail) {

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + (long) jwtConfig.getTokenExpiration() * 1000);

        return Jwts.builder()
                .claim("memberEmail", memberEmail)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    public Claims parseClaims(final String token) {
        return Jwts.parserBuilder().setSigningKey(key).build()
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean validateToken(String token) {
        try {
            parseClaims(token);
            return true;
        } catch (ExpiredJwtException | SignatureException | MalformedJwtException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("토큰 검증 중 알 수 없는 에러가 발생했습니다.", e);
        }
    }

    public Authentication getAuthentication(final String token) {
        Claims claims = parseClaims(token);
        final String memberEmail = claims.get("memberEmail").toString();
        Member member = memberRepository.findMemberByMemberEmail(memberEmail).get();
        return new UsernamePasswordAuthenticationToken(member.getMemberEmail(), member.getMemberPassword(), Collections.emptyList());
    }


}
