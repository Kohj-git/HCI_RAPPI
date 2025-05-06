"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function StartRapScreen() {
    const router = useRouter();
  return (
    <div className="bg-[#ffeddf] flex flex-col items-center justify-between min-h-screen bg-peach px-6 py-8">
      <div className="w-full flex items-center justify-between">
        <ArrowLeft className="text-orange-500" />
        <h1 className="text-orange-500 font-bold text-lg">Dynamite <span className="font-medium text-muted-foreground">BTS</span></h1>
        <div className="w-6" /> {/* Placeholder for alignment */}
      </div>

      <div className="flex flex-col items-center justify-center gap-6 flex-1">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="bg-white shadow-md rounded-xl px-6 py-4 text-xl font-bold text-center text-gray-800">
          Drop the beat!
        </motion.div>

        <div className="relative flex items-center justify-center">
          <motion.img 
            src="/cool-bunny.png" 
            alt="cool bunny" 
            className="w-33 h-24"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
          />
        </div>
      </div>

      <Button onClick={() => router.push("/startrap")} className="w-full max-w-md text-lg py-6 rounded-full bg-orange-400 hover:bg-orange-500">
        START!!
      </Button>
    </div>
  );
}
