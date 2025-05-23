/**
 * 발음 평가 함수
 * @param {string} userSpeech - 사용자가 말한 내용
 * @param {string} targetWord - 목표 단어
 * @param {string} level - 현재 레벨 (beginner, intermediate, advanced)
 * @returns {Object} 평가 결과
 */
export const evaluatePronunciation = (userSpeech, targetWord, level) => {
  // 텍스트 유사도 계산
  const textSimilarity = calculateTextSimilarity(userSpeech.toLowerCase(), targetWord.toLowerCase());

  // 레벨별 임계값 설정
  const thresholds = {
    beginner: { textSimilarity: 0.3 },
    intermediate: { textSimilarity: 0.5 },
    advanced: { textSimilarity: 0.7 }
  };

  const threshold = thresholds[level] || thresholds.beginner;

  // 통과 여부 결정
  const isPassed = textSimilarity >= threshold.textSimilarity;

  // 피드백 메시지 선택
  let feedbackMessage;
  if (isPassed) {
    if (textSimilarity >= threshold.textSimilarity + 0.2) {
      feedbackMessage = "Perfect!";
    } else {
      feedbackMessage = "Good job!";
    }
  } else {
    feedbackMessage = "Try again!";
  }

  // 결과 반환
  return {
    passed: isPassed,
    feedback: feedbackMessage,
    spokenWord: userSpeech,
    scores: {
      accuracy: Math.round(textSimilarity * 100)
    }
  };
};

/**
 * 텍스트 유사도 계산 함수
 * @param {string} str1 - 첫 번째 문자열
 * @param {string} str2 - 두 번째 문자열
 * @returns {number} 유사도 (0~1)
 */
const calculateTextSimilarity = (str1, str2) => {
  if (str1 === str2) return 1.0;
  if (str1.length === 0 || str2.length === 0) return 0.0;

  // 레벤슈타인 거리 계산
  const matrix = [];
  for (let i = 0; i <= str1.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= str2.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if (str1[i-1] === str2[j-1]) {
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i-1][j-1] + 1, // 교체
          matrix[i][j-1] + 1,   // 삽입
          matrix[i-1][j] + 1    // 삭제
        );
      }
    }
  }

  // 유사도 계산 (0~1 사이 값)
  const maxLength = Math.max(str1.length, str2.length);
  const similarity = 1 - (matrix[str1.length][str2.length] / maxLength);
  
  return similarity;
};
