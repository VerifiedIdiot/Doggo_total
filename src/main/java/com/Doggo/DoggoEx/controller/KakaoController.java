package com.Doggo.DoggoEx.controller;

import com.Doggo.DoggoEx.service.AuthService;
import com.Doggo.DoggoEx.service.KakaoService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@RequestMapping("/auth")
public class KakaoController {
    private final KakaoService kakaoService;
    private final AuthService authService;

    @GetMapping("/kakao/{code}")
    public ResponseEntity<String> kakao(@PathVariable String code) {
        log.info("code {} : ", code);
        String email = kakaoService.kakaoToken(code);
        return ResponseEntity.ok(email);
    }
}
