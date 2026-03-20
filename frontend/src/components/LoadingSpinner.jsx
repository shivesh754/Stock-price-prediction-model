import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ message = "Loading data..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 h-full min-h-[200px] animate-fade-in">
      <Loader2 className="h-10 w-10 text-accent-green animate-spin mb-4" />
      <p className="text-gray-400 font-medium">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
