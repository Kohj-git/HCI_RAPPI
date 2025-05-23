"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Check, Mic, Volume2, Square } from "lucide-react";
import morningAudio from '../assets/morning.mp3';
import walkAudio from '../assets/walk.mp3';
import topAudio from '../assets/top.mp3';
import pingpongAudio from '../assets/pingpong.mp3';
import heavyAudio from '../assets/heavy.mp3';
import readyAudio from '../assets/ready.mp3';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LearnWord() {
  const navigate = useNavigate();

  // 문장 리스트 (IPA 발음기호 포함)
  const sentences = [
    {
      english: "morning",
      korean: "아침",
      pronunciation: "[ˈmɔːrnɪŋ]",
      feedback: "Great job!",
      audio: morningAudio,
    },
    {
      english: "walk",
      korean: "걷다",
      pronunciation: "[wɔːk]",
      feedback: "Keep it up!",
      audio: walkAudio,
    },
    {
      english: "top",
      korean: "꼭대기, 최고",
      pronunciation: "[tɑːp]",
      feedback: "Cool~~",
      audio: topAudio,
    },
    {
      english: "ping pong",
      korean: "탁구",
      pronunciation: "[ˈpɪŋ ˌpɒŋ]",
      feedback: "Great!",
      audio: pingpongAudio,
    },
    {
      english: "heavy",
      korean: "무거운",
      pronunciation: "[ˈhɛvi]",
      feedback: "Very good",
      audio: heavyAudio,
    },
    {
      english: "ready",
      korean: "준비된",
      pronunciation: "[ˈrɛdi]",
      feedback: "Awesome",
      audio: readyAudio,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("none"); // 'success' | 'warning' | 'error' | 'none'
  const [similarity, setSimilarity] = useState(0);
  const [spokenWord, setSpokenWord] = useState("");
  const [recognition, setRecognition] = useState(null);

  // 레벤시타인 거리 계산 함수
  const calculateLevenshteinDistance = (a, b) => {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];

    // 행렬 초기화
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    // 거리 계산
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[b.length][a.length];
  };

  // 유사도를 백분율로 변환
  const calculateSimilarity = (str1, str2) => {
    const maxLength = Math.max(str1.length, str2.length);
    const distance = calculateLevenshteinDistance(str1, str2);
    const similarity = ((maxLength - distance) / maxLength) * 100;
    return Math.round(similarity);
  };

  const startSpeechRecognition = () => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const newRecognition = new SpeechRecognition();
    newRecognition.lang = 'en-US';
    newRecognition.interimResults = false;
    newRecognition.maxAlternatives = 1;

    newRecognition.onstart = () => {
      setIsRecording(true);
      setFeedback("");
      setFeedbackType("none");
    };

    newRecognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript.toLowerCase();
      const correctWord = sentences[currentIndex].english.toLowerCase();
      
      // 실제 말한 단어 저장
      setSpokenWord(speechResult);

      const similarity = calculateSimilarity(speechResult, correctWord);
      
      if (similarity === 100) {
        setFeedback("와우! 완벽해요!");
        setFeedbackType("success");
      } else if (similarity >= 80) {
        setFeedback("거의 다 왔어요!");
        setFeedbackType("success");
      } else if (similarity >= 60) {
        setFeedback("조금만 더 해보세요!");
        setFeedbackType("warning");
      } else {
        setFeedback("다시 한 번 해보세요");
        setFeedbackType("error");
      }
      
      // 정확도 저장
      setSimilarity(similarity);
    };

    newRecognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
    };

    newRecognition.onend = () => {
      setIsRecording(false);
    };

    newRecognition.start();
    setRecognition(newRecognition);
  };

  const handleNext = () => {
    // 피드백 초기화
    setFeedback("");
    setFeedbackType("none");
    setSpokenWord("");
    setSimilarity(0);

    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/ready-to-learn-sentence");
    }
  };

  const currentSentence = sentences[currentIndex];

  return (
    <div className="bg-[#ffeddf] flex flex-row justify-center w-full min-h-screen">
      <div className="bg-[#ffeddf] w-[390px] h-[744px] relative">
        {/* Header */}
        <div className="w-full flex items-center justify-between px-4 py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="p-0 h-auto"
          >
            <ArrowLeft className="w-5 h-5 text-orange-500" />
          </Button>
          <h1 className="text-orange-500 font-bold text-lg">
            Dynamite{" "}
            <span className="font-medium text-muted-foreground">BTS</span>
          </h1>
          <div className="w-6" /> {/* spacing placeholder */}
        </div>

        {/* Title */}
        <div className="absolute w-[338px] top-[80px] left-[26px] font-extrabold text-[#444444] text-[31px] text-center tracking-[-0.30px] leading-10">
          Repeat after me!
        </div>

        {/* Card */}
        <div className="absolute w-[360px] top-[80px] left-4">
          <Card className="absolute w-[360px] h-[361px] top-[34px] left-0 rounded-[20px] border-none shadow-none">
            <CardContent className="p-0 flex flex-col items-center justify-between h-full pt-14 pb-6">
              {/* English word */}
              <div className="w-[338px] font-extrabold text-[#444444] text-[37px] text-center tracking-[-0.30px] leading-10">
                {currentSentence.english}
              </div>

              {/* IPA pronunciation and play button */}
              <div className="flex items-center justify-center gap-3 mt-1">
                <div className="font-medium text-[#666666] text-[30px] tracking-[-0.2px]">
                  {currentSentence.pronunciation}
                </div>
                <Button
                  onClick={() => new Audio(currentSentence.audio).play()}
                  className="w-[40px] h-[40px] bg-[#A78BFA] rounded-[10px] shadow-[0px_4px_4px_#00000040] flex items-center justify-center hover:bg-[#9F7AFA] p-0"
                >
                  <Volume2 className="w-6 h-6 text-white" />
                </Button>
              </div>

              {/* Korean meaning */}
              <div className="w-[338px] font-extrabold text-[#444444] text-[28px] text-center tracking-[-0.30px] leading-10 mt-3">
                {currentSentence.korean}
              </div>

              {/* Recording controls */}
              <div className="flex gap-4 mt-4">
                {/* Mic button */}
                <Button 
                  onClick={startSpeechRecognition}
                  disabled={isRecording}
                  className={`w-[70px] h-[70px] ${isRecording ? 'bg-red-500' : 'bg-[#ffa55d]'} rounded-[20px] shadow-[0px_4px_4px_#00000040] flex items-center justify-center hover:${isRecording ? 'bg-red-600' : 'bg-[#ff9540]'}`}
                >
                  <Mic className="w-[46px] h-[41px] text-white" />
                </Button>

                {/* Stop button - only shown when recording */}
                {isRecording && (
                  <Button 
                    onClick={() => {
                      if (recognition) {
                        recognition.stop();
                        setRecognition(null);
                      }
                    }}
                    className="w-[70px] h-[70px] bg-gray-500 hover:bg-gray-600 rounded-[20px] shadow-[0px_4px_4px_#00000040] flex items-center justify-center"
                  >
                    <Square className="w-[30px] h-[30px] text-white" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Feedback message */}
        {feedback && (
          <div className="absolute w-[360px] top-[480px] left-4">
            <Card className="rounded-[20px] border-none shadow-md bg-white">
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-2">
                  <div className="text-xl font-bold text-[#444444]">
                    {feedbackType === 'success' ? '와우! 완벽해요! ⭐' : '다시 해보세요!'}
                  </div>
                  <div className="text-[#666666]">
                    당신이 말한 단어: "{spokenWord}"
                  </div>
                  <div className="w-full flex justify-between items-center mt-2">
                    <span className="text-[#444444]">정확도</span>
                    <span className={`font-bold ${similarity >= 80 ? 'text-green-500' : similarity >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                      {similarity}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Next button */}
        <Button
          onClick={handleNext}
          disabled={!spokenWord || similarity < 60}
          className="absolute w-[309px] h-[63px] top-[650px] left-[37px] bg-[#ffa55d] rounded-[50px] hover:bg-[#ffa55d] disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <span className="font-extrabold text-white text-[21px] text-center tracking-[-0.30px] leading-5">
            {currentIndex === sentences.length - 1 ? "DONE" : "NEXT"}
          </span>
        </Button>
      </div>
    </div>
  );
}
