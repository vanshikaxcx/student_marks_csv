import React, { useState } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import PieChart from './components/PieChart';
import Stats from './components/Stats';
import ErrorAlert from './components/ErrorAlert';
import { QuartileData } from './types';
import { calculateQuartiles } from './utils/quartileCalculator';

function App() {
  const [quartileData, setQuartileData] = useState<QuartileData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileProcessed = (marks: number[]) => {
    const data = calculateQuartiles(marks);
    setQuartileData(data);
    setError(null);
  };

  const handleError = (message: string) => {
    setError(message);
  };

  const dismissError = () => {
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl font-semibold text-gray-700 mb-6">
            Upload Student Marks CSV
          </h2>
          
          <p className="text-center text-gray-500 mb-8 max-w-xl mx-auto">
            Upload a CSV file containing student marks to visualize the distribution 
            across quartiles. The chart will show the number of students in each quartile.
          </p>
          
          <FileUpload 
            onFileProcessed={handleFileProcessed}
            onError={handleError}
          />
          
          <PieChart data={quartileData} />
          
          <Stats data={quartileData} />
        </div>
      </main>
      
      {error && <ErrorAlert message={error} onDismiss={dismissError} />}
    </div>
  );
}

export default App;