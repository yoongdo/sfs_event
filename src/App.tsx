import { useState } from "react";
import { QRRegistration } from "./components/QRRegistration";
import { SlotMachine } from "./components/SlotMachine";
import { AnimatedBackground } from "./components/AnimatedBackground";
import posterImage from "figma:asset/621f298ac132312d437df4bea9696290a2835c94.png";

type Screen = "qr" | "lottery";

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("qr");

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#10062D] via-[#341f97] to-[#c9208a]">
      <AnimatedBackground />

      {/* Logo and Title */}
      <div className="relative z-10 pt-8 px-8">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1
              className="text-white text-4xl mb-2"
              style={{
                fontFamily: "Pretendard, sans-serif",
                fontWeight: 700,
              }}
            >
              SFS 2025
            </h1>
            <p
              className="text-cyan-300 text-xl"
              style={{ fontFamily: "Pretendard, sans-serif" }}
            >
              스마트 미래사회 컨퍼런스
            </p>
          </div>
          <img
            src={posterImage}
            alt="SFS 2024"
            className="h-20 w-auto opacity-80 hidden"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {currentScreen === "qr" ? (
          <QRRegistration
            onComplete={() => setCurrentScreen("lottery")}
          />
        ) : (
          <SlotMachine onBack={() => setCurrentScreen("qr")} />
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-1/4 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>
    </div>
  );
}