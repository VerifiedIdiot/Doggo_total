package com.Doggo.DoggoEx.service;

import com.Doggo.DoggoEx.dto.FeedDto;
import com.Doggo.DoggoEx.dto.MemberResDto;
import com.Doggo.DoggoEx.entity.Feed;
import com.Doggo.DoggoEx.entity.Member;
import com.Doggo.DoggoEx.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminMemberService {
    private final MemberRepository memberRepository;    // 회원

    // 회원 전체 조회 → 필터는 프론트에서
    public List<MemberResDto> getAdminMemberList() {
        List<Member> members = memberRepository.findAll();
        List<MemberResDto> memberResDtos = new ArrayList<>();
        for (Member member : members) {
            memberResDtos.add(convertEntityToDto(member));
        }
        return memberResDtos;
    }

    // 회원 삭제
    public boolean deleteMember(String email) {
        try {
            Member member = memberRepository.findByMemberEmail(email).orElseThrow(
                    () -> new RuntimeException("해당 회원이 존재하지 않습니다.")
            );
            memberRepository.delete(member);
            return true;
        } catch (RuntimeException e) {
            return false;
        }
    }

    // 회원 페이지네이션
    public List<MemberResDto> getMemberList(int page, int size, String filter) {
        Pageable pageable = PageRequest.of(page, size);

        Page<Member> memberPage;
        if ("all".equals(filter) || filter == null || filter.isEmpty()){
            // 필터가 "all"이거나 비어있는 경우 모든 데이터를 가져옴
            memberPage = memberRepository.findAll(pageable);
        } else {
            // 특정 필터 조건에 맞는 데이터를 가져옴 (부분 일치 검색)
            if ("FREE".equals(filter)) {
                memberPage = memberRepository.findByMemberGradeIsNull(pageable);
            } else {
                memberPage = memberRepository.findByMemberGradeContaining(filter, pageable);
            }
        }
        List<Member> members = memberPage.getContent();
        List<MemberResDto> memberResDtos = new ArrayList<>();
        for(Member member : members) {
            memberResDtos.add(convertEntityToDto(member));
        }
        return memberResDtos;
    }

    // 페이지 수 조회
    public int getMembers(Pageable pageable, String filter) {
        Page<Member> memberPage;
        if ("all".equals(filter) || filter == null || filter.isEmpty()) {
            memberPage = memberRepository.findAll(pageable);
        } else {
            if ("FREE".equals(filter)) {
                memberPage = memberRepository.findByMemberGradeIsNull(pageable);
            } else {
                memberPage = memberRepository.findByMemberGradeContaining(filter, pageable);
            }
        }

        return memberPage.getTotalPages();
    }

    // member entity → Dto
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
