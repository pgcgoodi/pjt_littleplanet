package project.c203.server.member.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import javax.mail.Message;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

@Service
public class MailService {
    @Autowired
    private JavaMailSender javaMailSender;

    private MimeMessage createMessage(String code, String email) throws Exception{

        MimeMessage message = javaMailSender.createMimeMessage();

        message.addRecipients(Message.RecipientType.TO, email);
        message.setSubject("소행성 홈페이지 인증번호입니다.");
        message.setText("이메일 인증코드: "+code);

        message.setFrom(new InternetAddress("alsrnr1791@naver.com", "소행성"));

        return  message;
    }

    public void sendMail(String code, String email) throws IllegalAccessException {
        try {
            MimeMessage mimeMessage = createMessage(code, email);
            javaMailSender.send(mimeMessage);
        } catch (Exception e) {
            e.printStackTrace();
            if (e instanceof MailException) {
                throw new IllegalAccessException();
            }
        }
    }


}
