import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Sparkles, Star, Zap } from 'lucide-react';

export function CelebrationEffect() {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    rotation: number;
    scale: number;
    type: 'sparkle' | 'star' | 'zap' | 'circle';
  }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 1,
      type: ['sparkle', 'star', 'zap', 'circle'][Math.floor(Math.random() * 4)] as any,
    }));
    setParticles(newParticles);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case 'sparkle':
        return Sparkles;
      case 'star':
        return Star;
      case 'zap':
        return Zap;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Flash Effect */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0] }}
        transition={{ duration: 0.5 }}
      />

      {/* Radial Burst */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5 }}
      >
        <div className="w-full h-full bg-gradient-radial from-cyan-400/30 via-purple-500/20 to-transparent" />
      </motion.div>

      {/* Particles */}
      {particles.map((particle) => {
        const Icon = getIcon(particle.type);
        const colors = ['text-cyan-400', 'text-purple-400', 'text-pink-400', 'text-yellow-400'];
        const color = colors[Math.floor(Math.random() * colors.length)];

        return (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            initial={{
              scale: 0,
              rotate: 0,
              opacity: 1,
            }}
            animate={{
              scale: [0, particle.scale, 0],
              rotate: [0, particle.rotation, particle.rotation * 2],
              opacity: [0, 1, 0],
              x: [0, (Math.random() - 0.5) * 400],
              y: [0, (Math.random() - 0.5) * 400],
            }}
            transition={{
              duration: 2,
              ease: 'easeOut',
            }}
          >
            {Icon ? (
              <Icon className={`w-8 h-8 ${color}`} fill="currentColor" />
            ) : (
              <div
                className={`w-4 h-4 rounded-full ${color.replace('text-', 'bg-')}`}
                style={{
                  boxShadow: `0 0 20px currentColor`,
                }}
              />
            )}
          </motion.div>
        );
      })}

      {/* Confetti Ribbons */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`ribbon-${i}`}
          className="absolute w-3 h-12 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: -50,
            background: `linear-gradient(${Math.random() * 360}deg, #00ffff, #a855f7, #ec4899)`,
            boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
          }}
          initial={{ y: -50, rotate: 0 }}
          animate={{
            y: window.innerHeight + 50,
            rotate: Math.random() * 720 - 360,
            x: (Math.random() - 0.5) * 200,
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            ease: 'easeIn',
            delay: Math.random() * 0.5,
          }}
        />
      ))}

      {/* Digital Particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={`digital-${i}`}
          className="absolute text-cyan-400 text-2xl opacity-80"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontFamily: "'Courier New', monospace",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            y: [0, -100],
          }}
          transition={{
            duration: 2,
            delay: Math.random() * 0.5,
          }}
        >
          {['✨', '⭐', '💫', '🎉', '🎊'][Math.floor(Math.random() * 5)]}
        </motion.div>
      ))}

      {/* Circular Waves */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{
            duration: 2,
            delay: i * 0.3,
          }}
        >
          <motion.div
            className="border-4 border-cyan-400 rounded-full"
            initial={{ width: 0, height: 0 }}
            animate={{
              width: ['0px', '1000px'],
              height: ['0px', '1000px'],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
            }}
            style={{
              boxShadow: '0 0 40px rgba(0, 255, 255, 0.6)',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
