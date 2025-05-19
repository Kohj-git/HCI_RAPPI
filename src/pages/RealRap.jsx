import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import audioFile from "../assets/audio/dynamite_mr.mp3";
import { Button } from "@/components/ui/button";

const lyrics = [
  "This is getting heavy",
  "Can you hear the bass boom? I'm ready (woo hoo)",
  "Life is sweet as honey",
  "Yeah, this beat cha-ching like money, huh",
  "Disco overload, I'm into that, I'm good to go",
  "I'm diamond, you know I glow up",
  "Hey, So let's go",
];

const timings = [0, 2, 4.5, 6, 9, 13, 15]; // 초 단위

export default function RealRap() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);
  const totalDuration = 18;

  useEffect(() => {
    audioRef.current = new Audio(audioFile);

    return () => {
      audioRef.current?.pause();
      clearInterval(intervalRef.current);
      clearInterval(progressRef.current);
    };
  }, []);

  const startRap = () => {
    setIsRecording(true);
    setCurrentLine(0);
    setProgress(0);
    audioRef.current?.play();

    intervalRef.current = setInterval(() => {
      const currentTime = audioRef.current.currentTime;
      for (let i = timings.length - 1; i >= 0; i--) {
        if (currentTime >= timings[i]) {
          setCurrentLine(i);
          break;
        }
      }
    }, 100);

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressRef.current);
          return 100;
        }
        return prev + 100 / totalDuration;
      });
    }, 1000);
  };

  const finishRap = () => {
    setIsRecording(false);
    audioRef.current?.pause();
    clearInterval(intervalRef.current);
    clearInterval(progressRef.current);
    navigate("/result", { state: { score: 100 } }); // 프로토타입용 점수
  };

  return (
    <div className="w-[390px] h-[744px] bg-gradient-to-b from-orange-50 to-orange-100 flex flex-col relative mx-auto overflow-hidden">
      {/* 상단바 */}
      <div className="bg-white shadow-sm flex items-center justify-between px-4 py-3">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => navigate(-1)}
          className="text-orange-500 hover:bg-orange-50"
        >
          <ArrowLeft size={20} />
        </Button>
        <div className="text-orange-500 font-bold text-lg flex items-center gap-1">
          Dynamite <span className="font-normal text-gray-500">BTS</span>
        </div>
        <div className="w-6" />
      </div>

      {/* 제목 */}
      <h1 className="text-xl font-bold text-gray-800 text-center my-4">Now it's your turn!</h1>

      {/* 가사 영역 */}
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
          <div className="text-sm text-gray-400 mb-2 min-h-6">{lyrics[currentLine - 1] || ""}</div>
          <motion.div
            key={currentLine}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-lg text-orange-600 font-bold bg-orange-50 p-3 rounded-lg my-2"
          >
            {lyrics[currentLine]}
          </motion.div>
          <div className="text-sm text-gray-400 mt-2 min-h-6">{lyrics[currentLine + 1] || ""}</div>
        </div>
      </div>

      {/* 마이크 버튼 + 진행 바 */}
      <div className="bg-white shadow-lg rounded-t-xl p-6 w-full">
        {isRecording && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>0:00</span>
              <span>0:{Math.floor(totalDuration * progress / 100).toString().padStart(2, '0')}</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-orange-400 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
        
        <div className="flex flex-col items-center">
          <motion.button
            onClick={isRecording ? finishRap : startRap}
            animate={{ scale: isRecording ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 1, repeat: isRecording ? Infinity : 0 }}
            className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl shadow-lg ${
              isRecording 
                ? "bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600" 
                : "bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600"
            }`}
          >
            🎙️
          </motion.button>
          
          <p className="text-gray-500 text-sm mt-3">
            {isRecording ? "Tap to finish" : "Tap to start rapping"}
          </p>
        </div>
      </div>
    </div>
  );
}