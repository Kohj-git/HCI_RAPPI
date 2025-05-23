// 레벨별 정확도 기준
const ACCURACY_THRESHOLDS = {
  beginner: 50,
  intermediate: 70,
  advanced: 85
};

export const evaluateWord = (transcript, targetWord, level = 'beginner') => {
  const cleanTranscript = transcript.toLowerCase().trim();
  const cleanTarget = targetWord.toLowerCase().trim();

  // 정확도 계산
  let accuracy = 0;
  if (cleanTranscript === cleanTarget) {
    accuracy = 100;
  } else {
    // 레벤슈타인 거리 기반 유사도 계산
    const distance = levenshteinDistance(cleanTranscript, cleanTarget);
    const maxLength = Math.max(cleanTranscript.length, cleanTarget.length);
    accuracy = Math.round((1 - distance / maxLength) * 100);
  }

  // 결과 반환
  const threshold = ACCURACY_THRESHOLDS[level];
  const passed = accuracy >= threshold;
  return {
    transcript: cleanTranscript,
    targetWord: cleanTarget,
    accuracy: accuracy,
    passed: passed,
    feedback: getFeedback(accuracy)
  };
};

// 레벤슈타인 거리 계산
function levenshteinDistance(str1, str2) {
  const matrix = [];

  // 행렬 초기화
  for (let i = 0; i <= str1.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= str2.length; j++) {
    matrix[0][j] = j;
  }

  // 거리 계산
  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      if (str1[i-1] === str2[j-1]) {
        matrix[i][j] = matrix[i-1][j-1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i-1][j-1] + 1,  // 교체
          matrix[i][j-1] + 1,    // 삽입
          matrix[i-1][j] + 1     // 삭제
        );
      }
    }
  }

  return matrix[str1.length][str2.length];
}

// 피드백 메시지 생성
function getFeedback(accuracy) {
  if (accuracy >= 90) return "와우! 완벽해요! 🌟";
  if (accuracy >= 80) return "정말 잘했어요! ⭐";
  if (accuracy >= 60) return "좋아요! 통과! 👍";
  return "다시 한번 해볼까요? 🎯";
}
