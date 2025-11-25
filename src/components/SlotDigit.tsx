import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { motion } from 'motion/react';

interface SlotDigitProps {
  finalNumber: number;
  isSpinning: boolean;
  isWinner: boolean;
  delay?: number;
  shouldReset?: boolean;
}

export const SlotDigit = forwardRef<{ stop: () => void }, SlotDigitProps>(
  ({ finalNumber, isSpinning, isWinner, delay = 0, shouldReset }, ref) => {
    const [currentNumber, setCurrentNumber] = useState(0);
    const [isStopping, setIsStopping] = useState(false);
    const [hasStopped, setHasStopped] = useState(false);

    useEffect(() => {
      if (shouldReset) {
        setCurrentNumber(0);
        setIsStopping(false);
        setHasStopped(false);
        return;
      }

      if (!isSpinning) {
        return;
      }

      const interval = setInterval(() => {
        setCurrentNumber((prev) => (prev + 1) % 10);
      }, 50);

      return () => clearInterval(interval);
    }, [isSpinning, shouldReset]);

    useImperativeHandle(ref, () => ({
      stop: () => {
        setIsStopping(true);
        
        // Slow down animation
        let speed = 50;
        const slowdown = setInterval(() => {
          speed += 20;
          if (speed > 300) {
            clearInterval(slowdown);
            setCurrentNumber(finalNumber);
            setHasStopped(true);
          } else {
            setCurrentNumber((prev) => (prev + 1) % 10);
          }
        }, speed);
      },
    }));

    const displayNumber = hasStopped ? finalNumber : currentNumber;

    return (
      <div className="relative">
        {/* Outer Neon Glow */}
        <motion.div
          className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-cyan-500 to-purple-500 blur-xl"
          animate={{
            opacity: hasStopped ? [0.5, 1, 0.5] : 0.3,
          }}
          transition={{
            duration: 1,
            repeat: hasStopped ? Infinity : 0,
          }}
        />

        {/* Slot Container */}
        <motion.div
          className="relative w-48 h-64 rounded-3xl overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(0, 255, 255, 0.3)',
            boxShadow: `
              inset 0 0 40px rgba(0, 255, 255, 0.1),
              0 0 40px rgba(0, 255, 255, 0.2)
            `,
          }}
          animate={{
            borderColor: hasStopped
              ? ['rgba(0, 255, 255, 0.3)', 'rgba(0, 255, 255, 1)', 'rgba(0, 255, 255, 0.3)']
              : 'rgba(0, 255, 255, 0.3)',
          }}
          transition={{
            duration: 0.5,
            repeat: hasStopped ? 3 : 0,
          }}
        >
          {/* Metallic Reflection Effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.2) 100%)',
            }}
          />

          {/* Scan Lines */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.03) 2px, rgba(0, 255, 255, 0.03) 4px)',
            }}
          />

          {/* Number Display */}
          <div className="relative flex items-center justify-center h-full">
            <motion.div
              key={displayNumber}
              initial={isSpinning && !hasStopped ? { y: -20, opacity: 0 } : false}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.1 }}
              className="relative"
            >
              {/* Number Shadow/Glow */}
              <div
                className="absolute inset-0 flex items-center justify-center blur-2xl"
                style={{
                  color: hasStopped ? '#00ffff' : '#ffffff',
                  fontSize: '10rem',
                  opacity: hasStopped ? 0.8 : 0.3,
                }}
              >
                {displayNumber}
              </div>

              {/* Main Number */}
              <motion.div
                className="relative text-[10rem] leading-none select-none"
                style={{
                  fontFamily: "'Orbitron', 'Courier New', monospace",
                  fontWeight: 900,
                  background: hasStopped
                    ? 'linear-gradient(180deg, #00ffff 0%, #00ccff 50%, #0099ff 100%)'
                    : 'linear-gradient(180deg, #ffffff 0%, #cccccc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: isSpinning && !isStopping ? 'blur(2px)' : 'blur(0px)',
                  textShadow: hasStopped
                    ? '0 0 30px rgba(0, 255, 255, 0.8)'
                    : 'none',
                }}
                animate={
                  hasStopped
                    ? {
                        scale: [1, 1.1, 1],
                      }
                    : {}
                }
                transition={{
                  duration: 0.5,
                  repeat: hasStopped ? 2 : 0,
                }}
              >
                {displayNumber}
              </motion.div>

              {/* Motion Blur Trail (when spinning) */}
              {isSpinning && !hasStopped && (
                <>
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="absolute inset-0 flex items-center justify-center text-[10rem] text-white/20 blur-sm"
                      style={{
                        transform: `translateY(${i * 15}px)`,
                        fontFamily: "'Orbitron', 'Courier New', monospace",
                        fontWeight: 900,
                      }}
                    >
                      {(currentNumber - i + 10) % 10}
                    </div>
                  ))}
                </>
              )}
            </motion.div>
          </div>

          {/* Corner Highlights */}
          {hasStopped && (
            <>
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-6 h-6 border-2 border-cyan-400"
                  style={{
                    top: i < 2 ? 8 : 'auto',
                    bottom: i >= 2 ? 8 : 'auto',
                    left: i % 2 === 0 ? 8 : 'auto',
                    right: i % 2 === 1 ? 8 : 'auto',
                    borderRightColor: i % 2 === 0 ? 'transparent' : undefined,
                    borderLeftColor: i % 2 === 1 ? 'transparent' : undefined,
                    borderBottomColor: i < 2 ? 'transparent' : undefined,
                    borderTopColor: i >= 2 ? 'transparent' : undefined,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                />
              ))}
            </>
          )}
        </motion.div>

        {/* Bottom Glow Bar */}
        {hasStopped && (
          <motion.div
            className="absolute -bottom-4 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.8)',
            }}
          />
        )}
      </div>
    );
  }
);

SlotDigit.displayName = 'SlotDigit';