export interface StudentData {
  marks: number[];
}

export interface QuartileData {
  q1Count: number;
  q2Count: number;
  q3Count: number;
  q4Count: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
  }[];
}