package com.Doggo.DoggoEx.service;


import com.Doggo.DoggoEx.entity.Member;
import com.Doggo.DoggoEx.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
// 로그인 처리를 위한 클래스
public class CustomUserDetailsService implements UserDetailsService {
    private final MemberRepository memberRepository;

    @Override
    // 로그인 시 이메일을 통해 DB에서 회원 정보를 가져온다. createUserDetails() 메서드를 통해 UserDetails 타입으로 변환한다.
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return memberRepository.findByMemberEmail(username)
                .map(this::createUserDetails)
                .orElseThrow(() -> new UsernameNotFoundException(username + " 을 DB에서 찾을 수 없습니다"));
    }
    // DB에서 가져온 회원 정보를 UserDetails 타입으로 변환한다.
    private UserDetails createUserDetails(Member member) {
        // 권한 정보를 문자열로 변환
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(member.getAuthority().toString());
        // UserDetails 타입의 객체를 생성해 리턴
        return new User(
                String.valueOf(member.getId()),
                member.getMemberPassword(),
                Collections.singleton(grantedAuthority)
        );
    }
}