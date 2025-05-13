"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const lyrics = [
  "This is getting heavy",
  "Can you hear the bass boom? I'm ready (woo hoo)",
  "Life is sweet as honey",
  "Yeah, this beat cha-ching like money, huh",
  "Disco overload, I'm into that, I'm good to go",
  "I'm diamond, you know I glow up",
  "Hey, So let's go",
];

const timings = [0, 2, 4.5, 6, 9, 13, 15]; // 각 가사가 시작되는 시간 (초)

export default function LyricsPage() {
  const navigate = useNavigate();
  const [currentLine, setCurrentLine] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = audioRef.current?.currentTime || 0;
      for (let i = timings.length - 1; i >= 0; i--) {
        if (currentTime >= timings[i]) {
          setCurrentLine(i);
          break;
        }
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-[390px] h-[744px] bg-[#FFEDDF] flex flex-col relative overflow-hidden mx-auto">
      
      {/* 헤더 */}
      <div className="flex items-center justify-between px-4 py-3">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="text-orange-400" />
        </Button>
        <div className="text-orange-400 font-bold text-lg">
          Dynamite <span className="font-normal">BTS</span>
        </div>
        <div className="w-6" />
      </div>

      {/* 가사 영역 */}
      <div className="relative flex-1 flex flex-col items-center justify-center">
        {/* 지나간 가사 */}
        <div className="absolute top-[100px]">
          <div className="flex flex-col items-center space-y-1 px-4">
            {lyrics.slice(0, currentLine).map((line, index) => (
              <p key={index} className="text-sm text-orange-300">
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* 현재 가사 */}
        <motion.div
          key={currentLine}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="z-10 bg-white px-4 py-2 rounded-md shadow-md absolute top-[250px]"
        >
          <p className="text-orange-500 font-bold text-lg text-center">
            {lyrics[currentLine]}
          </p>
        </motion.div>

        {/* 이후 가사 */}
        <div className="absolute top-[320px]">
          <div className="flex flex-col items-center space-y-1 px-4">
            {lyrics.slice(currentLine + 1).map((line, index) => (
              <p key={index} className="text-sm text-black-300 opacity-60">
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>

      

      {/* 오디오 플레이어 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <audio ref={audioRef} controls>
          <source src="/audio/dynamite.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>

      <Button onClick={() => navigate("/result")} className="w-full max-w-md text-lg py-6 rounded-full bg-orange-400 hover:bg-orange-500">
              Complete!
            </Button>
    </div>
  );
}

