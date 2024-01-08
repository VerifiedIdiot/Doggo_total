package com.Doggo.DoggoEx.service;

import java.util.Random;

import javax.mail.Message.RecipientType;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class EmailService {

    @Autowired
    JavaMailSender emailSender;

    private String ePw;

    // 랜덤으로 생성된 코드를 저장할 변수

    private MimeMessage createMessage(String to) throws Exception {
        // 랜덤 코드 생성 메소드 호출
        ePw = createKey();

        // 로그 출력
        System.out.println("보내는 대상 : " + to);
        System.out.println("인증 번호 : " + ePw);

        // 이메일 메시지 생성
        MimeMessage message = emailSender.createMimeMessage();

        // 수신자 설정
        message.addRecipients(RecipientType.TO, to);

        // 이메일 제목 설정
        message.setSubject("PET MEMOIR 인증번호 발송");

        // 이메일 내용 작성
        String msgg = "";
        msgg += "<div style='margin:20px; text-align: center;'>";
        msgg += "<h1> 🐶안녕하세요 PET MEMOIR입니다.😺</h1>";
        msgg += "<br>";
        msgg += "<h4>아래 코드를 입력해 반려동물과의 소중한 추억을 남겨보세요!</h4>";
        msgg += "<br>";
        msgg += "<div style='display: flex; font-family: verdana; width: 1150px; height: 800px; background-image: url(\"https://firebasestorage.googleapis.com/v0/b/dogcat-42fca.appspot.com/o/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C.png?alt=media&token=2854e453-2d64-4e80-91a2-b46abc13c294\"); background-size: cover; position: relative; text-align: center; justify-content: center; '>";
        msgg += "<div style='display: flex; text-align: center; justify-content: center; align-items: center; flex-direction: column; '>";
        msgg += "<h2 style=\"color: #3C3939;\">PET MEMOIR 인증 코드입니다.</h2>";
        msgg += "<div style='font-size: 130%;'>";
        msgg += "인증 코드: <strong>";
        msgg += ePw + "</strong></div><br/>";
        msgg += "</div>";
        msgg += "</div>";
        msgg += "</div>";


        // 이메일 내용 및 보내는 사람 설정
        message.setText(msgg, "utf-8", "html");
        message.setFrom(new InternetAddress("bowwow-meow@naver.com", "PET MEMOIR Corp."));//보내는 사람

        // 생성된 이메일 메시지 반환
        return message;
    }

    // 랜덤 코드 생성 메소드
    public static String createKey() {
        StringBuffer key = new StringBuffer();
        Random rnd = new Random();

        for (int i = 0; i < 8; i++) { // 인증코드 8자리
            int index = rnd.nextInt(3); // 0~2 까지 랜덤

            switch (index) {
                case 0:
                    key.append((char) ((int) (rnd.nextInt(26)) + 97));
                    //  a~z  (ex. 1+97=98 => (char)98 = 'b')
                    break;
                case 1:
                    key.append((char) ((int) (rnd.nextInt(26)) + 65));
                    //  A~Z
                    break;
                case 2:
                    key.append((rnd.nextInt(10)));
                    // 0~9
                    break;
            }
        }
        return key.toString();
    }

    // 이메일 전송 메소드
    public String sendSimpleMessage(String to) throws Exception {
        // 이메일 메시지 생성
        MimeMessage message = createMessage(to);

        try {
            // 이메일 전송
            emailSender.send(message);

            // 생성된 랜덤 코드 반환
            return ePw;
        } catch (MailException e) {
            // 예외 상황을 더 자세히 로깅하고, 예외를 다시 던집니다.
            e.printStackTrace();
            throw new IllegalArgumentException("Failed to send email: " + e.getMessage(), e);
        }
    }
}
