"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const Cutscene = () => {
  const dialogue = [
    "This is the first line of dialogue.",
    "Here's the second line of dialogue.",
    "And finally, the third line.",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextDialogue = () => {
    if (currentIndex < dialogue.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div
      className="relative w-screen h-screen flex flex-col justify-end items-center bg-black"
      onClick={handleNextDialogue}
    >
      {/* Character Image */}
      <img
        src="/character.png" // Replace with actual character image path
        alt="Character"
        className="absolute bottom-32 w-1/3"
      />

      {/* Dialogue Box */}
      <div className="w-3/4 h-32 bg-gray-800 rounded-xl p-4 relative">
        <motion.span
          key={currentIndex} // Ensures re-animation on text change
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-white text-lg"
        >
          {dialogue[currentIndex]}
        </motion.span>
      </div>
    </div>
  );
};

export default Cutscene;
