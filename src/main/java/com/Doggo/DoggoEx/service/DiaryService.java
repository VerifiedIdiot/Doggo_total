package com.Doggo.DoggoEx.service;

import com.Doggo.DoggoEx.dto.CalenderDto;
import com.Doggo.DoggoEx.dto.DiaryDto;
import com.Doggo.DoggoEx.dto.QuestDto;
import com.Doggo.DoggoEx.entity.Diary;

import com.Doggo.DoggoEx.entity.Member;
import com.Doggo.DoggoEx.entity.PetProfile;
import com.Doggo.DoggoEx.entity.Quest;
import com.Doggo.DoggoEx.repository.DiaryRepository;
import com.Doggo.DoggoEx.repository.MemberRepository;
import com.Doggo.DoggoEx.repository.PetProfileRepository;
import com.Doggo.DoggoEx.repository.QuestRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class DiaryService {
    private final DiaryRepository diaryRepository;
    private final MemberRepository memberRepository;
    private final QuestRepository questRepository;
    private final PetProfileRepository petProfileRepository;

    //일기 작성 (날짜/이메일)
    public boolean saveDiary(DiaryDto diaryDto) {
        try {
            if (diaryRepository.existsByMemberMemberEmailAndDiaryWriteDate(diaryDto.getMemberId(), diaryDto.getDiaryWriteDate())) {
                Diary diary = diaryRepository.findByMemberMemberEmailAndDiaryWriteDate(diaryDto.getMemberId(), diaryDto.getDiaryWriteDate());
                return modifyDiary(diary.getId(), diaryDto);
            } else {
                Diary diary = new Diary();
                Member member = memberRepository.findByMemberEmail(diaryDto.getMemberId()).orElseThrow(
                        () -> new RuntimeException("해당 회원이 존재하지 않습니다.")
                );
                diary.setDiaryTitle(diaryDto.getDiaryTitle());
                diary.setDiaryDetail(diaryDto.getDiaryDetail());
                diary.setDiaryWriteDate(diaryDto.getDiaryWriteDate());
                diary.setMember(member);
                diaryRepository.save(diary);
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    //일기 삭제 (날짜별, 이메일)
    public boolean deleteDiary(Long id) {
        try {
            diaryRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    //일기 수정 (날짜별, 이메일)
    public boolean modifyDiary(Long id, DiaryDto diaryDto) {
        try {
            Diary diary = diaryRepository.findById(id).orElseThrow(
                    () -> new RuntimeException("해당 일기가 존재하지않습니다.")
            );
            diary.setDiaryTitle(diaryDto.getDiaryTitle());
            diary.setDiaryDetail(diaryDto.getDiaryDetail());
            diaryRepository.save(diary);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    //일기 출력 (날짜별, 이메일)
    public DiaryDto diaryDetail(String Email, LocalDate day) {
        Diary diary = diaryRepository.findByMemberMemberEmailAndDiaryWriteDate(Email, day);
        return convertEntityToDto(diary);
    }

    // 게시글 엔티티를 DTO로 변환
    private DiaryDto convertEntityToDto(Diary diary) {
        DiaryDto diaryDto = new DiaryDto();
        diaryDto.setDiaryId(diary.getId());
        diaryDto.setDiaryTitle(diary.getDiaryTitle());//제목
        diaryDto.setDiaryDetail(diary.getDiaryDetail());// 내용
        diaryDto.setDiaryWriteDate(diary.getDiaryWriteDate()); //날짜
        diaryDto.setMemberId(diary.getMember().getMemberName()); // 작성자
        return diaryDto;
    }

    public Map<LocalDate, String> CalenderMap(String email) {
        // 입력된 이메일에 해당하는 회원의 다이어리 목록을 가져옵니다.
        List<Diary> diaries = diaryRepository.findByMemberMemberEmail(email);
        // 날짜와 상세 내용을 담을 맵을 생성합니다.
        Map<LocalDate, String> diaryMap = new HashMap<>();
        // 각 다이어리의 날짜와 내용을 맵으로 만듭니다.
        for (Diary diary : diaries) {
            // 다이어리의 작성 날짜와 상세 내용을 맵에 추가합니다.
            diaryMap.put(diary.getDiaryWriteDate(), diary.getDiaryDetail());
        }
        // 날짜와 상세 내용이 담긴 맵을 반환합니다.
        return diaryMap;
    }


    // Quest를 QuestDto로 변환
    private QuestDto convertToQuestDto(Quest quest) {
        QuestDto questDto = new QuestDto();
        questDto.setQuest1(quest.getQuest1());
        questDto.setQuest2(quest.getQuest2());
        questDto.setQuest3(quest.getQuest3());
        questDto.setQuest4(quest.getQuest4());
        questDto.setQuest5(quest.getQuest5());
        questDto.setQuestPerformance(quest.getQuestPerformance());

        return questDto;
    }
}
