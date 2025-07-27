
import React from 'react';
import type { AppConfig } from '../types';
import { ArrowRightIcon } from './icons/ArrowRightIcon';

interface LinkCardProps {
  app: AppConfig;
}

export const LinkCard: React.FC<LinkCardProps> = ({ app }) => {
  const { title, description, url, icon: Icon, bgColor, textColor } = app;

  return (
    <a
      href={url}
      target={url.startsWith('http') ? '_blank' : '_self'}
      rel="noopener noreferrer"
      className="group block bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-700 hover:border-gray-600"
    >
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className={`w-7 h-7 ${textColor}`} />
        </div>
        <ArrowRightIcon className="w-6 h-6 text-gray-500 group-hover:text-white transition-colors duration-300" />
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-bold text-white">{title}</h3>
        <p className="mt-1 text-gray-400 text-sm">{description}</p>
      </div>
    </a>
  );
};
