import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Signal, Wifi } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

import RappiLogo from "@/assets/icons/rappi-logo.svg";

import EllipseWhite from "@/assets/ellipse-white.svg";
import EllipseOrange from "@/assets/ellipse-orange.svg";
import Carrot from "@/assets/carrot.svg";

const MainPage = () => {
  const navigate = useNavigate();
  
  // Data for the status bar icons
  const statusBarData = {
    time: "9:41",
  };

  const carrotConfig = [
    { id: 1, rotation: "0deg", className: "transform -translate-y-2" },
    { id: 2, rotation: "29.25deg", className: "" },
    { id: 3, rotation: "59.23deg", className: "transform -translate-y-1" },
  ];


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
        <div className="flex flex-col items-center justify-center mt-16">
          {/* Orange Border Circle */}
          {/* <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full border-2 border-[#ffa55d]"></div> */}
          
          {/* White Background Circle */}
          {/* <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[346px] h-[346px] rounded-full bg-white"></div> */}
          
          {/* Orange Circle (Background/Shadow) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px]">
            <img 
              src={EllipseOrange} 
              alt="Orange Circle" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* White Circle (Foreground) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[346px] h-[346px]">
            <img 
              src={EllipseWhite} 
              alt="White Circle" 
              className="w-full h-full object-cover"
            />
          </div>

          <Card className="relative w-[350px] h-[350px] rounded-full border-0 shadow-none">
            <CardContent className="flex flex-col items-center justify-center h-full p-0">
              <div className="text-center">
                <h1 className="font-extrabold text-3xl text-[#444444] tracking-[-0.30px] leading-[55px]">
                  Pick your level,
                  <br />
                  Get your songs!
                </h1>
              </div>
              <div className="flex items-end justify-center gap-4 mt-8">
                {carrotConfig.map((carrot) => (
                  <div
                    key={carrot.id}
                    className={`relative w-12 h-16 ${carrot.className}`}
                    style={{ transform: `rotate(${carrot.rotation})` }}
                  >
                    <img 
                      src={Carrot} 
                      alt="Carrot" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Button */}
          <div className="absolute bottom-24 left-0 right-0 flex justify-center">
            <Button 
              className="w-[309px] h-[63px] bg-[#ffa55d] hover:bg-[#ff9a4a] rounded-[50px] font-extrabold text-2xl text-white"
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
