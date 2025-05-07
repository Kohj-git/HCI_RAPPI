import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Signal, Wifi } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

import RappiLogo from "@/assets/icons/rappi-logo.svg";
import Rabbit from "@/assets/rabbit.svg";
import SpeechBubble from "@/assets/speech-bubble.svg";

export default function ChooseLevel() {
    const navigate = useNavigate();

  const [selectedLevel, setSelectedLevel] = React.useState("beginner");

  // Data for the level options
  const levels = [
    { id: "beginner", label: "Beginner" },
    { id: "intermediate", label: "Intermediate" },
    { id: "advanced", label: "Advanced" },
  ];

  return (
    <div className="relative w-full max-w-[390px] h-[844px] bg-white mx-auto">
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

    {/* Logo */}
    <div className="mt-1 ml-6">
        <img src={RappiLogo} alt="Rappi Logo" className="h-7 w-[71px]" />
    </div>

      {/* Main Heading */}
      <div className="mt-10 px-6">
        <h1 className="[font-family:'Inter-ExtraBold',Helvetica] font-extrabold text-[#444444] text-[27px] text-center tracking-[-0.30px] leading-10">
          Pick your English level
        </h1>
      </div>

      {/* Level Selection */}
    <div className="mt-8 px-5">
        <RadioGroup 
          value={selectedLevel} 
          onValueChange={setSelectedLevel}
          className="space-y-3"
        >
          {levels.map((level) => (
            <Card
              key={level.id}
              className="border border-[#c1c1c1] rounded-[10px] shadow-none"
            >
              <CardContent className="p-0">
                <div className="flex items-center justify-between px-8 py-4">
                  <Label
                    htmlFor={level.id}
                    className="font-semibold text-[#444444] text-[19px] tracking-[-0.30px] leading-5 cursor-pointer"
                  >
                    {level.label}
                  </Label>
                  <div
                    className={
                      selectedLevel === level.id
                        ? "w-[25px] h-[25px] rounded-[12.5px] border-[6px] border-solid border-[#ffa55d]"
                        : "w-[25px] h-[25px] rounded-[12.5px] border border-solid border-[#c1c1c1]"
                    }
                  >
                    <RadioGroupItem
                      value={level.id}
                      id={level.id}
                      className="sr-only"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </RadioGroup>
      </div>

    {/* Description Bubble and Character */}
      <div className="relative mt-8 px-5">
        <div className="relative">
          {/* Speech Bubble with SVG */}
          <div className="relative w-full">
            <img
              src={SpeechBubble}
              alt="Speech Bubble"
              className="w-full"
            />
            {/* Text overlay */}
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center">
              <p className="font-semibold text-[#444444] text-base leading-[25px] px-8 py-6">
                In this level, you'll start getting the rhythm and flow of
                English!
                <br />
                Sing along, practice often, and you'll go far!
              </p>
            </div>
          </div>

          {/* Rabbit Character */}
          <div className="absolute bottom-[-80px] right-[20px] w-[150px] h-[150px]">
            <div className="relative">
              {/* This would be the rabbit character - using a placeholder */}
              <img
                src={Rabbit}
                alt="Cartoon rabbit with carrot"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="absolute bottom-[50px] left-0 right-0 px-5">
        <Button className="w-full h-[63px] bg-[#ffa55d] hover:bg-[#ff9540] rounded-[50px]"
            onClick={() => navigate("/choose-song")}
            >
          <span className="[font-family:'Inter-ExtraBold',Helvetica] font-extrabold text-white text-[21px] tracking-[-0.30px] leading-5">
            CONTINUE
          </span>
        </Button>
      </div>
    </div>
  );
}
