package project.c203.server.member.controller;


import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import project.c203.server.member.dto.*;
import project.c203.server.member.entity.Member;
import project.c203.server.member.service.MemberService;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/api/v1/member")
public class MemberController {
    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/signup")
    public ResponseEntity<MemberResponse> signup(@Valid @RequestBody MemberSignupRequest memberSignupRequest) {
        memberService.signup(memberSignupRequest);

        String email = memberSignupRequest.getMemberEmail();
        String folderPath = "/home/ubuntu/user/" + email; // 이 부분을 실제 경로로 변경해야 합니다.
        String owner = "1000";
        String permissions = "775";

        File folder = new File(folderPath);
        if (!folder.exists()) {
            boolean created = folder.mkdirs();
            if (created) {
                try {
                    Process process_own = Runtime.getRuntime().exec("chown " + owner + ":" + owner + " " + folderPath);
                    int exitCode = process_own.waitFor();
    
                    if (exitCode == 0) {
                        System.out.println("명령 실행 성공");
                    } else {
                        System.err.println("명령 실행 실패. 종료 코드: " + exitCode);
                    }
                } catch (IOException | InterruptedException e) {
                    e.printStackTrace();
                }
        
                try {
                    Process process_per = Runtime.getRuntime().exec("chmod " + permissions + " " + folderPath);
                    int exitCode = process_per.waitFor();
    
                    if (exitCode == 0) {
                        System.out.println("명령 실행 성공");
                    } else {
                        System.err.println("명령 실행 실패. 종료 코드: " + exitCode);
                    }
                } catch (IOException | InterruptedException e) {
                    e.printStackTrace();
                }
                return ResponseEntity.status(HttpStatus.CREATED)
                        .body(new MemberResponse(true, "회원가입에 성공했으며 메일 폴더가 생성되었습니다."));
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new MemberResponse(false, "회원가입에 성공했지만 메일 폴더 생성에 실패했습니다."));
            }
        } else {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new MemberResponse(true, "회원가입에 성공했습니다. 메일 폴더는 이미 존재합니다."));
        }
    }

    @PostMapping("/authCode")
    public ResponseEntity<MemberResponse> createAuthCode(@RequestBody MemberAuthRequest memberAuthRequest) {
        String email = memberAuthRequest.getEmailAddress();
        Integer status = memberAuthRequest.getStatus();

        try {
            memberService.createAuthCode(email, status);
            return ResponseEntity.ok(new MemberResponse(true, "인증번호가 메일로 발송되었습니다."));
        } catch (EntityExistsException ex) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new MemberResponse(false, "이미 가입된 메일입니다."));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new MemberResponse(false, "가입된 메일이 아닙니다."));
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<MemberResponse> verifyAuthCode(@RequestBody MemberAuthRequest memberAuthRequest) {
        boolean isVerified = memberService.verifyAuthCode(memberAuthRequest);
        if (isVerified) {
            return ResponseEntity.ok(new MemberResponse(true, "인증 성공"));
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new MemberResponse(false, "인증 실패"));
        }
    }

    @PostMapping("/changePassword")
    public ResponseEntity<MemberResponse> changePassword(@RequestBody MemberAuthRequest memberAuthRequest) {
        memberService.changePassword(memberAuthRequest);
        return ResponseEntity.ok(new MemberResponse(true, "비밀번호가 수정되었습니다."));
    }

    @PostMapping("/login")
    public ResponseEntity<MemberResponse> login(@RequestBody MemberLoginRequest memberLoginRequest, HttpServletResponse response){
        try {
            String token = memberService.login(memberLoginRequest);
            response.setHeader("Set-Cookie", "JWT=" + token + "; Path=/; Max-Age=86400; Secure; SameSite=None;");
            return ResponseEntity.ok(new MemberResponse(true, "로그인에 성공했습니다."));
        } catch (EntityNotFoundException | BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new MemberResponse(false, "로그인에 실패했습니다."));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<MemberResponse> logout(HttpServletResponse response) {
        response.setHeader("Set-Cookie", "JWT=" + null + "; Path=/; Max-Age=0; Secure; SameSite=None;");
        return ResponseEntity.status(HttpStatus.OK)
                .body(new MemberResponse(true, "로그아웃에 성공했습니다."));
    }

    
    @GetMapping
    public ResponseEntity<Member> memberInfo(Authentication authentication) {
        Member member = memberService.getMemberInfo(authentication);
        return ResponseEntity.status(HttpStatus.OK)
        .body(member);
    }
    
    @PutMapping("/edit")
    public ResponseEntity<MemberResponse> editMemberInfo(@RequestBody MemberEditRequest memberEditRequest, Authentication authentication ) {
        try {
            memberService.editMemberInfo(authentication, memberEditRequest);
            return ResponseEntity.status(HttpStatus.OK)
            .body(new MemberResponse(true, "정보 수정에 성공했습니다."));
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(new MemberResponse(false, "현재 비밀번호를 잘못 입력하였습니다."));
        }
    }
    
    @PostMapping("/otp")
    public ResponseEntity<MemberResponse> createOtp(Authentication authentication) {
        String otp = memberService.createOtp(authentication);
        return ResponseEntity.ok(new MemberResponse(true, otp));
    }
    
    @PostMapping("/otp/verify")
    public ResponseEntity<MemberResponse> verifyOtp(@RequestParam String otp) {
        String memberEmail = memberService.verifyOtp(otp);
        return ResponseEntity.ok(new MemberResponse(true, memberEmail));
    }
    
    @PostMapping("/otp/connected")
    public ResponseEntity<MemberResponse> connectedOtp(@RequestParam String otp) {
        boolean isConnected = memberService.connectedOtp(otp);
        if (isConnected) {
            return ResponseEntity.ok(new MemberResponse(true, "기기 연결에 성공했습니다."));
        }   else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new MemberResponse(false, "기기연결에 실패했습니다."));
        }
    }

    @PostMapping("/command")
    public ResponseEntity<MemberResponse> command(@RequestBody MemberCommandRequest MemberCommandRequest) {
        memberService.command(MemberCommandRequest);
        return ResponseEntity.ok(new MemberResponse(true, MemberCommandRequest.getMemberCommand()));
    }
}
