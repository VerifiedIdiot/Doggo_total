package com.Doggo.DoggoEx.service.animals;

import com.Doggo.DoggoEx.dto.StrayDto;
import com.Doggo.DoggoEx.entity.Stray;
import com.Doggo.DoggoEx.repository.StrayRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class StrayService {

    private final StrayRepository strayRepository;
    private final RestTemplate restTemplate;

    @Value("${flask.url}")
    private String flaskUrl;

    public StrayService(StrayRepository strayRepository, RestTemplate restTemplate) {
        this.strayRepository = strayRepository;
        this.restTemplate = new RestTemplate();
    }

    public void deleteAllStrayData() {
        strayRepository.deleteAll();
    }

    public List<StrayDto> getStrays() {
        try {
            String jsonResponse = restTemplate.getForObject(flaskUrl, String.class);
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(jsonResponse, new TypeReference<List<StrayDto>>() {
            });
        } catch (Exception e) {
            // 오류 처리
            e.printStackTrace();
            return Collections.emptyList(); // 빈 리스트 반환
        }
    }

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void resetAutoIncrement() {
        entityManager.createNativeQuery("ALTER TABLE stray_tb AUTO_INCREMENT = 1").executeUpdate();
    }

    @Transactional
    public void insertStrays() {
        try {

            String jsonResponse = restTemplate.getForObject(flaskUrl, String.class);
            ObjectMapper mapper = new ObjectMapper();
            StrayDto[] strayDtos = mapper.readValue(jsonResponse, StrayDto[].class);
            // 데이터를 최신화 하기 위해서 db의 모든 유기동물 정보를 날림
            deleteAllStrayData();
            resetAutoIncrement();
            for (StrayDto strayDto : strayDtos) {
                Stray stray = strayDto.toEntity();
                strayRepository.save(stray);
                System.out.println(stray);
            }
        } catch (Exception e) {
            // 오류 처리
            e.printStackTrace();

        }

    }

    public List<StrayDto> getStraysByRegion(String requestRegion) {
        String dbRegion = convertRegion(requestRegion);
        List<StrayDto> strayDtos = new ArrayList<>();
        List<Stray> strayList = strayRepository.findAllByRegion(dbRegion);

        for (Stray stray : strayList) {
            StrayDto strayDto = stray.toDto();
            strayDtos.add(strayDto);
        }

        return strayDtos;
    }

    private String convertRegion(String requestRegion) {
        // 지역 이름 변환 로직
        if (requestRegion.contains("경기도") || requestRegion.equals("경기")) {
            return "경기";
        } else if (requestRegion.contains("충청북도") || requestRegion.equals("충북")) {
            return "충북";
        } else if (requestRegion.contains("충청남도") || requestRegion.equals("충남")) {
            return "충남";
        } else if (requestRegion.contains("경상북도") || requestRegion.equals("경북")) {
            return "경북";
        } else if (requestRegion.contains("경상남도") || requestRegion.equals("경남")) {
            return "경남";
        } else if (requestRegion.contains("전라북도") || requestRegion.equals("전북")) {
            return "전북";
        } else if (requestRegion.contains("전라남도") || requestRegion.equals("전남")) {
            return "전남";
        } else if (requestRegion.contains("강원도") || requestRegion.equals("강원")) {
            return "강원";
        } else if (requestRegion.contains("제주도") || requestRegion.equals("제주")) {
            return "제주";
            // 기타 다른 지역에 대한 처리
        }
        return requestRegion;
    }
}
