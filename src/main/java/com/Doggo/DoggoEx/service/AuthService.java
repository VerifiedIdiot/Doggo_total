package com.Doggo.DoggoEx.service;

import com.Doggo.DoggoEx.dto.MemberReqDto;
import com.Doggo.DoggoEx.dto.MemberResDto;
import com.Doggo.DoggoEx.dto.TokenDto;
import com.Doggo.DoggoEx.entity.Member;
import com.Doggo.DoggoEx.jwt.TokenProvider;
import com.Doggo.DoggoEx.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    private final AuthenticationManagerBuilder managerBuilder; // 인증을 담당하는 클래스
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    // 회원가입
    public MemberResDto signup(MemberReqDto requestDto) {
        if (memberRepository.existsByMemberEmail(requestDto.getMemberEmail())) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다");
        }
        Member member = requestDto.toEntity(passwordEncoder);
        return MemberResDto.of(memberRepository.save(member));
    }
    // 비밀번호변경
    public boolean passwordChange(String email, String password) {
        try {
            Member member = memberRepository.findByMemberEmail(email)
                    .orElseThrow(() -> new RuntimeException("회원 정보가 없습니다."));

            String hashedPassword = passwordEncoder.encode(password);
            member.setMemberPassword(hashedPassword);
            memberRepository.save(member);

            return true; // 변경 성공 시 true 반환
        } catch (Exception e) {
            // 예외가 발생하면 변경 실패로 간주하고 false 반환
            return false;
        }
    }


    public TokenDto login(MemberReqDto requestDto) {
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();
        log.info("authenticationToken: {}", authenticationToken);

        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
        log.info("authentication: {}", authentication);

        return tokenProvider.generateTokenDto(authentication);
    }

    public String findId(String name, String tel) {
        Member member = memberRepository.findByMemberNameAndMemberTel(name, tel).orElseThrow(
                () -> new RuntimeException("해당 회원이 존재하지 않습니다.")
        );
        return member.getMemberEmail();
    }

    // accessToken 재발급
    public String createAccessToken(String refreshToken) {
        Authentication authentication = tokenProvider.getAuthentication(refreshToken);
        return tokenProvider.generateAccessToken(authentication);
    }
}
