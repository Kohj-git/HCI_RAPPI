"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Check, Mic } from "lucide-react";
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
    },
    {
      english: "kick",
      korean: "차다",
      pronunciation: "[kɪk]",
      feedback: "Awesome!",
    },
    {
      english: "walk",
      korean: "걷다",
      pronunciation: "[wɔːk]",
      feedback: "Keep it up!",
    },
    {
      english: "top",
      korean: "꼭대기, 최고",
      pronunciation: "[tɑːp]",
      feedback: "Cool~~",
    },
    {
      english: "ping pong",
      korean: "탁구",
      pronunciation: "[ˈpɪŋ ˌpɒŋ]",
      feedback: "Great!",
    },
    {
      english: "heavy",
      korean: "무거운",
      pronunciation: "[ˈhɛvi]",
      feedback: "Very good",
    },
    {
      english: "ready",
      korean: "준비된",
      pronunciation: "[ˈrɛdi]",
      feedback: "Awesome",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate("/readytolearn-sentence");
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
        <div className="absolute w-[338px] top-[115px] left-[26px] font-extrabold text-[#444444] text-[31px] text-center tracking-[-0.30px] leading-10">
          Repeat after me!
        </div>

        {/* Card */}
        <div className="absolute w-[360px] top-[186px] left-4">
          <Card className="absolute w-[360px] h-[361px] top-[34px] left-0 rounded-[20px] border-none shadow-none">
            <CardContent className="p-0 flex flex-col items-center justify-between h-full pt-14 pb-6">
              {/* English word */}
              <div className="w-[338px] font-extrabold text-[#444444] text-[37px] text-center tracking-[-0.30px] leading-10">
                {currentSentence.english}
              </div>

              {/* IPA pronunciation */}
              <div className="w-[338px] font-medium text-[#666666] text-[30px] text-center tracking-[-0.2px] mt-1">
                {currentSentence.pronunciation}
              </div>

              {/* Korean meaning */}
              <div className="w-[338px] font-extrabold text-[#444444] text-[28px] text-center tracking-[-0.30px] leading-10 mt-3">
                {currentSentence.korean}
              </div>

              {/* Mic button */}
              <Button className="w-[70px] h-[70px] bg-[#ffa55d] rounded-[20px] shadow-[0px_4px_4px_#00000040] mt-6 flex items-center justify-center hover:bg-[#ff9540]">
                <Mic className="w-[46px] h-[41px] text-white" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Feedback message */}
        <div className="absolute flex items-center justify-center gap-3 top-[683px] left-[124px]">
          <Check className="w-[22px] h-[22px] text-[#444444]" />
          <div className="font-bold text-[#444444] text-xl text-center tracking-[-0.30px] leading-10">
            {currentSentence.feedback}
          </div>
        </div>

        {/* Next button */}
        <Button
          onClick={handleNext}
          className="absolute w-[309px] h-[63px] top-[728px] left-[37px] bg-[#ffa55d] rounded-[50px] hover:bg-[#ffa55d] disabled:bg-gray-400"
        >
          <span className="font-extrabold text-white text-[21px] text-center tracking-[-0.30px] leading-5">
            {currentIndex === sentences.length - 1 ? "DONE" : "NEXT"}
          </span>
        </Button>
      </div>
    </div>
  );
}
