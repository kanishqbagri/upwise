
import React from 'react';
import { PlantData } from '../types';
import Hotspot from './Hotspot';

interface InteractiveImageProps {
  imageSrc: string;
  plantData: PlantData;
}

const InteractiveImage: React.FC<InteractiveImageProps> = ({ imageSrc, plantData }) => {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg">
      <img src={imageSrc} alt={plantData.plantName} className="w-full h-full object-cover" />
      {plantData.hotspots.map((hotspot, index) => (
        <Hotspot key={index} hotspot={hotspot} />
      ))}
    </div>
  );
};

export default InteractiveImage;
