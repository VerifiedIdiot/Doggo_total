// calculateWalkingIndex.js

export const calculateWalkingIndex = (weatherData) => {
    let score = 100;
  
    // 강수 상태에 따른 점수 조정
    if (weatherData.condition !== "강수없음") {
      score -= 70;
    }
  
    // 습도에 따른 점수 조정
    const humidity = parseInt(weatherData.humidity.replace('%', ''));
    if (humidity > 60) {
      score -= (humidity - 60);
    } else if (humidity < 40) {
      score -= (40 - humidity);
    }
  
    // 기타 요소에 따른 점수 조정 로직...
  
    // 산책 지수 평가
    if (score >= 70) return "좋음";
    if (score >= 40 && score < 70) return "보통";
    return "나쁨";
  };
  