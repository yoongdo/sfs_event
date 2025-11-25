import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { SlotDigit } from './SlotDigit';
import { CelebrationEffect } from './CelebrationEffect';

interface SlotMachineProps {
  onBack: () => void;
}

type SlotState = 'idle' | 'spinning' | 'stopping' | 'winner';

export function SlotMachine({ onBack }: SlotMachineProps) {
  const [slotState, setSlotState] = useState<SlotState>('idle');
  const [winningNumber, setWinningNumber] = useState<number[]>([0, 0, 0]);
  const [showCelebration, setShowCelebration] = useState(false);
  const slotRefs = useRef<Array<{ stop: () => void }>>([]);

  const startLottery = () => {
    setSlotState('spinning');
    setShowCelebration(false);
    
    // Generate random winning number (0-299)
    const number = Math.floor(Math.random() * 300);
    const digits = [
      Math.floor(number / 100),
      Math.floor((number % 100) / 10),
      number % 10,
    ];
    setWinningNumber(digits);

    // Stop slots sequentially with delay
    setTimeout(() => {
      setSlotState('stopping');
      digits.forEach((_, index) => {
        setTimeout(() => {
          slotRefs.current[index]?.stop();
        }, index * 500);
      });

      // Show winner state after all slots stop
      setTimeout(() => {
        setSlotState('winner');
        setShowCelebration(true);
      }, 500 * 3 + 1500);
    }, 3000);
  };

  const reset = () => {
    setSlotState('idle');
    setWinningNumber([0, 0, 0]);
    setShowCelebration(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl w-full"
      >
        {/* Title */}
        <motion.div
          className="text-center mb-12"
          animate={slotState === 'winner' ? {
            scale: [1, 1.05, 1],
          } : {}}
          transition={{
            duration: 1,
            repeat: slotState === 'winner' ? Infinity : 0,
          }}
        >
          <h2 className="text-6xl mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" style={{ fontFamily: 'Pretendard, sans-serif', fontWeight: 700 }}>
            {slotState === 'winner' ? '🎉 당첨 번호 🎉' : '행운의 추첨'}
          </h2>
          <p className="text-2xl text-gray-300" style={{ fontFamily: 'Pretendard, sans-serif' }}>
            {slotState === 'idle' && '버튼을 눌러 추첨을 시작하세요'}
            {slotState === 'spinning' && '추첨 중...'}
            {slotState === 'stopping' && '번호 확정 중...'}
            {slotState === 'winner' && '축하합니다!'}
          </p>
          
          {/* Display Winning Number */}
          {slotState === 'winner' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6"
            >
              <div className="inline-flex items-center gap-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-2 border-cyan-400 rounded-3xl px-12 py-6 shadow-[0_0_40px_rgba(0,255,255,0.4)]">
                <span className="text-8xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                  {winningNumber.join('')}
                </span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Slot Machine Container */}
        <div className="relative mb-12">
          {/* Outer Glow */}
          <motion.div
            className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-[3rem] blur-2xl"
            animate={{
              opacity: slotState === 'spinning' || slotState === 'winner' ? [0.3, 0.6, 0.3] : 0.2,
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />

          {/* Main Container */}
          <div className="relative bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl rounded-[2.5rem] border-2 border-cyan-500/40 p-12 shadow-2xl">
            {/* Decorative Corner Elements */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute w-16 h-16"
                style={{
                  top: i < 2 ? -2 : 'auto',
                  bottom: i >= 2 ? -2 : 'auto',
                  left: i % 2 === 0 ? -2 : 'auto',
                  right: i % 2 === 1 ? -2 : 'auto',
                }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              >
                <div className="w-full h-full border-4 border-cyan-400 rounded-lg"
                  style={{
                    borderRightColor: i % 2 === 0 ? 'transparent' : undefined,
                    borderLeftColor: i % 2 === 1 ? 'transparent' : undefined,
                    borderBottomColor: i < 2 ? 'transparent' : undefined,
                    borderTopColor: i >= 2 ? 'transparent' : undefined,
                  }}
                />
              </motion.div>
            ))}

            {/* Slots Container */}
            <div className="flex justify-center gap-8 mb-12">
              {[0, 1, 2].map((index) => (
                <SlotDigit
                  key={index}
                  ref={(ref) => {
                    if (ref) slotRefs.current[index] = ref;
                  }}
                  finalNumber={winningNumber[index]}
                  isSpinning={slotState === 'spinning' || slotState === 'stopping'}
                  isWinner={slotState === 'winner'}
                  delay={index * 100}
                  shouldReset={slotState === 'idle'}
                />
              ))}
            </div>

            {/* Control Buttons */}
            <div className="flex justify-center gap-6">
              <AnimatePresence mode="wait">
                {slotState === 'idle' && (
                  <motion.div
                    key="start"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={startLottery}
                      className="h-20 px-16 text-2xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 border-0 shadow-[0_0_40px_rgba(0,255,255,0.6)] relative overflow-hidden group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />
                      <span className="relative z-10 flex items-center gap-3">
                        <Play className="w-8 h-8" fill="currentColor" />
                        추첨 시작
                      </span>
                    </Button>
                  </motion.div>
                )}

                {slotState === 'winner' && (
                  <motion.div
                    key="reset"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex gap-6"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={reset}
                        className="h-20 px-12 text-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 border-0 shadow-[0_0_40px_rgba(168,85,247,0.6)]"
                      >
                        <span className="flex items-center gap-3">
                          <RotateCcw className="w-7 h-7" />
                          다시 추첨
                        </span>
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Status Indicator */}
            {(slotState === 'spinning' || slotState === 'stopping') && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 6 }}
              />
            )}
          </div>
        </div>

        {/* Info Panel */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-full px-8 py-4">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <span className="text-xl text-gray-300" style={{ fontFamily: 'Pretendard, sans-serif' }}>
              참가 번호 범위: <span className="text-white" style={{ fontWeight: 700 }}>000 ~ 299</span>
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Celebration Effect */}
      <AnimatePresence>
        {showCelebration && <CelebrationEffect />}
      </AnimatePresence>
    </div>
  );
}