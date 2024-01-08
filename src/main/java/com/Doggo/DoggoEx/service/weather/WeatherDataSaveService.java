package com.Doggo.DoggoEx.service.weather;

import com.Doggo.DoggoEx.dto.WeatherDto;
import com.Doggo.DoggoEx.entity.Weather;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.Doggo.DoggoEx.repository.WeatherRepository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Map;

@Service
public class WeatherDataSaveService {

    @Autowired
    private WeatherRepository weatherRepository;

    @Autowired
    private EntityManager entityManager; // JPA EntityManager 추가 , 다량의 데이터를 insert시 영속화를 통해 관리


    public void deleteAllWeatherData() {
        weatherRepository.deleteAll();
    }
    
    @Transactional
    public void saveWeatherData(Map<String, List<List<String>>> weatherData) {
        try {
            System.out.println("단기 + 중기 예보 insert 시작");
            int count = 0;
            for (Map.Entry<String, List<List<String>>> entry : weatherData.entrySet()) {
                for (List<String> data : entry.getValue()) {
                    WeatherDto weatherDto = new WeatherDto();
                    // 데이터 추출 및 DTO 설정
                    weatherDto.setRegion(entry.getKey());
                    weatherDto.setWeatherDate(Integer.parseInt(data.get(0)));
                    weatherDto.setMorningTemperature(Integer.parseInt(data.get(1)));
                    weatherDto.setMorningRainPercent(Integer.parseInt(data.get(2)));
                    weatherDto.setMorningWeatherCondition(data.get(3));
                    weatherDto.setAfternoonTemperature(Integer.parseInt(data.get(4)));
                    weatherDto.setAfternoonRainPercent(Integer.parseInt(data.get(5)));
                    weatherDto.setAfternoonWeatherCondition(data.get(6));

                    Weather weather = weatherDto.toEntity();

                    weatherRepository.save(weather);

                    // 세션 flush 및 clear (JPA/Hibernate 사용 시)
                    if (++count % 50 == 0) { // 예를 들어, 50개의 레코드마다 flush 및 clear 수행
                        entityManager.flush();
                        entityManager.clear();
                    }
                }

            }
            System.out.println("단기 + 중기 예보 insert 성공");
        } catch (Exception e) {
            // 예외 처리 및 로그 출력
            System.err.println("Error saving weather data: " + e.getMessage());
            // 실제 사용 시에는 로그 프레임워크 (예: Logback, SLF4J) 사용 권장
        }
    }
}
