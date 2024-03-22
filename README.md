https://www.notion.so/8f705f3c79f34820bff746188d1c6e8d (초기 기획안)

## 정벼리 담당 기능 요약 ##

1. 공공기관API를 활용한 날씨 + 산책지수 표현
 - 기상청API허브에서 제공하는 텍스터 형태의 날씨정보(단기&중기)를 
    스프링에서 가공
 - 공공데이터 포탈에서 제공하는 실시간&시간단위 날씨정보를 Flask에서 가공
 - PostConstruct와 스케쥴러를 통해 서버가동 혹은 지정된 시간마다 최신화
 - React의 geoLocation을 통해 현재위치의 x,y 값을 획득 KakaoApi의 
   제공후 도로명 주소를 받아옴
 - 도로명주소 데이터를 활용하여 해당 도로명주소가 속한 도시의 실시간 
   날씨정보와 시간단위 날씨정보를 return 받음
 - 대한민국 각 대표도시의 일주일간 오전/오후의 날씨 정보를 return 받음
 - Promise 함수를 사용하여 각 데이터로 인한 렌더링이 동시에 일어나게함
 - 모바일 화면에서는 소형화 및 요약된 정보 확인

2. BeautifulSoup과 Flask 서버를 통한 유기동물정보 크롤
 - 국가동물보호정보시스템에서 공고중인 모든 유기동물 정보를 스케쥴러에 
   등록된 시간에 맞춰 크롤링 
  (https://www.animal.go.kr/front/awtis/public/publicList.do)
 - 리액트의 geoLocation -> 카카오API를 통해 받은 도로명주소를 확인하여 
   사용자가 속한 지역의 유기동물정보들만을 CSS 키프레임을 사용하여 
   부드럽게 렌더링
 - 렌더링 된 각 아이템들을 클릭하면 국가동물보호정보시스템의 
   상세정보페이지로 이동함

3. 견종/묘종 정보 열람 페이지

 - API Ninjas(https://api-ninjas.com/)에서 무료로 제공하는 견종/묘종 
   정보를 while문을 통해 모든 견종/묘종 정보를 요청하여 Spring 서버로 
   가져온뒤 한글화하여 JPA를 사용하여 MySQL에 보관
 - React의 Axios API 요청이 들어오면 가나다순으로 정렬, page, size를 
   적용하여 return 하여 무한스크롤 기능을 가능하게함
 - React 측에서 페이지 크기 값을 얻고 useRef를 사용하여 아이템의 10% 
   이상을 지나치면 자동적으로 api 요청을 하여 무한스크롤 기능을 구현
 - 검색기능의 경우 "테리어" 라고 입력시에 %테리어%로 LIKE 절 쿼리 return 
   값을 받아와 결과값 렌더링, 데이터가 없을시 안내문구 출력
 - 고양이 정보의 경우 이미지 사이즈가 5메가바이트를 넘는경우를 확인하여 
   이미지를 바이트단위로 쪼개어 가공하는 이미지 리사이저 메서드 클래스를 
   생성 (적용은 하지 못함)

4. 이외의 활동
 - 메인페이지에서 ReactSlick 라이브러를 사용하여 해당 어플리케이션의 
   소개문구 및 이미지들을 주기적으로 보여주는 섹션 단위의 컴포넌트구현
 - AboutUs 컴포넌트 구현 (단독으로 구현한 컴포넌트라 배포시에는 
    누락하였음)
 - 콜백지옥, 프롭스 드릴링과같이 반복된 getter&setter 사용으로 Dry 원칙과
   유지보수성이 저해되는게 확인되어 Builder 패턴, ObjectMapper, Jackson   
   어노테이션들을 적극적으로 사용하여 팀원들에게 전파하였음
 - 반복된 API요청 로직(날짜관련)을 추상화 클래스로 리팩토링하여 코드를 줄임
 
5. 확인사항
 - 멍냥멍냥 프론트엔드(https://github.com/VerifiedIdiot/Doggo-frontend)
 - 멍냥멍냥 백엔드(https://github.com/VerifiedIdiot/DoggoEx)
 - 멍냥멍냥 플라스크(https://github.com/VerifiedIdiot/DoggoFlask)
 - 멍냥멍냥 통합(https://github.com/VerifiedIdiot/DoggoTotals)

인사담당관님의 피드백을 환영합니다!
