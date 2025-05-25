import React, { useState, useEffect } from "react";
import { ChevronLeft, Signal, Wifi } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

import LineCarrot from "@/assets/line-carrot.svg";
import ShadowCarrot from "@/assets/shadow-carrot.svg";

const wordPairs = [
  { english: "morning", korean: "아침", ipa: "[ˈmɔːrnɪŋ]" },
  { english: "walk", korean: "걷다", ipa: "[wɔːk]" },
  { english: "top", korean: "꼭대기, 최고", ipa: "[tɑːp]" },
  { english: "ping pong", korean: "탁구", ipa: "[ˈpɪŋ ˌpɒŋ]" },
  { english: "heavy", korean: "무거운", ipa: "[ˈhɛvi]" },
  { english: "ready", korean: "준비된", ipa: "[ˈrɛdi]" },
];

export default function Result() {
  const navigate = useNavigate();
  const [showSheet, setShowSheet] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setShowSheet(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#ffeddf] flex items-center justify-center">
      <div className="relative w-full max-w-[390px] h-screen bg-[#ffeddf] flex flex-col mx-auto">
        {/* Status Bar */}
        <div className="w-full h-[47px] flex items-center justify-between px-5">
          <div className="font-semibold text-[14.2px] tracking-[-0.30px]">
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
        <div className="flex items-center mt-2 px-5">
          <ChevronLeft className="h-6 w-6 text-[#ffa55d]" />
          <div className="flex-1 flex justify-center items-center">
            <span className="text-[#ffa55d] text-[22px] font-extrabold tracking-[-0.30px] leading-5">
              Hello
            </span>
            <span className="ml-2 text-[#ffa55d] text-sm font-bold tracking-[-0.30px] leading-5">
              Adele
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="mt-2 mb-1 text-center z-20 relative">
          <div className="font-extrabold text-[#444444] text-[28px] tracking-[-0.30px] leading-[32px]">
            Review words
          </div>
        </div>

        {/* Word List Card */}
        <Card className="relative z-10 mt-2 mx-4 mb-16 rounded-2xl bg-white shadow border-none overflow-visible">
          <CardContent className="p-7">
            <div className="grid grid-cols-2 gap-3">
              {wordPairs.map((pair, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-5 shadow-sm">
                  <div className="text-lg font-bold text-gray-800 text-center">
                    {pair.english}
                  </div>
                  <div className="text-base text-gray-600 mt-1.5 text-center">
                    {pair.korean}
                  </div>
                  <div className="text-sm text-gray-400 italic mt-1.5 text-center">
                    {pair.ipa}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bottom Button */}
        <div className="flex justify-center mt-2">
          <Button
            onClick={() => navigate("/choose-level")}
            className="w-[309px] h-[55px] bg-[#ffa55d] hover:bg-[#ff9a4a] rounded-[50px] text-white text-[20px] font-extrabold shadow"
          >
            Pick another song
          </Button>
        </div>

        {/* Bottom Sheet */}
        <AnimatePresence>
          {showSheet && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
              className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto bg-white rounded-t-[30px] shadow-lg z-50 px-6 pt-4 pb-6"
            >
              <div className="w-12 h-1.5 bg-[#ccc] rounded-full mx-auto mb-4" />
              <div className="text-center">
                <div className="text-[#444444] text-[18px] font-bold mb-1">
                  Rabbi gave you
                </div>
                <div className="text-[#ffa55d] text-[36px] font-extrabold mb-4">
                  3 carrots!
                </div>
                <img
                  src={ShadowCarrot}
                  className="w-[120px] h-auto mb-6 mx-auto"
                />
                <button
                  onClick={() => setShowSheet(false)}
                  className="bg-[#ffa55d] hover:bg-[#ff9a4a] w-[240px] h-[55px] rounded-full text-white font-extrabold text-xl shadow"
                >
                  Review words
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
