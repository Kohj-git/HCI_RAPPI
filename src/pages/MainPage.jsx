import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Signal, Wifi } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

import RappiLogo from "@/assets/icons/rappi-logo.svg";

import Ellipse from "@/assets/ellipse.svg";
import Carrot from "@/assets/three-carrot.svg";

const MainPage = () => {
  const navigate = useNavigate();
  
  // Data for the status bar icons
  const statusBarData = {
    time: "9:41",
  };

  return (
    <div className="w-full h-screen bg-[#ffa55d33] overflow-hidden">
      <div className="relative w-full h-full">
        {/* Status Bar */}
        <div className="w-full h-[47px] pt-3">
          <div className="flex justify-between items-center px-6">
            <div className="font-semibold text-[14.2px] tracking-[-0.30px]">
              {statusBarData.time}
            </div>
            <div className="flex items-center gap-1.5">
              <Signal className="h-3.5 w-4" />
              <Wifi className="h-3.5 w-3.5" />
              <div className="relative w-[24px] h-[15px] border border-black rounded-[2px] flex items-center">
                <div className="absolute right-[2px] top-[2px] bottom-[2px] left-[2px] bg-black rounded-[1px] w-[18px]" />
                <div className="absolute -right-[4px] top-[4px] h-[7px] w-[1.5px] bg-black rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Logo */}
        <div className="mt-1 ml-6">
          <img src={RappiLogo} alt="Rappi Logo" className="h-7 w-[71px]" />
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-between h-[calc(100%-120px)]">
          {/* Circle with Text */}
          <div className="relative w-[350px] h-[350px] mt-20">
            <img 
              src={Ellipse} 
              alt="Circle" 
              className="w-full h-full object-contain"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <h1 className="text-[32px] font-bold mb-2">Pick your level,</h1>
              <h1 className="text-[32px] font-bold">Get your songs!</h1>
              <img
                src={Carrot}
                alt="Three Carrots"
                className="mt-4 w-16 mx-auto"
              />
            </div>
          </div>

          {/* Button */}
          <Button 
            className="w-[309px] h-[63px] bg-[#ffa55d] hover:bg-[#ff9a4a] rounded-[50px] font-extrabold text-2xl text-white mb-24"
            onClick={() => navigate("/choose-level")}
          >
            Pick Level
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
