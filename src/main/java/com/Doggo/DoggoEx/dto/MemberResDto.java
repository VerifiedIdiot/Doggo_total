package com.Doggo.DoggoEx.dto;
import com.Doggo.DoggoEx.entity.Member;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberResDto {
    private long id;
    private String memberEmail;
    private String memberImage;
    private String memberTel;
    private String memberGender;
    private String memberName;
    private LocalDate memberBirth;
    private String memberAddress;
    private LocalDateTime regDate;
    private String memberGrade;


    // MemberResDto -> Member
    public static MemberResDto of(Member member) {
        return MemberResDto.builder()
                .memberEmail(member.getMemberEmail())
                .memberImage(member.getMemberImage())
                .memberTel(member.getMemberTel())
                .memberGender(member.getMemberGender())
                .memberName(member.getMemberName())
                .memberBirth(member.getMemberBirth())
                .memberAddress(member.getMemberAddress())
                .memberGrade(member.getMemberGrade())
                .build();
    }
}
