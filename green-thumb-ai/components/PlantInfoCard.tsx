
import React from 'react';
import { PlantData } from '../types';
import { WaterIcon, SunIcon, PlantIcon, OriginIcon, FunFactIcon, ScienceIcon } from './icons';

interface PlantInfoCardProps {
  plantData: PlantData;
}

const InfoRow: React.FC<{ icon: React.ReactNode; label: string; value: string; isScientific?: boolean; }> = ({ icon, label, value, isScientific = false }) => (
    <div className="flex items-start py-3">
        <div className="pr-4">{icon}</div>
        <div className="flex-1">
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className={`text-gray-800 ${isScientific ? 'italic' : ''}`}>{value}</p>
        </div>
    </div>
);


const PlantInfoCard: React.FC<PlantInfoCardProps> = ({ plantData }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg h-full flex flex-col">
      <h2 className="text-3xl font-bold text-gray-800 mb-1">{plantData.plantName}</h2>
      <InfoRow icon={<ScienceIcon />} label="Scientific Name" value={plantData.scientificName} isScientific />
      
      <div className="mt-4 border-t border-gray-200 divide-y divide-gray-200">
        <InfoRow icon={<PlantIcon />} label="Plant Type" value={plantData.plantType} />
        <InfoRow icon={<WaterIcon />} label="Water Needs" value={plantData.careInstructions.water} />
        <InfoRow icon={<SunIcon />} label="Sunlight" value={plantData.careInstructions.sunlight} />
        <InfoRow icon={<OriginIcon />} label="Origin" value={plantData.origin} />
        <InfoRow icon={<FunFactIcon />} label="Fun Fact" value={plantData.funFact} />
      </div>
    </div>
  );
};

export default PlantInfoCard;
