import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const PredictionChart = ({ actualData = [], predictedData = [] }) => {
  // Combine data by date and mark future points properly
  const chartDataMap = {};

  actualData.forEach(item => {
    chartDataMap[item.date] = { date: item.date, actual: item.price };
  });

  predictedData.forEach(item => {
    if (chartDataMap[item.date]) {
      chartDataMap[item.date].predicted = item.price;
    } else {
      chartDataMap[item.date] = { date: item.date, predicted: item.price };
    }
  });

  const chartData = Object.values(chartDataMap).sort((a, b) => new Date(a.date) - new Date(b.date));

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-3 text-sm border-white/20">
          <p className="font-bold mb-2 text-white">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="flex justify-between gap-4">
              <span className="capitalize">{entry.name}:</span>
              <span className="font-mono">${entry.value.toFixed(2)}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[400px] w-full animate-fade-in">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" vertical={false} />
          <XAxis dataKey="date" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} tickLine={false} />
          <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} tickLine={false} domain={['auto', 'auto']} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          
          <Line 
            type="monotone" 
            dataKey="actual" 
            name="Actual Price" 
            stroke="#3B82F6" 
            strokeWidth={3} 
            dot={{ r: 2 }} 
            activeDot={{ r: 6 }} 
            animationDuration={2000} 
          />
          <Line 
            type="monotone" 
            dataKey="predicted" 
            name="Predicted Price" 
            stroke="#F59E0B" 
            strokeWidth={3} 
            strokeDasharray="5 5" 
            dot={{ r: 3 }} 
            activeDot={{ r: 6 }} 
            animationDuration={2000} 
            animationBegin={500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PredictionChart;
