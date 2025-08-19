
export interface HotspotData {
  x: number;
  y: number;
  title: string;
  description: string;
}

export interface PlantData {
  plantName: string;
  scientificName: string;
  plantType: string;
  careInstructions: {
    water: string;
    sunlight: string;
  };
  origin: string;
  funFact: string;
  hotspots: HotspotData[];
}
