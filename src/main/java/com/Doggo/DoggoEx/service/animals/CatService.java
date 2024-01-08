package com.Doggo.DoggoEx.service.animals;

import com.Doggo.DoggoEx.dto.CatDto;
import com.Doggo.DoggoEx.dto.DogDto;
import com.Doggo.DoggoEx.entity.AnimalType;
import com.Doggo.DoggoEx.entity.Cat;
import com.Doggo.DoggoEx.repository.AnimalTypeRepository;
import com.Doggo.DoggoEx.repository.CatRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class CatService {

    private final CatRepository catRepository;

    private final AnimalTypeRepository animalTypeRepository;
    private final RestTemplate restTemplate;

    private final EngToKorService engToKorService;


    @Value("${api.cat.url}")
    private String apiUrl;

    @Value("${api.cat.key}")
    private String apiKey;


    // 생성자를 통한 CatRepository 주입 및 RestTemplate 초기화

    public CatService(CatRepository catRepository, AnimalTypeRepository animalTypeRepository, EngToKorService engToKorService) { // 여기에 AnimalTypeRepository를 주입합니다.
        this.catRepository = catRepository;
        this.animalTypeRepository = animalTypeRepository; // 이 라인을 추가해야 합니다.
        this.engToKorService = engToKorService;
        this.restTemplate = new RestTemplate();
    }
    // INSERT되는 각 레코드마다 AnimalType에서 받는 외래키 컬럼의 값을 할당하는 메서드


    // dto에 담긴 데이터를 빌더를 이용해 엔티티로 전달하는 메서드
    private Cat mapToCatEntity(CatDto catDto, AnimalType catType) {
        Cat cat = catDto.toEntity();
        cat.setAnimalTypeId(catType); // 여기에서 AnimalType을 설정 , ID 2의 레코드 할당
        return cat;
    }

    // 엔티티에 담긴 데이터를 빌더를 이용해 dto로 전달하는 메서드
    private CatDto entityToCatDto(Cat cat) {
        return cat.toDto();
    }


    // 외부 api로 불러온 정보들을 db에 insert하는 메서드
    public void insertCats() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("X-Api-Key", apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<>(headers);
        // id 값이 2인 레코드를 찾는 리퍼지토리
        AnimalType catType = animalTypeRepository.findById(2L)
                .orElseThrow(() -> new RuntimeException("Animal type CAT not found"));

        for (int grooming = 1; grooming <= 5; grooming++) {
            boolean moreData = true;
            int offset = 0;

            while (moreData) {
                String requestUrl = apiUrl + "?grooming=" + grooming + "&offset=" + offset;
                // `RestTemplate`의 `exchange` 메서드를 사용하여 HTTP 요청을 실행하고, 응답을 `ResponseEntity` 객체로 받습니다.
                ResponseEntity<CatDto[]> responseEntity = restTemplate.exchange(
                        requestUrl, // 1. requestUrl: 요청을 보낼 URL입니다. 이 URL은 요청을 처리할 서버의 주소와 요청할 리소스의 경로, 그리고 필요한 쿼리 파라미터를 포함합니다.
                        HttpMethod.GET, // 2. HttpMethod.GET: 사용할 HTTP 메서드를 지정합니다. 여기서는 GET 메서드를 사용하여 데이터를 조회합니다.
                        entity, // 3. entity: `HttpEntity` 객체로, 요청에 포함할 헤더와 바디를 포함합니다. 이 경우 `headers` 객체만 설정되어 있으며, 바디는 null이거나 비어 있는 상태입니다. `HttpEntity`는 `HttpHeaders` 객체를 생성자의 인자로 받아 요청 헤더를 구성할 수 있게 해줍니다. 예를 들어, API 키나 컨텐츠 타입 등을 설정할 수 있습니다.
                        CatDto[].class // 4. CatDto[].class: `ResponseEntity`가 반환될 때 응답 본문을 변환할 객체 타입을 지정합니다. 여기서는 `DogDto` 타입의 배열을 나타내는 `DogDto[].class`를 사용하여, JSON 응답이 `CatDto[]` 타입의 객체 배열로 변환되도록 지정합니다. `exchange` 메서드는 제네릭 타입으로 `ResponseEntity<T>`를 반환하므로, 이 타입 파라미터에 대응하는 클래스 객체를 넘겨줌으로써 응답 본문의 변환을 지시합니다.
                );
                // API 결과값 중에서 BODY 내용만 추출
                CatDto[] response = responseEntity.getBody();

                if (response == null || response.length == 0) {
                    moreData = false;
                } else {
                    for (CatDto catDto : response) {
                        CatDto korCatDto = engToKorService.catToKor(catDto);
                        Cat cat = mapToCatEntity(korCatDto, catType);
                        catRepository.save(cat);
                        System.out.println("kitten!! : " + cat);
                    }
                    offset += response.length;
                }
            }
        }
    }






    // 묘종 이름으로 검색
    public CatDto getCatByName(String koreanName) {
        // 이름으로 Cat 엔티티를 조회하고, 결과가 없으면 예외 발생
        Cat cat = catRepository.findByKoreanName(koreanName).orElseThrow(
                () -> new RuntimeException("해당 묘종이 존재하지 않습니다.")
        );
        // 조회된 Cat 엔티티를 CatDto로 변환하여 반환
        return entityToCatDto(cat);
    }

    public List<CatDto> getCatsSortedByKoreanName(Pageable pageable) {
        return catRepository.findAllByOrderByNameAsc(pageable);
    }

    public List<CatDto> getCatsSortedByKeyword(String keyword) {
        return catRepository.findByKeyword(keyword);
    }
}
