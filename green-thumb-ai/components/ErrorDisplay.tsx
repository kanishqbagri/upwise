
import React from 'react';

interface ErrorDisplayProps {
  message: string;
  onClear: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onClear }) => {
  return (
    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md" role="alert">
      <div className="flex">
        <div className="py-1"><span className="material-icons text-red-500 mr-4">error</span></div>
        <div>
          <p className="font-bold">An Error Occurred</p>
          <p className="text-sm">{message}</p>
        </div>
         <button onClick={onClear} className="ml-auto text-red-500 hover:text-red-700">
            <span className="material-icons">close</span>
        </button>
      </div>
    </div>
  );
};

export default ErrorDisplay;
