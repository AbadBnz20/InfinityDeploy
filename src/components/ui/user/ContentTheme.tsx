'use client';

import { useTheme } from "next-themes";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

export const ContentTheme = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <>
      {theme === "light" ? (
        <IoMoonOutline size={"24px"} />
      ) : (
        <IoSunnyOutline size={"24px"} />
      )}
    </>
  );
};