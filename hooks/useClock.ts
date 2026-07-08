"use client";

import { useState, useEffect } from "react";

function formatTime(date: Date) {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function useClock() {
  const [time, setTime] = useState(() => formatTime(new Date()));

  useEffect(() => {
    const tick = () => setTime(formatTime(new Date()));
    // Align to next minute boundary
    const now = new Date();
    const msToNextMinute = (60 - now.getSeconds()) * 1000 - now.getMilliseconds();

    const initialTimeout = setTimeout(() => {
      tick();
      const interval = setInterval(tick, 60000);
      return () => clearInterval(interval);
    }, msToNextMinute);

    return () => clearTimeout(initialTimeout);
  }, []);

  return time;
}
