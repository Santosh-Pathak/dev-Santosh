"use client";

import { useState, useEffect, useRef } from "react";

interface TypewriterOptions {
  typingSpeed?:  number; // ms per character (typing)
  deleteSpeed?:  number; // ms per character (deleting)
  pauseAfterType?:   number; // ms to pause when phrase is fully typed
  pauseAfterDelete?: number; // ms to pause before typing next phrase
}

export function useTypewriter(
  phrases: string[],
  {
    typingSpeed      = 55,
    deleteSpeed      = 28,
    pauseAfterType   = 1800,
    pauseAfterDelete = 400,
  }: TypewriterOptions = {}
) {
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const phraseIdxRef = useRef(0);
  const charIdxRef   = useRef(0);

  useEffect(() => {
    if (!phrases.length) return;

    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const phrase = phrases[phraseIdxRef.current];

      if (!isDeleting) {
        // --- typing forward ---
        if (charIdxRef.current < phrase.length) {
          charIdxRef.current += 1;
          setDisplayed(phrase.slice(0, charIdxRef.current));
          timer = setTimeout(tick, typingSpeed);
        } else {
          // done typing → pause, then start deleting
          timer = setTimeout(() => setIsDeleting(true), pauseAfterType);
        }
      } else {
        // --- deleting ---
        if (charIdxRef.current > 0) {
          charIdxRef.current -= 1;
          setDisplayed(phrase.slice(0, charIdxRef.current));
          timer = setTimeout(tick, deleteSpeed);
        } else {
          // done deleting → advance phrase, pause, then start typing
          phraseIdxRef.current = (phraseIdxRef.current + 1) % phrases.length;
          timer = setTimeout(() => setIsDeleting(false), pauseAfterDelete);
        }
      }
    };

    timer = setTimeout(tick, isDeleting ? deleteSpeed : typingSpeed);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleting]);

  return displayed;
}
