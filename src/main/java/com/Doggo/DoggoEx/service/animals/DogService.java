package com.Doggo.DoggoEx.service.animals;


import com.Doggo.DoggoEx.dto.DogDto;
import com.Doggo.DoggoEx.entity.AnimalType;
import com.Doggo.DoggoEx.entity.Dog;
import com.Doggo.DoggoEx.repository.AnimalTypeRepository;
import com.Doggo.DoggoEx.repository.DogRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;


@Service
public class DogService {

    private final DogRepository dogRepository;

    private final AnimalTypeRepository animalTypeRepository;
    private final RestTemplate restTemplate;

    private final EngToKorService engToKorService;

    @Value("${api.dog.url}")
    private String apiUrl;

    @Value("${api.dog.key}")
    private String apiKey;

    // 생성자를 통한 DogRepository 주입 및 RestTemplate 초기화

    public DogService(DogRepository dogRepository, AnimalTypeRepository animalTypeRepository, EngToKorService engToKorService) {
        this.dogRepository = dogRepository;
        this.animalTypeRepository = animalTypeRepository;
        this.engToKorService = engToKorService;
        this.restTemplate = new RestTemplate();
    }

    // dto에 담긴 데이터를 빌더를 이용해 엔티티로 전달하는 메서드
    private Dog mapToDogEntity(DogDto dogDto, AnimalType dogType) {
        Dog dog = dogDto.toEntity();
        dog.setAnimalTypeId(dogType);   // 여기에서 AnimalType을 설정 , ID 1 의 레코드 할당
        return dog;
    }

    // 엔티티에 담긴 데이터를 빌더를 이용해 dto로 전달하는 메서드
    private DogDto entityToDogDto(Dog dog) {
        return dog.toDto();
    }


    // 외부 API를 호출하여 데이터를 받아오고, 이를 Dog 엔티티로 변환 후 저장하는 메소드
    public void insertDogs() {
        // HTTP 헤더를 생성합니다.
        HttpHeaders headers = new HttpHeaders();
        // 사용자의 API 키를 헤더에 설정합니다. (API 키는 문자열 변수 `apiKey`로 가정합니다.)
        headers.set("X-Api-Key", apiKey);
        // 컨텐츠 타입을 JSON으로 설정합니다.
        headers.setContentType(MediaType.APPLICATION_JSON);

        // 헤더를 포함한 HTTP 엔티티를 생성합니다.
        HttpEntity<String> entity = new HttpEntity<>(headers);
        // id 값이 1인 레코드를 찾는 리퍼지토리
        AnimalType dogType = animalTypeRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("Animal type CAT not found"));

        // 개 짖음의 강도가 1에서 5까지 있다고 가정하고, 각각의 강도에 대한 정보를 가져오는 반복문을 시작합니다.
        for (int barking = 1; barking <= 5; barking++) {
            // 더 많은 데이터가 있는지 확인하는 데 사용되는 플래그입니다.
            boolean moreData = true;
            // API 페이지네이션을 위한 오프셋 초기화입니다.
            int offset = 0;

            // 데이터가 더 있는 동안 계속 API 호출을 하기 위한 while 루프입니다.
            while (moreData) {
                // 요청 URL을 구성합니다. 짖음 강도와 페이지네이션을 위한 오프셋 값을 포함합니다.
                String requestUrl = apiUrl + "?barking=" + barking + "&offset=" + offset;

                // `RestTemplate`의 `exchange` 메서드를 사용하여 HTTP 요청을 실행하고, 응답을 `ResponseEntity` 객체로 받습니다.
                ResponseEntity<DogDto[]> responseEntity = restTemplate.exchange(
                        requestUrl, // 1. requestUrl: 요청을 보낼 URL입니다. 이 URL은 요청을 처리할 서버의 주소와 요청할 리소스의 경로, 그리고 필요한 쿼리 파라미터를 포함합니다.
                        HttpMethod.GET, // 2. HttpMethod.GET: 사용할 HTTP 메서드를 지정합니다. 여기서는 GET 메서드를 사용하여 데이터를 조회합니다.
                        entity, // 3. entity: `HttpEntity` 객체로, 요청에 포함할 헤더와 바디를 포함합니다. 이 경우 `headers` 객체만 설정되어 있으며, 바디는 null이거나 비어 있는 상태입니다. `HttpEntity`는 `HttpHeaders` 객체를 생성자의 인자로 받아 요청 헤더를 구성할 수 있게 해줍니다. 예를 들어, API 키나 컨텐츠 타입 등을 설정할 수 있습니다.
                        DogDto[].class // 4. DogDto[].class: `ResponseEntity`가 반환될 때 응답 본문을 변환할 객체 타입을 지정합니다. 여기서는 `DogDto` 타입의 배열을 나타내는 `DogDto[].class`를 사용하여, JSON 응답이 `DogDto[]` 타입의 객체 배열로 변환되도록 지정합니다. `exchange` 메서드는 제네릭 타입으로 `ResponseEntity<T>`를 반환하므로, 이 타입 파라미터에 대응하는 클래스 객체를 넘겨줌으로써 응답 본문의 변환을 지시합니다.
                );
                // API 결과값 중에서 BODY 내용만 추출합니다.
                DogDto[] response = responseEntity.getBody();

                // 응답이 null이거나 빈 배열인 경우 더 이상 처리할 데이터가 없으므로 플래그를 false로 설정
                if (response == null || response.length == 0) {
                    moreData = false;
                } else {
                    // 응답 배열을 순회하면서 각 `DogDto` 객체를 `Dog` 엔티티로 변환하고 저장
                    for (DogDto dogDto : response) {
                        DogDto korDogDto = engToKorService.dogToKor(dogDto);
                        Dog dog = mapToDogEntity(korDogDto, dogType);
                        // 변환된 Dog 엔티티를 리포지토리를 통해 데이터베이스에 저장
                        dogRepository.save(dog);
                        // 저장된 강아지 정보를 콘솔에 출력합니다.
                        System.out.println("doggy!! : " + dog);
                    }
                    // 오프셋을 증가시켜 다음 페이지의 데이터를 요청
                    offset += response.length;
                }
            }
        }
    }
    // DogDto 객체를 받아 Dog 엔티티로 매핑하는 메소드


    // 견종 이름으로 검색
    public DogDto getDogByName(String koreanName) {
        // 이름으로 Dog 엔티티를 조회하고, 결과가 없으면 예외 발생
        Dog dog = dogRepository.findByKoreanName(koreanName).orElseThrow(
                () -> new RuntimeException("해당 견종이 존재하지 않습니다.")
        );
        // 조회된 Dog 엔티티를 DogDto로 변환하여 반환
        return entityToDogDto(dog);
    }

//     견종 가나다 순으로 정렬
    public List<DogDto> getDogsSortedByKoreanName(Pageable pageable) {
        return dogRepository.findAllByOrderByNameAsc(pageable);
    }

    public List<DogDto> getDogsSortedByKeyword(String keyword) {
        return dogRepository.findByKeyword(keyword);
    }

}
