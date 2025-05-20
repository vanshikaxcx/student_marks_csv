import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  TooltipItem
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { QuartileData, ChartData } from '../types';

// Register the required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface PieChartProps {
  data: QuartileData | null;
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartRef = useRef<ChartJS<"pie", number[], string>>(null);
  const chartContainer = useRef<HTMLDivElement>(null);
  const [isContainerMounted, setIsContainerMounted] = React.useState(false);

  // Prepare chart data
  const prepareChartData = (): ChartData => {
    const quartileData = data || { q1Count: 0, q2Count: 0, q3Count: 0, q4Count: 0 };
    
    return {
      labels: ['Q1 (0-25%)', 'Q2 (25-50%)', 'Q3 (50-75%)', 'Q4 (75-100%)'],
      datasets: [
        {
          data: [
            quartileData.q1Count, 
            quartileData.q2Count, 
            quartileData.q3Count, 
            quartileData.q4Count
          ],
          backgroundColor: [
            'rgba(54, 162, 235, 0.7)',  // Blue for Q1
            'rgba(75, 192, 192, 0.7)',  // Teal for Q2
            'rgba(255, 206, 86, 0.7)',  // Yellow for Q3
            'rgba(255, 99, 132, 0.7)',  // Red for Q4
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const chartData = prepareChartData();

  // Set container mounted state
  useEffect(() => {
    if (chartContainer.current) {
      setIsContainerMounted(true);
    }
    return () => setIsContainerMounted(false);
  }, []);

  // Animation on first render
  useEffect(() => {
    if (chartRef.current && data && isContainerMounted) {
      const chart = chartRef.current;
      
      // Reset animation
      chart.data.datasets.forEach((dataset, i) => {
        chart.getDatasetMeta(i).data.forEach((dataPoint) => {
          dataPoint.hidden = true;
        });
      });
      
      chart.update();
      
      // Animate in sequence
      setTimeout(() => {
        chart.data.datasets.forEach((dataset, i) => {
          chart.getDatasetMeta(i).data.forEach((dataPoint) => {
            dataPoint.hidden = false;
          });
        });
        chart.update();
      }, 200);
    }
  }, [data, isContainerMounted]);

  // Responsive sizing
  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;

    if (chartContainer.current && isContainerMounted) {
      resizeObserver = new ResizeObserver(() => {
        if (chartRef.current) {
          requestAnimationFrame(() => {
            chartRef.current?.resize();
          });
        }
      });
      
      resizeObserver.observe(chartContainer.current);
    }
    
    return () => {
      if (resizeObserver && chartContainer.current) {
        resizeObserver.unobserve(chartContainer.current);
        resizeObserver.disconnect();
      }
    };
  }, [isContainerMounted]);

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          font: {
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: 'Student Distribution by Quartile',
        font: {
          size: 18,
          weight: 'bold' as const
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'pie'>) => {
            const label = context.label || '';
            const value = context.raw as number;
            const total = context.dataset.data.reduce((acc, val) => acc + (val as number), 0);
            const percentage = total ? Math.round((value / total) * 100) : 0;
            return `${label}: ${value} students (${percentage}%)`;
          }
        }
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000
    }
  };

  return (
    <div 
      ref={chartContainer}
      className="w-full max-w-xl mx-auto mt-8 h-96 bg-white p-4 rounded-lg shadow-sm"
    >
      {data && isContainerMounted ? (
        <Pie ref={chartRef} data={chartData} options={options} />
      ) : (
        <div className="h-full flex items-center justify-center text-gray-400">
          <p>Upload a CSV file to visualize student quartile distribution</p>
        </div>
      )}
    </div>
  );
};

export default PieChart;