import { useComplementaryColor } from "@/shared/lib";
import React, { createContext, useContext, useState } from "react";

interface ThemeContextType {
  bgColor: string;
  textColor: string;
  setBgColor: (bg: string, text?: string) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bgColor, setBgColorState] = useState("#1a1a1a"); // 초기 배경색
  const [textColor, setTextColorState] = useState("#ffffff"); // 초기 텍스트색

  const setBgColor = (bg: string, text?: string) => {
    setBgColorState(bg);
    if (text) {
      setTextColorState(text);
    } else {
      // text 미제공 시, bg의 보색 자동 계산
      const complementary = useComplementaryColor(bg);
      setTextColorState(complementary);
    }
  };

  return (
    <ThemeContext.Provider value={{ bgColor, textColor, setBgColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be inside ThemeProvider");
  return context;
};
