"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const ModeToggle = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render theme-dependent UI after hydration to avoid mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // SSR-safe placeholder (keeps layout stable)
    return <div style={{ width: 40, height: 24 }} aria-hidden />;
  }

  // Prefer resolvedTheme which resolves "system" to "light" or "dark"
  const current = resolvedTheme ?? theme;

  return (
    <div>
      <button
        onClick={() => setTheme(current === "dark" ? "light" : "dark")}
        aria-label="Toggle color theme"
      >
        {current === "dark" ? "🌙" : "☀️"}
      </button>
    </div>
  );
};

export default ModeToggle;
