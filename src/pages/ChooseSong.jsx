import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, Signal, Wifi } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import RappiLogo from "@/assets/icons/rappi-logo.svg";
import PlayBtn from "@/assets/button/playbtn.svg";
import PauseBtn from "@/assets/button/pausebtn.svg";
import Dynamite from "@/assets/audio/BTS-Dynamite.mp3";

const songs = [
  {
    id: 1,
    title: "Dynamite",
    artist: "BTS",
    description: "A slow ballad perfect for beginners.",
    src: Dynamite,
  },
  {
    id: 2,
    title: "Here with me",
    artist: "d4vid",
    description: "A slow ballad perfect for beginners.",
    src: null,
  },
  {
    id: 3,
    title: "My universe",
    artist: "Coldplay",
    description: "A slow ballad perfect for beginners.",
    src: null,
  },
  {
    id: 4,
    title: "Best song ever",
    artist: "One Direction",
    description: "A slow ballad perfect for beginners.",
    src: null,
  },
];

export default function ChooseSong() {
  const navigate = useNavigate();

  const [current, setCurrent] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  const [showModal, setShowModal] = useState(false); // ✅ 모달 상태

  useEffect(() => {
    if (current !== null) {
      const song = songs.find((s) => s.id === current);
      if (song && song.src) {
        const newAudio = new Audio(song.src);
        setAudio(newAudio);
        setIsPlaying(true);
      }
    }
  }, [current]);

  useEffect(() => {
    if (!audio) return;
    isPlaying ? audio.play() : audio.pause();
    return () => audio.pause();
  }, [audio, isPlaying]);

  const handlePlayPause = (song) => {
    if (!song.src) return;
    if (current === song.id) {
      setIsPlaying((prev) => !prev);
    } else {
      setCurrent(song.id);
    }
  };

  const handleSelect = () => {
    setShowModal(true); // ✅ 모달 열기
  };

  const handleConfirm = () => {
    setShowModal(false);
    navigate("/ready-to-learn-word");
  };

  return (
    <div className="relative w-full max-w-[390px] h-[844px] bg-white mx-auto">
      {/* Status Bar */}
      <div className="w-full h-[47px] flex items-center justify-between px-5">
        <div className="font-semibold text-[14.2px] tracking-[-0.30px] text-[#ffa55d]">
          9:41
        </div>
        <div className="flex items-center gap-1.5">
          <Signal className="h-3.5 w-4" />
          <Wifi className="h-3.5 w-3.5" />
          <div className="relative w-[24px] h-[15px] border border-black rounded-[3px] flex items-center">
            <div className="absolute right-[2px] top-[2px] bottom-[2px] w-[18px] bg-black rounded-[1px]" />
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="items-center mt-1 px-5">
        <Button
          variant="ghost"
          size="icon"
          className="p-0 h-auto"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft className="h-[30px] w-[30px] text-[#ffa55d]" />
        </Button>
        <img src={RappiLogo} alt="Rappi Logo" className="h-7 w-[71px] ml-2" />
      </div>

      {/* Title */}
      <div className="mt-6 px-6">
        <h2 className="text-[22px] font-bold text-[#444]">Songs for</h2>
        <h1 className="text-[33px] font-extrabold text-[#444]">Beginner</h1>
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
                  <span className="font-semibold text-[#444444] text-sm ml-1">
                    {song.artist}
                  </span>
                  <div className="font-semibold text-[#444444] text-[15px] mt-2">
                    {song.description}
                  </div>
                </div>
                <div
                  className={`absolute right-[20px] w-[35px] h-[35px] rounded-full flex items-center justify-center
                    ${
                      song.src
                        ? "bg-[#ffa55d] cursor-pointer"
                        : "bg-gray-300 cursor-not-allowed"
                    }`}
                  onClick={() => handlePlayPause(song)}
                >
                  <img
                    src={current === song.id && isPlaying ? PauseBtn : PlayBtn}
                    alt="Play button"
                    className="w-[15px] h-[15px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* SELECT Button */}
      <div className="absolute bottom-[160px] left-0 right-0 px-5">
        <Button
          className="w-full h-[63px] bg-[#ffa55d] hover:bg-[#ff9540] rounded-[50px]"
          onClick={handleSelect}
        >
          <span className="font-extrabold text-white text-[21px] tracking-[-0.30px] leading-5">
            SELECT
          </span>
        </Button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[80%] max-w-sm shadow-lg text-center">
            <h2 className="text-lg font-bold text-[#444] mb-2">
              Before you begin
            </h2>
            <p className="text-sm text-[#666] mb-4">
              Let’s start by learning the <strong>words</strong>, <br />
              then move on to the <strong>sentences</strong>!
            </p>
            <Button
              onClick={handleConfirm}
              className="bg-[#ffa55d] hover:bg-[#ff9540] w-full rounded-full text-white font-bold"
            >
              Start learning
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
