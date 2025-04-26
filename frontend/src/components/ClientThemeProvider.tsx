"use client";

import { createContext, useContext, useEffect, useState } from "react";

// 1. Define the type
type ThemeContextType = {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
};

// 2. Create the context
const ThemeContext = createContext<ThemeContextType>({
  theme: "dark", // default
  setTheme: () => {}, // dummy default
});

// 3. Export a custom hook to use it easily
export function useTheme() {
  return useContext(ThemeContext);
}

// 4. The provider component
export default function ClientThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    if (theme === "light") {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
