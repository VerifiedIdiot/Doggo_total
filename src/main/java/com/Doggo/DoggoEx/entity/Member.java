package com.Doggo.DoggoEx.entity;


import com.Doggo.DoggoEx.enums.Authority;
import lombok.*;

import javax.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter @Setter
@ToString
@Table(name = "member_tb")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "member_profile_seq")
    private Long id;
    @Column(unique = true , nullable = false)
    private String  memberEmail;
    @Column(nullable = false)
    private String  memberPassword;
    @Column(length = 2048)
    private String memberImage;
    private String memberTel;
    private String memberGender;
    @Column(nullable = false)
    private String memberName;
    private LocalDate memberBirth;
    private String memberAddress;
    private LocalDateTime regDate;
    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL)
    private List<Sale> sales;
    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL)
    private List<Diary> diarys;
    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL)
    private List<PetProfile> petProfiles;
    @OneToMany(mappedBy = "member",cascade = CascadeType.ALL)
    private List<Board> board;
    @Enumerated(EnumType.STRING)
    private Authority authority;

    @PrePersist
    protected void prePersist() {
        regDate = LocalDateTime.now();
    }

    private String memberGrade;

//    public MemberDto toDto() {
//        return MemberDto.builder()
//                .id(this.getId())
//                .memberEmail(this.getMemberEmail())
//                .memberPassword(this.getMemberPassword())
//                .memberImage(this.getMemberImage())
//                .memberTel((this.getMemberTel()))
//                .memberGender(this.getMemberGender())
//                .memberName(this.getMemberName())
//                .memberBirth(this.getMemberBirth())
//                .memberAddress(this.getMemberAddress())
//                .regDate(this.getRegDate())
//                .memberGrade(this.getMemberGrade())
//                .build();
//    }

    @Builder
    public Member(String memberEmail, String memberPassword, String memberImage, String memberTel, String memberGender, String memberName, LocalDate memberBirth,String memberAddress,Authority authority) {
        this.memberEmail =memberEmail;
        this.memberPassword = memberPassword;
        this.memberImage =memberImage;
        this.memberTel =memberTel;
        this.memberGender =memberGender;
        this.memberName=memberName;
        this.memberBirth=memberBirth;
        this.memberAddress=memberAddress;
        this.authority = authority;
        this.regDate = LocalDateTime.now();
    }

}