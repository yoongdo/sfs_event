import { motion } from 'motion/react';
import { Scan, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface QRRegistrationProps {
  onComplete: () => void;
}

export function QRRegistration({ onComplete }: QRRegistrationProps) {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        {/* Main Card */}
        <div className="relative">
          {/* Neon Border Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-50 animate-pulse" />
          
          <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-3xl border border-cyan-500/30 p-12 shadow-2xl">
            {/* Icon */}
            <motion.div
              className="flex justify-center mb-8"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500/30 blur-2xl rounded-full" />
                <Scan className="relative w-24 h-24 text-cyan-400" strokeWidth={1.5} />
              </div>
            </motion.div>

            {/* Title */}
            <h2 className="text-center text-5xl mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent" style={{ fontFamily: 'Pretendard, sans-serif', fontWeight: 700 }}>
              참가자 등록
            </h2>
            <p className="text-center text-xl text-gray-300 mb-12" style={{ fontFamily: 'Pretendard, sans-serif' }}>
              QR 코드를 스캔하여 추첨에 참여하세요
            </p>

            {/* QR Code Area */}
            <div className="relative mb-12">
              {/* Scanning Animation */}
              <motion.div
                className="absolute inset-0 z-10"
                initial={{ top: 0 }}
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_rgba(0,255,255,0.8)]" />
              </motion.div>

              {/* QR Container */}
              <div className="relative aspect-square max-w-md mx-auto bg-white rounded-2xl p-8 border-4 border-cyan-400/50 shadow-[0_0_40px_rgba(0,255,255,0.3)]">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl flex items-center justify-center">
                  <Scan className="w-32 h-32 text-gray-400" />
                </div>

                {/* Corner Accents */}
                {[0, 90, 180, 270].map((rotation, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-8 h-8 border-t-4 border-l-4 border-cyan-400"
                    style={{
                      top: rotation === 0 || rotation === 90 ? -4 : 'auto',
                      bottom: rotation === 180 || rotation === 270 ? -4 : 'auto',
                      left: rotation === 0 || rotation === 270 ? -4 : 'auto',
                      right: rotation === 90 || rotation === 180 ? -4 : 'auto',
                      transform: `rotate(${rotation}deg)`,
                    }}
                    animate={{
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Info Text */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-xl p-6 mb-8">
              <p className="text-center text-cyan-300" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                참가 번호: <span className="text-white" style={{ fontWeight: 700 }}>000 ~ 299</span>
              </p>
              <p className="text-center text-gray-400 text-sm mt-2" style={{ fontFamily: 'Pretendard, sans-serif' }}>
                총 300명의 참가자 중 행운의 당첨자를 선정합니다
              </p>
            </div>

            {/* Action Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={onComplete}
                className="w-full h-16 text-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 border-0 shadow-[0_0_30px_rgba(0,255,255,0.5)] relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  추첨 시작하기
                  <ArrowRight className="w-6 h-6" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}