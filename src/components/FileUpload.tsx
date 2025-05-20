import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';
import { read, utils } from 'xlsx';

interface FileUploadProps {
  onFileProcessed: (marks: number[]) => void;
  onError: (message: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileProcessed, onError }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processExcel = async (file: File) => {
    try {
      const buffer = await file.arrayBuffer();
      const workbook = read(buffer);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = utils.sheet_to_json(worksheet);
      
      const marks: number[] = data
        .map((row: any) => {
          // Try to find a numeric value in any column
          const values = Object.values(row);
          for (const value of values) {
            const mark = parseFloat(value as string);
            if (!isNaN(mark)) return mark;
          }
          return null;
        })
        .filter((mark): mark is number => mark !== null);

      if (marks.length === 0) {
        throw new Error('No valid marks found in the file');
      }

      return marks;
    } catch (error) {
      throw new Error('Error processing Excel file. Please check the format.');
    }
  };

  const processCSV = async (file: File) => {
    try {
      const text = await file.text();
      const { parseCSV } = await import('../utils/csvParser');
      const marks = parseCSV(text);
      
      if (marks.length === 0) {
        throw new Error('No valid marks found in the CSV file');
      }
      
      return marks;
    } catch (error) {
      throw new Error('Error processing CSV file. Please check the format.');
    }
  };

  const processFile = async (file: File) => {
    setFileName(file.name);
    
    try {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      let marks: number[] = [];

      if (fileExtension === 'csv') {
        marks = await processCSV(file);
      } else if (['xlsx', 'xls'].includes(fileExtension || '')) {
        marks = await processExcel(file);
      } else {
        throw new Error('Please upload a CSV or Excel file');
      }

      onFileProcessed(marks);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Error processing file');
      setFileName(null);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      processFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      processFile(file);
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div 
      className={`w-full max-w-xl mx-auto mt-8 p-6 border-2 border-dashed rounded-lg transition-colors ${
        isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={handleClick}
    >
      <input 
        type="file" 
        ref={fileInputRef}
        className="hidden" 
        accept=".csv,.xlsx,.xls" 
        onChange={handleFileChange}
      />
      <div className="flex flex-col items-center justify-center text-center">
        <Upload className="w-12 h-12 text-blue-500 mb-2" />
        <h3 className="text-lg font-medium text-gray-700 mb-1">
          {fileName ? fileName : 'Upload Marks File'}
        </h3>
        <p className="text-sm text-gray-500 mb-2">
          {fileName ? 'Click to change file' : 'Drag & Drop or Click to Upload'}
        </p>
        <p className="text-xs text-gray-400">
          Accepts CSV and Excel files (.csv, .xlsx, .xls)
        </p>
      </div>
    </div>
  );
};

export default FileUpload;