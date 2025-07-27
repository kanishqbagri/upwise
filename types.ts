
import React from 'react';

export interface AppConfig {
  title: string;
  description: string;
  url: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  bgColor: string;
  textColor: string;
}
