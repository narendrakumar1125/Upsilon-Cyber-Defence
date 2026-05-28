'use client';

import { useState } from 'react';

const AnimatedLogo = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex justify-center items-center">
      <div className="relative w-full max-w-sm aspect-square flex flex-col items-center justify-center">
        {/* Main animated logo container */}
        <div
          className="relative w-72 h-72 flex items-center justify-center cursor-pointer transition-transform duration-300"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }}
        >
          {/* Outer rotating ring with enhanced glow */}
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 border-r-cyan-300 border-b-indigo-400"
            style={{
              animation: `spin ${isHovered ? '4s' : '8s'} linear infinite`,
              boxShadow: `0 0 40px rgba(34, 211, 238, ${isHovered ? 0.8 : 0.6}),
                          0 0 80px rgba(34, 211, 238, ${isHovered ? 0.5 : 0.3}),
                          inset 0 0 40px rgba(34, 211, 238, ${isHovered ? 0.3 : 0.15})`,
              transition: 'box-shadow 0.3s ease'
            }}
          ></div>

          {/* Second rotating ring - opposite direction */}
          <div
            className="absolute inset-6 rounded-full border-2 border-transparent border-t-sky-300 border-b-cyan-400"
            style={{
              animation: `spinReverse ${isHovered ? '6s' : '12s'} linear infinite`,
              opacity: isHovered ? 0.8 : 0.5,
              transition: 'opacity 0.3s ease'
            }}
          ></div>

          {/* Middle pulsing ring with glow */}
          <div
            className="absolute inset-12 rounded-full border-2 border-cyan-500/60"
            style={{
              animation: `pulse ${isHovered ? '1.5s' : '2s'} cubic-bezier(0.4, 0, 0.6, 1) infinite`,
              boxShadow: `0 0 30px rgba(34, 211, 238, ${isHovered ? 0.8 : 0.4})`,
              transition: 'box-shadow 0.3s ease'
            }}
          ></div>

          {/* Inner glowing circle */}
          <div
            className="absolute inset-20 rounded-full border border-sky-300/40"
            style={{
              animation: `pulse ${isHovered ? '2s' : '3s'} cubic-bezier(0.4, 0, 0.6, 1) infinite`,
              boxShadow: `0 0 20px rgba(16, 185, 129, ${isHovered ? 0.6 : 0.3})`
            }}
          ></div>

          {/* Center background glow */}
          <div
            className="absolute inset-24 rounded-full"
            style={{
              background: `radial-gradient(circle, rgba(34, 211, 238, ${isHovered ? 0.15 : 0.08}) 0%, transparent 70%)`,
              transition: 'all 0.3s ease'
            }}
          ></div>

          {/* Upsilon identity mark with glow effect */}
          <div
            className="relative z-10 text-center transition-all duration-300"
            style={{
              transform: isHovered ? 'scale(1.1)' : 'scale(1)'
            }}
          >
            <div
              className="text-7xl font-bold text-white drop-shadow-lg transition-all duration-300"
              style={{
                textShadow: `0 0 20px rgba(34, 211, 238, ${isHovered ? 1 : 0.8}),
                             0 0 40px rgba(34, 211, 238, ${isHovered ? 0.6 : 0.4}),
                             0 0 60px rgba(16, 185, 129, ${isHovered ? 0.4 : 0.2})`
              }}
            >
              U
            </div>
          </div>

          {/* Floating particles on hover */}
          {isHovered && (
            <>
              <div className="absolute top-8 left-8 w-1 h-1 bg-cyan-400 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
              <div className="absolute top-12 right-12 w-1 h-1 bg-sky-400 rounded-full animate-float" style={{ animationDelay: '0.2s' }}></div>
              <div className="absolute bottom-12 right-8 w-1 h-1 bg-cyan-400 rounded-full animate-float" style={{ animationDelay: '0.4s' }}></div>
              <div className="absolute bottom-8 left-12 w-1 h-1 bg-sky-400 rounded-full animate-float" style={{ animationDelay: '0.6s' }}></div>
            </>
          )}
        </div>

        {/* Text below logo with animations */}
        <div className="text-center mt-12 relative z-20">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 text-gray-400 hover:text-cyan-400"
            style={{
              textShadow: isHovered ? '0 0 15px rgba(34, 211, 238, 0.5)' : 'none'
            }}>
            SECURED BY
          </p>
          <p
            className="text-3xl font-black mt-2 transition-all duration-300"
            style={{
              background: 'linear-gradient(to right, #22d3ee, #10b981)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: isHovered ? '0 0 30px rgba(16, 185, 129, 0.4)' : '0 0 15px rgba(34, 211, 238, 0.2)',
              letterSpacing: '0.02em'
            }}
          >
            UPSILON
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spinReverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx, 0), var(--ty, -40px)) scale(0);
            opacity: 0;
          }
        }

        .animate-float {
          animation: float 2s ease-out infinite;
          --tx: ${Math.random() * 60 - 30}px;
          --ty: -60px;
        }
      `}</style>
    </div>
  );
};

export default AnimatedLogo;
