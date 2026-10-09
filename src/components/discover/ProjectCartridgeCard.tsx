"use client";

import React, { useRef, useState } from "react";
import { Check, Plus, Bell, Radio, Lock, Zap } from "lucide-react";

interface ProjectCartridgeCardProps {
  id: string;
  projectCode: string;
  tagline: string;
  genre: string;
  phase: string;
  statusBadge: string;
  accentColor: string;
  description: string;
  progressPercent: number;
  icon: React.ComponentType<{ className?: string }>;
}

export function ProjectCartridgeCard({
  id,
  projectCode,
  tagline,
  genre,
  phase,
  statusBadge,
  accentColor,
  description,
  progressPercent,
  icon: Icon,
}: ProjectCartridgeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isNotified, setIsNotified] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.18,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
      }}
      className="group relative"
    >
      <div
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: "transform 150ms cubic-bezier(0.2, 0, 0, 1)",
        }}
        className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-[rgba(6,10,15,0.88)] p-6 backdrop-blur-2xl transition-all duration-300 group-hover:border-[#00e5ff]/50 group-hover:shadow-[0_0_40px_rgba(0,229,255,0.22)]"
      >
        {/* Dynamic Holographic Specular Glare */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 240px at ${glare.x}% ${glare.y}%, rgba(0,229,255,${glare.opacity}), transparent 80%)`,
          }}
        />

        {/* Top Card Bar */}
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#00e5ff] animate-pulse shadow-[0_0_8px_#00e5ff]" />
              <span className="font-mono text-xs font-bold tracking-widest text-[#00e5ff]">
                {projectCode}
              </span>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#00e5ff]/30 bg-[#00e5ff]/10 px-2.5 py-0.5 text-[10px] font-bold text-[#00e5ff]">
              {statusBadge}
            </span>
          </div>

          {/* Interactive Holographic Display Chamber */}
          <div className="relative my-5 flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#03060a]">
            {/* Cyber Grid Lines */}
            <div
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage: `linear-gradient(to right, #00e5ff 1px, transparent 1px), linear-gradient(to bottom, #00e5ff 1px, transparent 1px)`,
                backgroundSize: "22px 22px",
              }}
            />

            {/* Live Animated Radar Sweep */}
            <div className="absolute h-36 w-36 rounded-full border border-[#00e5ff]/20 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-dashed border-[#00e5ff]/30 animate-spin [animation-duration:12s]" />
              <div className="absolute h-20 w-20 rounded-full border border-[#00e5ff]/15" />
            </div>

            {/* Central Holographic Icon */}
            <div className="relative z-10 flex flex-col items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#00e5ff]/40 bg-[#00e5ff]/10 text-[#00e5ff] shadow-[0_0_24px_rgba(0,229,255,0.35)]">
                <Icon className="h-7 w-7" />
              </div>
              <span className="mt-2.5 text-[10px] font-mono tracking-widest text-[#8F9298] uppercase">
                ENCRYPTED CARTRIDGE
              </span>
            </div>

            {/* Live Audio Equalizer Bars jumping */}
            <div className="absolute bottom-2.5 left-3 flex items-end gap-1">
              {[60, 100, 45, 80, 30].map((h, i) => (
                <div
                  key={i}
                  className="w-1 bg-[#00e5ff] rounded-full animate-pulse"
                  style={{
                    height: `${h * 0.16}px`,
                    animationDelay: `${i * 180}ms`,
                  }}
                />
              ))}
            </div>

            {/* Telemetry Corner Readout */}
            <div className="absolute top-2.5 right-3 text-[9px] font-mono text-[#00e5ff]/80">
              RADAR // ACTIVE
            </div>
          </div>

          {/* Title & Description */}
          <h3 className="text-lg font-bold text-[#F5F5F5] group-hover:text-[#00e5ff] transition-colors">
            {tagline}
          </h3>

          <p className="mt-2 text-xs leading-relaxed text-[#8F9298] line-clamp-2">
            {description}
          </p>

          {/* Genre & Phase */}
          <div className="mt-4 flex items-center justify-between text-[11px]">
            <span className="font-medium text-[#C5C7CC]">{genre}</span>
            <span className="font-mono text-[#00e5ff]">{phase}</span>
          </div>

          {/* Development Progress Bar */}
          <div className="mt-3.5">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#8F9298] mb-1">
              <span>PLAYTEST READINESS</span>
              <span className="text-[#00e5ff] font-bold">{progressPercent}%</span>
            </div>
            <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#00b4d8] to-[#00e5ff] rounded-full transition-all duration-500 shadow-[0_0_10px_#00e5ff]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Action Button Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-[11px] font-semibold text-[#8F9298]">
            Reveal: <span className="text-[#F5F5F5]">Coming Soon</span>
          </span>

          <button
            onClick={() => setIsNotified(!isNotified)}
            aria-label={`Save ${projectCode}`}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-200 cursor-pointer ${
              isNotified
                ? "border border-[#00e5ff] bg-[#00e5ff] text-black shadow-[0_0_18px_rgba(0,229,255,0.5)]"
                : "border border-white/10 bg-white/5 text-[#8F9298] hover:border-[#00e5ff]/50 hover:text-[#00e5ff] hover:bg-[#00e5ff]/10"
            }`}
          >
            {isNotified ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>Alert Saved</span>
              </>
            ) : (
              <>
                <Bell className="h-3.5 w-3.5" />
                <span>Notify Me</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
