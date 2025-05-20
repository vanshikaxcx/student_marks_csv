import React, { useEffect, useState } from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorAlertProps {
  message: string;
  onDismiss: () => void;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-dismiss after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onDismiss, 300); // Wait for fade out animation
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(onDismiss, 300); // Wait for fade out animation
  };

  return (
    <div 
      className={`fixed top-4 right-4 bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md transition-all duration-300 max-w-xs ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
      }`}
      role="alert"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-red-500" />
        </div>
        <div className="ml-3 mr-2">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button 
          type="button"
          className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 inline-flex h-8 w-8 hover:bg-red-100"
          onClick={handleDismiss}
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ErrorAlert;