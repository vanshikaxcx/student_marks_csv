import { QuartileData } from '../types';

/**
 * Calculates the quartile distribution of the marks
 * 
 * @param marks Array of student marks
 * @returns Object containing the count of students in each quartile
 */
export const calculateQuartiles = (marks: number[]): QuartileData => {
  if (!marks.length) {
    return {
      q1Count: 0,
      q2Count: 0,
      q3Count: 0,
      q4Count: 0
    };
  }

  // Sort marks in ascending order
  const sortedMarks = [...marks].sort((a, b) => a - b);
  
  // Find the minimum and maximum to define quartile ranges
  const min = sortedMarks[0];
  const max = sortedMarks[sortedMarks.length - 1];
  const range = max - min;
  
  // Calculate quartile boundaries
  const q1Boundary = min + range * 0.25;
  const q2Boundary = min + range * 0.5;
  const q3Boundary = min + range * 0.75;

  // Count students in each quartile
  let q1Count = 0, q2Count = 0, q3Count = 0, q4Count = 0;
  
  sortedMarks.forEach(mark => {
    if (mark <= q1Boundary) {
      q1Count++;
    } else if (mark <= q2Boundary) {
      q2Count++;
    } else if (mark <= q3Boundary) {
      q3Count++;
    } else {
      q4Count++;
    }
  });
  
  return {
    q1Count,
    q2Count,
    q3Count,
    q4Count
  };
};