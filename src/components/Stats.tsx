import React from 'react';
import { QuartileData } from '../types';

interface StatsProps {
  data: QuartileData | null;
}

const Stats: React.FC<StatsProps> = ({ data }) => {
  if (!data) return null;
  
  const totalStudents = data.q1Count + data.q2Count + data.q3Count + data.q4Count;
  
  const getPercentage = (count: number) => {
    return totalStudents ? Math.round((count / totalStudents) * 100) : 0;
  };
  
  return (
    <div className="w-full max-w-xl mx-auto mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
      <StatCard 
        title="First Quartile"
        count={data.q1Count}
        percentage={getPercentage(data.q1Count)}
        color="bg-blue-100 text-blue-800 border-blue-200"
      />
      <StatCard 
        title="Second Quartile"
        count={data.q2Count}
        percentage={getPercentage(data.q2Count)}
        color="bg-teal-100 text-teal-800 border-teal-200"
      />
      <StatCard 
        title="Third Quartile"
        count={data.q3Count}
        percentage={getPercentage(data.q3Count)}
        color="bg-yellow-100 text-yellow-800 border-yellow-200"
      />
      <StatCard 
        title="Fourth Quartile"
        count={data.q4Count}
        percentage={getPercentage(data.q4Count)}
        color="bg-red-100 text-red-800 border-red-200"
      />
    </div>
  );
};

interface StatCardProps {
  title: string;
  count: number;
  percentage: number;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, count, percentage, color }) => {
  return (
    <div className={`p-4 rounded-lg border ${color} text-center`}>
      <h3 className="text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold">{count}</p>
      <p className="text-xs opacity-75">{percentage}% of total</p>
    </div>
  );
};

export default Stats;