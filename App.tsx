import React from 'react';
import { apps } from './config/apps';
import { LinkCard } from './components/LinkCard';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 transition-colors duration-300">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center py-16 sm:py-24">
          <div className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="currentColor"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"></path></svg>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white">
            Upwise
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            Smarter everyday
          </p>
        </header>

        <div className="pb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {apps.map((app, index) => (
              <LinkCard key={index} app={app} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;