/**
 * Parses CSV data into an array of student marks
 * 
 * @param csvContent CSV file content as string
 * @returns Array of student marks as numbers
 */
export const parseCSV = (csvContent: string): number[] => {
  // Split by lines and remove empty lines
  const lines = csvContent.split('\n').filter(line => line.trim() !== '');
  
  // Extract marks from CSV content
  // This assumes the CSV has a column with student marks
  // Handles CSV formats with or without headers
  const marks: number[] = [];
  
  lines.forEach((line, index) => {
    // Skip header row if it exists (first row)
    // We assume header row has non-numeric values
    if (index === 0 && isNaN(parseFloat(line.split(',')[0]))) {
      return;
    }
    
    // Split the line by comma and process each cell
    const cells = line.split(',');
    
    // Find the first cell that can be parsed as a number
    for (const cell of cells) {
      const mark = parseFloat(cell.trim());
      if (!isNaN(mark)) {
        marks.push(mark);
        break; // Only take the first valid number from each line
      }
    }
  });
  
  return marks;
};