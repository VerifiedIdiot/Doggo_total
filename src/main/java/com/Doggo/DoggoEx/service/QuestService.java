package com.Doggo.DoggoEx.service;


import com.Doggo.DoggoEx.dto.PetProfileDto;
import com.Doggo.DoggoEx.dto.QuestDto;
import com.Doggo.DoggoEx.entity.PetProfile;
import com.Doggo.DoggoEx.entity.Quest;
import com.Doggo.DoggoEx.repository.PetProfileRepository;
import com.Doggo.DoggoEx.repository.QuestRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuestService {
    private final QuestRepository questRepository;
    private final PetProfileRepository petProfileRepository;
    //퀘스트 등록 /수정
    public boolean saveQuest(QuestDto questDto) {

        try {
            if(questRepository.existsByPetProfileIdAndQuestPerformance(questDto.getPetId(),questDto.getQuestPerformance())){
            Quest quest =questRepository.findByPetProfileIdAndQuestPerformance(questDto.getPetId(),questDto.getQuestPerformance());
                return modifyQuest(quest.getId(),questDto);
        } else {

                Quest quest = new Quest();
                PetProfile petProfile = petProfileRepository.findById(questDto.getPetId()).orElseThrow(
                        () -> new RuntimeException("해당 펫이 존재하지 않습니다.")
                );
                quest.setQuest1(questDto.getQuest1());
                quest.setQuest2(questDto.getQuest2());
                quest.setQuest3(questDto.getQuest3());
                quest.setQuest4(questDto.getQuest4());
                quest.setQuest5(questDto.getQuest5());
                quest.setQuestPerformance(questDto.getQuestPerformance());
                quest.setPetProfile(petProfile);
                questRepository.save(quest);
                return true;
            }
        }catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    //퀘스트 변경
    public boolean modifyQuest(Long id,QuestDto questDto) {
        try {
            Quest quest =questRepository.findById(id).orElseThrow(
                    () -> new RuntimeException("해당 수행이 존재하지 않습니다.")
            );
            quest.setQuest1(questDto.getQuest1());
            quest.setQuest2(questDto.getQuest2());
            quest.setQuest3(questDto.getQuest3());
            quest.setQuest4(questDto.getQuest4());
            quest.setQuest5(questDto.getQuest5());
            questRepository.save(quest);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }


    //강아지별 Quest 수행 상태  //펫아이디 , 날짜
    public QuestDto petQuestDetail(Long id, QuestDto questDto){
        Quest quest =questRepository.findByPetProfileIdAndQuestPerformance(id,questDto.getQuestPerformance());
        return convertEntityToDto(quest);
    }

    //강아지 Quset 리스트 %(날짜 / 이메일)
    public List<QuestDto> petPercent(String email,LocalDate date){
            List<PetProfile> petProfiles = petProfileRepository.findByMemberMemberEmail(email);
            List<QuestDto> quests =new ArrayList<>();
            for(PetProfile petProfile : petProfiles){
                Quest quest = questRepository.findByPetProfileIdAndQuestPerformance(petProfile.getId(),date);
                quests.add(convertEntityToDto(quest));
            }
            return quests;
        }

    public Map<LocalDate, Integer> memberPercent(String email) {
        // 이메일에 해당하는 회원의 반려동물 프로필 목록을 가져옵니다.
        List<PetProfile> petProfiles = petProfileRepository.findByMemberMemberEmail(email);
        // 각 날짜별로 펫 프로필의 퀘스트 결과를 모읍니다.
        Map<LocalDate, Integer> totalResult = new HashMap<>();
        for (PetProfile petProfile : petProfiles) {
            List<Quest> quests = questRepository.findByPetProfileId(petProfile.getId());
            for (Quest quest : quests) {
                Map<LocalDate, Integer> questResult = Percent(quest);
                questResult.forEach((date, percent) ->
                        totalResult.merge(date, percent, Integer::sum)
                );
            }
        }
        // 각 날짜별로 펫 프로필들의 평균 퍼센트를 계산합니다.
        Map<LocalDate, Integer> result = new HashMap<>();
        int numberOfPets = petProfiles.size(); // 펫 프로필의 수를 가져옵니다.
        totalResult.forEach((date, totalPercent) -> {
            // 총 퍼센트를 펫 프로필의 수로 나누어 해당 날짜의 평균 퍼센트를 계산하여 저장합니다.
            double average = (double) totalPercent / numberOfPets;
            result.put(date, (int) average); // 날짜와 평균 퍼센트를 결과 맵에 저장합니다.
        });
        return result;
    }

    //Enttity Dto로 변환
    private QuestDto convertEntityToDto(Quest quest) {
        QuestDto questDto = new QuestDto();
        questDto.setQuestId(quest.getId());
        questDto.setPetId(quest.getPetProfile().getId());
        questDto.setPetImg(quest.getPetProfile().getImageLink());
        questDto.setQuest1(quest.getQuest1());
        questDto.setQuest2(quest.getQuest2());
        questDto.setQuest3(quest.getQuest3());
        questDto.setQuest4(quest.getQuest4());
        questDto.setQuest5(quest.getQuest5());
        questDto.setQuestPerformance(quest.getQuestPerformance());
        return questDto;
    }


    //회원 퀘스트 날짜별 평균 구하기

    // [
    //  {날짜 : 퍼센트 },
    //  {날짜 : 퍼센트 },
    //  {날짜 : 퍼센트 },
    //  ]

    private Map<LocalDate,Integer> Percent (Quest quest) {
        QuestDto questDto = new QuestDto();
        Map<LocalDate, Integer> map = new HashMap<LocalDate,Integer>();
                // Quest를 QuestDto에 저장
        questDto.setQuest1(quest.getQuest1());
        questDto.setQuest2(quest.getQuest2());
        questDto.setQuest3(quest.getQuest3());
        questDto.setQuest4(quest.getQuest4());
        questDto.setQuest5(quest.getQuest5());
        // 퍼센트 계산
        Integer percent = (questDto.calculatePercent());
        // 맵 {날짜 : 퍼센트}
        map.put(quest.getQuestPerformance(),percent);
        return map;
    }

}
