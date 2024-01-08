package com.Doggo.DoggoEx.service;


import com.Doggo.DoggoEx.dto.MemberReqDto;
import com.Doggo.DoggoEx.dto.MemberResDto;
import com.Doggo.DoggoEx.dto.PetProfileDto;
import com.Doggo.DoggoEx.entity.Member;
import com.Doggo.DoggoEx.entity.PetProfile;
import com.Doggo.DoggoEx.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    public boolean isMember(String email) {
        return memberRepository.existsByMemberEmail(email);
    }

    // 내 정보 조회
    public MemberResDto getMemberDetail(String email) {
        Member member = memberRepository.findByMemberEmail(email).orElseThrow(
                () -> new RuntimeException("해당 회원이 존재하지 않습니다.")
        );
        return convertEntityToDto(member);
    }

    // 회원 수정
    public boolean modifyMember(MemberReqDto memberDto) {
        try {
            Member member = memberRepository.findByMemberEmail(memberDto.getMemberEmail()).orElseThrow(
                    () -> new RuntimeException("해당 회원이 존재하지 않습니다.")
            );
            if(memberDto.getMemberImage()!=null){
                member.setMemberImage(memberDto.getMemberImage());}
            if(memberDto.getMemberAddress()!=null){
                member.setMemberAddress(memberDto.getMemberAddress());}
            if(memberDto.getMemberGender()!=null){
                member.setMemberGender(memberDto.getMemberGender());}
            if(memberDto.getMemberTel()!=null){
                member.setMemberTel(memberDto.getMemberTel());}
            if(memberDto.getMemberBirth()!=null){
                member.setMemberBirth(memberDto.getMemberBirth());}
            if(memberDto.getMemberGrade()!=null){
                member.setMemberGrade(memberDto.getMemberGrade());}
            memberRepository.save(member);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Transactional
    public boolean deleteMember(String email) {
        try {
            memberRepository.deleteByMemberEmail(email);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    // 이메일 출력
    public String getEmail(Long id) {
        Member member = memberRepository.findById(id).orElseThrow(
                () -> new RuntimeException("해당 회원이 존재하지 않습니다.")
        );

        return member.getMemberEmail();
    }


    private MemberResDto convertEntityToDto(Member member) {
        MemberResDto memberResDto = new MemberResDto();
        memberResDto.setId(member.getId());
        memberResDto.setMemberEmail(member.getMemberEmail());
        memberResDto.setMemberImage(member.getMemberImage());
        memberResDto.setMemberTel(member.getMemberTel());
        memberResDto.setMemberGender(member.getMemberGender());
        memberResDto.setMemberName(member.getMemberName());
        memberResDto.setMemberBirth(member.getMemberBirth());
        memberResDto.setMemberAddress(member.getMemberAddress());
        memberResDto.setRegDate(member.getRegDate());
        memberResDto.setMemberGrade(member.getMemberGrade());
        return memberResDto;
    }
}
