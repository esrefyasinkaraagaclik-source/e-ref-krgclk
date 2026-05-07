import React from 'react';

interface IllustrationProps {
  id: string;
}

export function Illustration({ id }: IllustrationProps) {
  switch (id) {
    case 'apple_brown':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Red Apple half */}
          <path d="M50,20 C30,20 20,40 20,60 C20,80 40,90 50,90 C60,90 80,80 80,60 C80,40 70,20 50,20 Z" fill="#ef4444" />
          {/* Brown Apple half */}
          <path d="M50,20 C70,20 80,40 80,60 C80,80 60,90 50,90 Z" fill="#92400e" />
          {/* Stem */}
          <path d="M50,20 Q45,10 55,5" fill="none" stroke="#166534" strokeWidth="4" strokeLinecap="round"/>
          {/* Leaf */}
          <path d="M55,10 Q65,5 70,15 Q60,20 55,10 Z" fill="#22c55e" />
        </svg>
      );
    case 'ink_water':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Glass */}
          <path d="M30,30 L35,80 C35,85 40,90 50,90 C60,90 65,85 65,80 L70,30" fill="none" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Water */}
          <path d="M32,50 L68,50 L65,80 C65,85 60,90 50,90 C40,90 35,85 35,80 Z" fill="#38bdf8" opacity="0.5" />
          {/* Ink drop */}
          <path d="M50,10 C50,10 45,20 45,25 C45,28 47,30 50,30 C53,30 55,28 55,25 C55,20 50,10 50,10 Z" fill="#8b5cf6" />
          {/* Ink spreading */}
          <circle cx="50" cy="65" r="12" fill="#8b5cf6" opacity="0.8" />
          <circle cx="45" cy="75" r="8" fill="#8b5cf6" opacity="0.6" />
          <circle cx="58" cy="70" r="10" fill="#8b5cf6" opacity="0.5" />
        </svg>
      );
    case 'boiling_water':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Pot */}
          <path d="M20,40 L80,40 L75,80 C75,85 70,90 50,90 C30,90 25,85 25,80 Z" fill="#64748b" />
          <path d="M15,40 L85,40" stroke="#475569" strokeWidth="4" strokeLinecap="round" />
          {/* Water */}
          <path d="M22,50 L78,50 L75,80 C75,85 70,90 50,90 C30,90 25,85 25,80 Z" fill="#38bdf8" opacity="0.8" />
          {/* Bubbles */}
          <circle cx="40" cy="70" r="4" fill="white" opacity="0.8" />
          <circle cx="60" cy="65" r="5" fill="white" opacity="0.8" />
          <circle cx="50" cy="55" r="3" fill="white" opacity="0.8" />
          <circle cx="35" cy="55" r="6" fill="white" opacity="0.8" />
          {/* Steam */}
          <path d="M40,30 Q35,20 45,10" fill="none" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          <path d="M60,35 Q65,25 55,15" fill="none" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          <path d="M50,25 Q45,15 55,5" fill="none" stroke="#e2e8f0" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        </svg>
      );
    case 'lemon_baking_soda':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Powder pile */}
          <path d="M20,80 Q50,50 80,80 Z" fill="#f8fafc" />
          {/* Lemon wedge */}
          <path d="M30,20 A 20 20 0 0 0 70,20 Z" fill="#fde047" stroke="#eab308" strokeWidth="2" />
          {/* Drops */}
          <path d="M50,25 L48,35 A 2 2 0 0 0 52,35 Z" fill="#fef08a" />
          <path d="M40,30 L38,40 A 2 2 0 0 0 42,40 Z" fill="#fef08a" />
          {/* Bubbles / Fizz */}
          <circle cx="45" cy="65" r="4" fill="#bae6fd" />
          <circle cx="55" cy="60" r="6" fill="#bae6fd" />
          <circle cx="65" cy="70" r="3" fill="#bae6fd" />
          <circle cx="35" cy="75" r="5" fill="#bae6fd" />
          <circle cx="50" cy="50" r="4" fill="#bae6fd" />
        </svg>
      );
    case 'cheese_making':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Milk Bottle */}
          <path d="M20,40 L30,20 L40,20 L50,40 L50,80 C50,85 45,90 35,90 C25,90 20,85 20,80 Z" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
          <rect x="28" y="15" width="14" height="5" fill="#ef4444" rx="2" />
          {/* Arrow */}
          <path d="M55,55 L65,55 L65,50 L75,60 L65,70 L65,65 L55,65 Z" fill="#94a3b8" />
          {/* Cheese Wedge */}
          <path d="M70,80 L95,80 L85,40 L70,45 Z" fill="#fde047" stroke="#eab308" strokeWidth="2" />
          {/* Cheese holes */}
          <circle cx="80" cy="60" r="4" fill="#eab308" />
          <circle cx="88" cy="70" r="3" fill="#eab308" />
          <circle cx="78" cy="72" r="2" fill="#eab308" />
        </svg>
      );
    case 'ice_melting':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Puddle */}
          <ellipse cx="50" cy="80" rx="40" ry="15" fill="#7dd3fc" opacity="0.6" />
          {/* Ice Cube */}
          <path d="M40,30 L60,25 L75,40 L55,45 Z" fill="#e0f2fe" stroke="#bae6fd" strokeWidth="2" />
          <path d="M40,30 L40,60 L55,75 L55,45 Z" fill="#bae6fd" stroke="#7dd3fc" strokeWidth="2" />
          <path d="M55,75 L75,70 L75,40 L55,45 Z" fill="#7dd3fc" stroke="#38bdf8" strokeWidth="2" />
          {/* Drops */}
          <path d="M65,75 L63,85 A 2 2 0 0 0 67,85 Z" fill="#38bdf8" />
        </svg>
      );
    case 'lightbulb':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Glow */}
          <circle cx="50" cy="40" r="35" fill="#fef08a" opacity="0.3" />
          {/* Bulb */}
          <path d="M50,15 C35,15 25,25 25,40 C25,50 32,58 38,65 L38,75 L62,75 L62,65 C68,58 75,50 75,40 C75,25 65,15 50,15 Z" fill="#fde047" stroke="#eab308" strokeWidth="2" />
          {/* Base */}
          <rect x="40" y="75" width="20" height="10" fill="#94a3b8" rx="2" />
          <path d="M45,85 L55,85 L52,90 L48,90 Z" fill="#475569" />
          {/* Filament */}
          <path d="M40,65 L45,45 L50,50 L55,45 L60,65" fill="none" stroke="#ca8a04" strokeWidth="2" strokeLinejoin="round" />
          {/* Rays */}
          <line x1="50" y1="5" x2="50" y2="10" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
          <line x1="15" y1="40" x2="20" y2="40" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
          <line x1="80" y1="40" x2="85" y2="40" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
          <line x1="25" y1="15" x2="30" y2="20" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
          <line x1="75" y1="15" x2="70" y2="20" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );
    case 'burning_wood':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Logs */}
          <path d="M20,70 L70,85 L75,75 L25,60 Z" fill="#78350f" stroke="#451a03" strokeWidth="2" />
          <path d="M30,85 L80,70 L75,60 L25,75 Z" fill="#92400e" stroke="#451a03" strokeWidth="2" />
          {/* Flames */}
          <path d="M50,70 Q30,50 40,30 Q45,10 50,20 Q55,10 60,30 Q70,50 50,70 Z" fill="#ef4444" />
          <path d="M50,65 Q40,50 45,35 Q50,25 55,35 Q60,50 50,65 Z" fill="#f97316" />
          <path d="M50,60 Q45,50 48,40 Q50,35 52,40 Q55,50 50,60 Z" fill="#facc15" />
        </svg>
      );
    case 'spoiled_food':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Green Apple */}
          <path d="M50,30 C30,30 20,50 20,70 C20,90 40,95 50,95 C60,95 80,90 80,70 C80,50 70,30 50,30 Z" fill="#84cc16" />
          {/* Brown Spots */}
          <circle cx="35" cy="55" r="8" fill="#78350f" opacity="0.8" />
          <circle cx="65" cy="75" r="6" fill="#78350f" opacity="0.8" />
          <circle cx="45" cy="80" r="5" fill="#78350f" opacity="0.8" />
          <circle cx="70" cy="50" r="4" fill="#78350f" opacity="0.8" />
          {/* Stem */}
          <path d="M50,30 Q45,20 55,15" fill="none" stroke="#4d7c0f" strokeWidth="4" strokeLinecap="round"/>
          {/* Stink Lines */}
          <path d="M30,25 Q25,15 35,5" fill="none" stroke="#bef264" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          <path d="M50,15 Q45,5 55,-5" fill="none" stroke="#bef264" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          <path d="M70,25 Q65,15 75,5" fill="none" stroke="#bef264" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
        </svg>
      );
    case 'perfume':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Bottle Body */}
          <path d="M30,50 L70,50 L80,90 L20,90 Z" fill="#fbcfe8" stroke="#f472b6" strokeWidth="2" />
          <rect x="40" y="40" width="20" height="10" fill="#cbd5e1" />
          {/* Nozzle/Cap */}
          <path d="M45,30 L55,30 L55,40 L45,40 Z" fill="#94a3b8" />
          <path d="M55,32 L65,32 L65,38 L55,38 Z" fill="#cbd5e1" />
          {/* Spray Mist */}
          <circle cx="75" cy="25" r="2" fill="#f472b6" />
          <circle cx="85" cy="30" r="3" fill="#f472b6" opacity="0.8" />
          <circle cx="70" cy="15" r="2" fill="#f472b6" opacity="0.6" />
          <circle cx="80" cy="20" r="4" fill="#f472b6" opacity="0.5" />
          <circle cx="90" cy="25" r="2" fill="#f472b6" opacity="0.7" />
          <circle cx="85" cy="15" r="3" fill="#f472b6" opacity="0.4" />
        </svg>
      );
    case 'fireworks':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Center burst */}
          <circle cx="50" cy="50" r="5" fill="#fef08a" />
          {/* Rays */}
          <path d="M50,40 L50,20 M50,60 L50,80 M40,50 L20,50 M60,50 L80,50" stroke="#facc15" strokeWidth="3" strokeLinecap="round" />
          <path d="M43,43 L28,28 M57,57 L72,72 M43,57 L28,72 M57,43 L72,28" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
          {/* Small sparks */}
          <circle cx="30" cy="20" r="3" fill="#22d3ee" />
          <circle cx="70" cy="80" r="2" fill="#22d3ee" />
          <circle cx="80" cy="30" r="3" fill="#a78bfa" />
          <circle cx="20" cy="70" r="2" fill="#a78bfa" />
        </svg>
      );
    case 'gas_compress':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Syringe Body */}
          <rect x="35" y="40" width="30" height="50" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" opacity="0.8" rx="2" />
          {/* Syringe Tip */}
          <rect x="47" y="90" width="6" height="5" fill="#94a3b8" />
          {/* Plunger */}
          <rect x="42" y="10" width="16" height="40" fill="#475569" />
          <rect x="30" y="5" width="40" height="5" fill="#334155" rx="1" />
          {/* Gas Particles tightly packed */}
          <circle cx="40" cy="65" r="2" fill="#38bdf8" />
          <circle cx="50" cy="70" r="2" fill="#38bdf8" />
          <circle cx="60" cy="60" r="2" fill="#38bdf8" />
          <circle cx="45" cy="80" r="2" fill="#38bdf8" />
          <circle cx="55" cy="85" r="2" fill="#38bdf8" />
          <circle cx="42" cy="75" r="2" fill="#38bdf8" />
          <circle cx="58" cy="78" r="2" fill="#38bdf8" />
          <circle cx="48" cy="62" r="2" fill="#38bdf8" />
          <circle cx="56" cy="68" r="2" fill="#38bdf8" />
          {/* Forces pulling down */}
          <path d="M50,-5 L50,5 L45,0 M50,5 L55,0" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M35,20 L35,30 L30,25 M35,30 L40,25" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M65,20 L65,30 L60,25 M65,30 L70,25" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );
    case 'solid_block':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Solid Box */}
          <rect x="30" y="40" width="40" height="40" fill="#94a3b8" stroke="#475569" strokeWidth="4" rx="4" />
          <circle cx="40" cy="50" r="3" fill="#334155" />
          <circle cx="50" cy="50" r="3" fill="#334155" />
          <circle cx="60" cy="50" r="3" fill="#334155" />
          <circle cx="40" cy="60" r="3" fill="#334155" />
          <circle cx="50" cy="60" r="3" fill="#334155" />
          <circle cx="60" cy="60" r="3" fill="#334155" />
          <circle cx="40" cy="70" r="3" fill="#334155" />
          <circle cx="50" cy="70" r="3" fill="#334155" />
          <circle cx="60" cy="70" r="3" fill="#334155" />
        </svg>
      );
    case 'gas_expand':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Beaker with fire */}
          <path d="M35,40 L35,80 C35,85 40,90 50,90 C60,90 65,85 65,80 L65,40" fill="none" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
          {/* Fire */}
          <path d="M50,90 Q45,100 50,110 Q55,100 50,90 Z" fill="#ef4444" />
          {/* Balloon expanded on top */}
          <path d="M50,10 C30,10 20,30 35,40 C45,45 55,45 65,40 C80,30 70,10 50,10 Z" fill="#f472b6" opacity="0.9" />
          {/* Expanding arrows inside balloon */}
          <path d="M50,25 L40,15 M40,15 L45,15 M40,15 L40,20" stroke="#be185d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M50,25 L60,15 M60,15 L55,15 M60,15 L60,20" stroke="#be185d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M50,25 L35,30 M35,30 L40,30 M35,30 L35,25" stroke="#be185d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M50,25 L65,30 M65,30 L60,30 M65,30 L65,25" stroke="#be185d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      );
    case 'gas_mix':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Container */}
          <rect x="25" y="25" width="50" height="50" fill="#f8fafc" stroke="#94a3b8" strokeWidth="3" rx="4" />
          {/* Mixed particles */}
          <circle cx="35" cy="40" r="3" fill="#38bdf8" />
          <circle cx="65" cy="60" r="3" fill="#38bdf8" />
          <circle cx="45" cy="70" r="3" fill="#38bdf8" />
          <circle cx="70" cy="35" r="3" fill="#38bdf8" />
          <circle cx="50" cy="50" r="3" fill="#38bdf8" />

          <circle cx="40" cy="35" r="3" fill="#f43f5e" />
          <circle cx="60" cy="45" r="3" fill="#f43f5e" />
          <circle cx="35" cy="65" r="3" fill="#f43f5e" />
          <circle cx="70" cy="70" r="3" fill="#f43f5e" />
          <circle cx="55" cy="65" r="3" fill="#f43f5e" />
        </svg>
      );
    case 'oil_water':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Container */}
          <rect x="25" y="25" width="50" height="50" fill="#f8fafc" stroke="#94a3b8" strokeWidth="3" rx="4" />
          {/* Water Layer */}
          <rect x="26.5" y="55" width="47" height="18.5" fill="#38bdf8" opacity="0.6" rx="2" />
          {/* Oil Layer */}
          <rect x="26.5" y="30" width="47" height="25" fill="#facc15" opacity="0.7" rx="2" />
          {/* Distinction line */}
          <line x1="26" y1="55" x2="74" y2="55" stroke="#94a3b8" strokeWidth="1" />
        </svg>
      );
    case 'gas_pressure':
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-lg">
          {/* Container */}
          <rect x="25" y="35" width="50" height="50" fill="#f8fafc" stroke="#64748b" strokeWidth="3" rx="4" />
          {/* Particles and pressure vectors */}
          <circle cx="40" cy="45" r="3" fill="#8b5cf6" />
          <path d="M40,40 L40,35 M40,35 L38,37 M40,35 L42,37" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          
          <circle cx="35" cy="65" r="3" fill="#8b5cf6" />
          <path d="M30,65 L25,65 M25,65 L27,63 M25,65 L27,67" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          
          <circle cx="65" cy="55" r="3" fill="#8b5cf6" />
          <path d="M70,55 L75,55 M75,55 L73,53 M75,55 L73,57" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          
          <circle cx="50" cy="80" r="3" fill="#8b5cf6" />
          <path d="M50,85 L50,90 M50,90 L48,88 M50,90 L52,88" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          
          {/* Speed trails */}
          <path d="M45,45 L50,45" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="1,1" />
          <path d="M35,60 L35,55" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="1,1" />
          <path d="M60,50 L55,45" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="1,1" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect width="100" height="100" fill="#334155" />
          <text x="50" y="50" fill="white" textAnchor="middle" alignmentBaseline="middle">?</text>
        </svg>
      );
  }
}
