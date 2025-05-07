import React, { useState, useEffect } from "react";
import { Battery, ChevronLeft, Signal, Wifi, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";

import LineCarrot from "@/assets/line-carrot.svg"
import ShadowCarrot from "@/assets/shadow-carrot.svg";

const wordPairs = [
    { english: "Hello", korean: "안녕", checked: false },
    { english: "World", korean: "세계", checked: false },
    { english: "Love", korean: "사랑", checked: false },
    { english: "Peace", korean: "평화", checked: false },
    { english: "Dream", korean: "꿈", checked: false },
    { english: "Hope", korean: "희망", checked: false },
  ];


export default function Result() {
    const [showSheet, setShowSheet] = useState(false);
    const [pairs, setPairs] = useState(wordPairs);

    useEffect(() => {
        // 페이지 진입 시 바텀시트 자동 표시
        const timer = setTimeout(() => setShowSheet(true), 300); // 살짝 delay 줌
        return () => clearTimeout(timer);
      }, []);

    const handleCheck = (idx, checked) => {
        setPairs(prev =>
          prev.map((item, i) =>
            i === idx ? { ...item, checked } : item
          )
        );
      };

  return (
    <div className="min-h-screen w-full bg-[#ffeddf] flex items-center justify-center ">
        <div className="relative w-full max-w-[390px] min-h-screen bg-[#ffeddf] flex flex-col mx-auto">
        {/* Status Bar */}
        <div className="w-full h-[47px] flex items-center justify-between px-5">
         <div className="font-semibold text-[14.2px] tracking-[-0.30px]">
           9:41
         </div>
         <div className="flex items-center gap-1.5">
           <Signal className="h-3.5 w-4" />
           <Wifi className="h-3.5 w-3.5" />
           <div className="relative w-[24px] h-[15px] border border-black rounded-[3px] flex items-center">
             <div className="absolute right-[2px] top-[2px] bottom-[2px] w-[18px] bg-black rounded-[1px]"></div>
           </div>
         </div>
       </div>

        {/* Header */}
        <div className="flex items-center mt-2 px-5">
          <ChevronLeft className="h-6 w-6 text-[#ffa55d]" />
          <div className="flex-1 flex justify-center items-center">
            <span className="text-[#ffa55d] text-[22px] font-extrabold tracking-[-0.30px] leading-5">Hello</span>
            <span className="ml-2 text-[#ffa55d] text-sm font-bold tracking-[-0.30px] leading-5">Adele</span>
          </div>
        </div>

        {/* Title */}
        <div className="mt-8 text-center font-extrabold text-[#444444] text-[33px] tracking-[-0.30px] leading-[50px]">
          Review words
        </div>

        {/* Carrot Decoration */}
        <div className="absolute top-[170px] right-8 z-10">
          <img src={LineCarrot} alt="Line carrot" className="w-[80px] h-[60px] opacity-80" />
        </div>

        {/* Word List Card */}
        <Card className="relative mt-6 mx-4 rounded-2xl bg-white pt-4 pb-4 shadow border-none">
          <CardContent className="p-0">
            <div className="max-h-[330px] overflow-y-auto pr-2">
              {pairs.map((pair, idx) => (
                <div key={idx} className="flex items-center px-4 py-3">
                  <Checkbox
                    checked={pair.checked}
                    onCheckedChange={checked => handleCheck(idx, checked)}
                    className="h-[23px] w-[23px] border-2 border-[#c1c1c1] rounded-[4px] data-[state=checked]:bg-[#ffa55d] data-[state=checked]:border-[#ffa55d] mr-6"
                  />
                    {pair.checked && (
                    <Check className="absolute w-4 h-4 text-white pointer-events-none" />
                    )}
                  <div className="flex-1 flex justify-between items-center">
                    <span className="font-extrabold text-[#444444] text-2xl">{pair.english}</span>
                    <span className="font-semibold text-[#444444] text-xl">{pair.korean}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Bottom Button */}
        <div className="flex justify-center mt-auto mb-[36px]">
          <Button className="w-[309px] h-[63px] bg-[#ffa55d] hover:bg-[#ff9a4a] rounded-[50px] text-white text-[22px] font-extrabold shadow">
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
              className="fixed bottom-0 left-0 right-0 max-w-[390px] mx-auto bg-white rounded-t-[30px] shadow-lg z-50 px-6 pt-6 pb-10"
            >
              {/* Drag Bar */}
              <div className="w-12 h-1.5 bg-[#ccc] rounded-full mx-auto mb-4"></div>

              <div className="text-center">
                <div className="text-[#444444] text-[18px] font-bold mb-1">
                  Rabbi gave you
                </div>
                <div className="text-[#ffa55d] text-[36px] font-extrabold mb-4">
                  3 carrots!
                </div>
                <img src={ShadowCarrot} className="w-[120px] h-auto mb-6 mx-auto" />
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
