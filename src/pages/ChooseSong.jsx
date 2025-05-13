import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";
import { Signal, Wifi } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import RappiLogo from "@/assets/icons/rappi-logo.svg";
import PlayBtn from "@/assets/button/playbtn.svg";
import PauseBtn from "@/assets/button/pausebtn.svg";

import Dynamite from "@/assets/audio/BTS-Dynamite.mp3";

const songs = [
  { id: 1, title: "Dynamite", artist: "BTS", description: "A slow ballad perfect for beginners.", src: Dynamite },
  { id: 2, title: "Here with me", artist: "d4vid", description: "A slow ballad perfect for beginners.", scr:null},
  { id: 3, title: "My universe", artist: "Coldplay", description: "A slow ballad perfect for beginners.", scr:null},
  { id: 4, title: "Best song ever", artist: "One Direction", description: "A slow ballad perfect for beginners.", scr:null},
];

export default function ChooseSong() {
  const navigate = useNavigate();
  // const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const [current, setCurrent] = useState(null); // 현재 재생중인 곡 id
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  // 곡이 바뀌면 오디오 객체 새로 생성
  useEffect(() => {
    if (current !== null) {
      const song = songs.find((s) => s.id === current);
      if (song && song.src) {
        const newAudio = new Audio(song.src);
        setAudio(newAudio);
        setIsPlaying(true); // 자동재생
      }
    }
  }, [current]);

  // 재생/정지 관리
  useEffect(() => {
    if (!audio) return;
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
    // cleanup: 곡 바뀌거나 언마운트시 정지
    return () => {
      audio.pause();
    };
  }, [audio, isPlaying]);

  // 곡별 Play/Pause 버튼 클릭 핸들러
  const handlePlayPause = (song) => {
    if (!song.src) return; // mp3 없는 곡은 무시
    if (current === song.id) {
      setIsPlaying((prev) => !prev); // 같은 곡: 토글
    } else {
      setCurrent(song.id); // 다른 곡: 그 곡으로 변경 및 재생
    }
  };



  return (
    <div className="relative w-full max-w-[390px] h-[844px] bg-white mx-auto">
      {/* Status Bar */}
      <div className="w-full h-[47px] flex items-center justify-between px-5">
        <div className="font-semibold text-[14.2px] tracking-[-0.30px] text-[#ffa55d]">9:41</div>
        <div className="flex items-center gap-1.5">
          <Signal className="h-3.5 w-4" />
          <Wifi className="h-3.5 w-3.5" />
          <div className="relative w-[24px] h-[15px] border border-black rounded-[3px] flex items-center">
            <div className="absolute right-[2px] top-[2px] bottom-[2px] w-[18px] bg-black rounded-[1px]"></div>
          </div>
        </div>
      </div>


      {/* Header */}
      <div className=" items-center mt-1 px-5">
        <Button variant="ghost" size="icon" className="p-0 h-auto"
          onClick={()=>navigate(-1)}>
          <ChevronLeft className="h-[30px] w-[30px] text-[#ffa55d]" />
        </Button>
        <img src={RappiLogo} alt="Rappi Logo" className="h-7 w-[71px] ml-2" />
      </div>

      {/* Title */}
      <div className="mt-6 px-6">
        <h2 className="text-[22px] font-bold text-[#444] tracking-[-0.30px] leading-7">Songs for</h2>
        <h1 className="text-[33px] font-extrabold text-[#444] tracking-[-0.10px] leading-9">Beginner</h1>
      </div>

      {/* Song List */}
      <div className="mt-8 px-5 flex flex-col gap-2">
        {songs.map((song) => (
          <Card
            key={song.id}
            className={`w-full border-none ${
              song.id === 1 ? "bg-[#ffeddf]" : "bg-transparent"
            }`}
          >
            <CardContent className="p-0">
              <div className="relative w-full h-[82px] flex items-center">
                <div className="ml-[16px]">
                  <div className="font-extrabold text-[#444444] text-[22px] tracking-[-0.30px] leading-5">
                    {song.title}
                  </div>
                  <span className="font-semibold text-[#444444] text-sm tracking-[-0.30px] leading-5 ml-1">
                    {song.artist}
                  </span>
                  <div className="font-semibold text-[#444444] text-[15px] tracking-[-0.30px] leading-5 mt-2">
                    {song.description}
                  </div>
                </div>
                <div
                  className={`absolute right-[20px] w-[35px] h-[35px] rounded-full flex items-center justify-center
                    ${song.src ? "bg-[#ffa55d] cursor-pointer" : "bg-gray-300 cursor-not-allowed"}`}
                  onClick={() => handlePlayPause(song)}
                >
                  <img
                    src={
                      current === song.id && isPlaying
                        ? PauseBtn // 정지 아이콘 import했다면
                        : PlayBtn
                    }
                    alt="Play button"
                    className="w-[15px] h-[15px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* <audio ref={audioRef} src={Dynamite} /> */}

      {/* SELECT Button */}
      <div className="absolute bottom-[50px] left-0 right-0 px-5">
        <Button
          className="w-full h-[63px] bg-[#ffa55d] hover:bg-[#ff9540] rounded-[50px]"
          onClick={() => navigate("/readytolearn-word")} // 라우팅 대상에 따라 수정 필요
        >
          <span className="font-extrabold text-white text-[21px] tracking-[-0.30px] leading-5">SELECT</span>
        </Button>
      </div>
    </div>
  );
}
