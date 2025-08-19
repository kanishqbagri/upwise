
import React, { useState } from 'react';
import { HotspotData } from '../types';

interface HotspotProps {
  hotspot: HotspotData;
}

const Hotspot: React.FC<HotspotProps> = ({ hotspot }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="absolute"
      style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%`, transform: 'translate(-50%, -50%)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-5 h-5 rounded-full bg-white/50 backdrop-blur-sm ring-2 ring-white cursor-pointer flex items-center justify-center transition-transform duration-300 hover:scale-125">
         <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
      </div>

      {isHovered && (
        <div 
          className="absolute bottom-full mb-3 w-64 bg-gray-800 text-white p-4 rounded-lg shadow-2xl z-20 transition-all duration-300 ease-in-out"
          style={{ transform: 'translateX(-50%)', left: '50%'}}
        >
          <h4 className="font-bold text-lg mb-1 text-green-300">{hotspot.title}</h4>
          <p className="text-sm">{hotspot.description}</p>
          <div className="absolute top-full left-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-gray-800" style={{transform: 'translateX(-50%)'}}></div>
        </div>
      )}
    </div>
  );
};

export default Hotspot;
