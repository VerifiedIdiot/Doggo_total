package com.Doggo.DoggoEx.service.animals;

import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.net.URL;

// ImageService 클래스: 이미지 처리를 담당하는 서비스 컴포넌트
@Service
public class ImageService {

    // compressImage 메소드: 주어진 이미지 URL을 받아 이미지를 압축하는 메소드
    public byte[] compressImage(String imageLink) {
        try {
            // URL 객체 생성: imageUrl 문자열로부터 URL 객체를 생성합니다.
            URL url = new URL(imageLink);

            // 이미지 읽기: URL에서 스트림을 열어 이미지를 읽어 BufferedImage 객체로 변환합니다.
            BufferedImage originalImage = ImageIO.read(url.openStream());

            // 이미지 크기 조정: 원본 이미지를 지정된 크기로 조정합니다.
            BufferedImage resizedImage = resizeImage(originalImage, 300, 300);

            // ByteArrayOutputStream 객체 생성: 이미지 데이터를 바이트 배열로 변환하기 위해 사용합니다.
            ByteArrayOutputStream baos = new ByteArrayOutputStream();

            // 이미지 쓰기: 조정된 이미지를 JPEG 형식으로 ByteArrayOutputStream에 씁니다.
            ImageIO.write(resizedImage, "jpg", baos);

            // 바이트 배열 반환: ByteArrayOutputStream의 바이트 배열을 반환합니다.
            return baos.toByteArray();

        } catch (Exception e) {
            // 예외 처리: 이미지 처리 중 예외가 발생할 경우 스택 트레이스를 출력하고 null을 반환합니다.
            e.printStackTrace();
            return null;
        }
    }

    // resizeImage 메소드: 이미지 크기를 조정하는 보조 메소드
    private BufferedImage resizeImage(BufferedImage originalImage, int targetWidth, int targetHeight) {
        // 새 BufferedImage 객체 생성: 목표 크기를 가진 새 이미지 객체를 생성합니다.
        BufferedImage resizedImage = new BufferedImage(targetWidth, targetHeight, BufferedImage.TYPE_INT_RGB);

        // Graphics2D 객체 생성: 이미지에 그래픽 작업을 수행할 Graphics2D 객체를 생성합니다.
        Graphics2D graphics2D = resizedImage.createGraphics();

        // 이미지 그리기: 원본 이미지를 새로운 크기로 조정하여 그립니다.
        graphics2D.drawImage(originalImage, 0, 0, targetWidth, targetHeight, null);

        // Graphics2D 리소스 해제: 그래픽 작업이 끝나면 리소스를 해제합니다.
        graphics2D.dispose();

        // 조정된 이미지 반환: 리사이즈된 이미지를 반환합니다.
        return resizedImage;
    }
}

