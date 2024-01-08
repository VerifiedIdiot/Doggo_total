package com.Doggo.DoggoEx.dto;

import com.Doggo.DoggoEx.entity.Member;
import com.Doggo.DoggoEx.enums.Authority;
import lombok.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberReqDto {
    private long id;
    private String memberEmail;
    private String memberPassword;
    private String memberImage;
    private String memberTel;
    private String memberGender;
    private String memberName;
    private LocalDate memberBirth;
    private String memberAddress;
    private LocalDateTime regDate;
    private String memberGrade;

    // MemberReqDto -> Member
    public Member toEntity(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .memberEmail(memberEmail)
                .memberPassword(passwordEncoder.encode(memberPassword))
                .memberImage(memberImage)
                .memberTel(memberTel)
                .memberGender(memberGender)
                .memberName(memberName)
                .memberBirth(memberBirth)
                .memberAddress(memberAddress)
                .memberGrade(memberGrade)
                .authority(Authority.ROLE_USER)
                .build();
    }
    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(memberEmail, memberPassword);
    }
}

