"use client";

import { useRef, useState, useCallback } from "react";

export type AmbientMode = "off" | "rain" | "cafe";

interface AmbientNodes {
  ctx:    AudioContext;
  source: AudioBufferSourceNode;
  gain:   GainNode;
  filter: BiquadFilterNode;
}

function buildRainNodes(ctx: AudioContext): AmbientNodes {
  // White noise through a low-pass filter = rain
  const bufferSize = ctx.sampleRate * 2;
  const buffer     = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data       = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;

  const source      = ctx.createBufferSource();
  source.buffer     = buffer;
  source.loop       = true;

  const filter      = ctx.createBiquadFilter();
  filter.type       = "lowpass";
  filter.frequency.value = 600;
  filter.Q.value    = 0.5;

  const gain        = ctx.createGain();
  gain.gain.value   = 0.18;

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  return { ctx, source, gain, filter };
}

function buildCafeNodes(ctx: AudioContext): AmbientNodes {
  // Brown noise (filtered) = muffled café hum
  const bufferSize = ctx.sampleRate * 2;
  const buffer     = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data       = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < bufferSize; i++) {
    const white = Math.random() * 2 - 1;
    data[i]     = (last + 0.02 * white) / 1.02;
    last        = data[i];
    data[i]    *= 3.5;
  }

  const source      = ctx.createBufferSource();
  source.buffer     = buffer;
  source.loop       = true;

  const filter      = ctx.createBiquadFilter();
  filter.type       = "bandpass";
  filter.frequency.value = 300;
  filter.Q.value    = 0.7;

  const gain        = ctx.createGain();
  gain.gain.value   = 0.22;

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  return { ctx, source, gain, filter };
}

export function useAmbientSound() {
  const [mode, setMode]     = useState<AmbientMode>("off");
  const nodesRef            = useRef<AmbientNodes | null>(null);

  const stop = useCallback(() => {
    if (!nodesRef.current) return;
    const { source, gain, ctx } = nodesRef.current;
    gain.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
    setTimeout(() => {
      try { source.stop(); } catch { /* already stopped */ }
      try { ctx.close();  } catch { /* already closed  */ }
    }, 600);
    nodesRef.current = null;
  }, []);

  const activate = useCallback((next: AmbientMode) => {
    stop();
    if (next === "off") { setMode("off"); return; }

    const ctx   = new AudioContext();
    const nodes = next === "rain" ? buildRainNodes(ctx) : buildCafeNodes(ctx);

    // Fade in
    nodes.gain.gain.value = 0;
    nodes.source.start();
    nodes.gain.gain.setTargetAtTime(
      next === "rain" ? 0.18 : 0.22,
      ctx.currentTime,
      0.4
    );

    nodesRef.current = nodes;
    setMode(next);
  }, [stop]);

  const cycle = useCallback(() => {
    const order: AmbientMode[] = ["off", "rain", "cafe"];
    const next = order[(order.indexOf(mode) + 1) % order.length];
    activate(next);
  }, [mode, activate]);

  return { mode, cycle, stop };
}
