import { useState } from 'react';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, ComposedChart 
} from 'recharts';
import { Activity } from 'lucide-react';

const StockChart = ({ data }) => {
  const [activeToggles, setActiveToggles] = useState({
    open: true,
    high: false,
    low: false,
    close: true
  });

  const handleToggle = (key) => {
    setActiveToggles(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!data || data.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        <Activity className="w-6 h-6 mr-2 animate-pulse" />
        No data available for the selected range
      </div>
    );
  }

  const chartData = data.dates.map((date, index) => ({
    date,
    open: data.open[index],
    high: data.high[index],
    low: data.low[index],
    close: data.close[index],
    volume: data.volume[index]
  }));

  const colors = {
    open: '#3B82F6', // Blue
    high: '#10B981', // Green
    low: '#EF4444',  // Red
    close: '#F59E0B' // Yellow
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-3 text-sm border-white/20">
          <p className="font-bold mb-2 text-white">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="flex justify-between gap-4">
              <span className="capitalize">{entry.name}:</span>
              <span className="font-mono">{entry.value.toLocaleString()}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col h-full w-full gap-4 relative animate-fade-in">
      <div className="flex gap-4 mb-2 flex-wrap">
        {Object.keys(activeToggles).map(key => (
          <button
            key={key}
            onClick={() => handleToggle(key)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 border ${
              activeToggles[key] 
                ? 'bg-opacity-20 border-opacity-50' 
                : 'bg-transparent text-gray-500 border-gray-700 hover:text-gray-300'
            }`}
            style={{
              backgroundColor: activeToggles[key] ? colors[key] + '33' : 'transparent',
              borderColor: activeToggles[key] ? colors[key] : '',
              color: activeToggles[key] ? colors[key] : ''
            }}
          >
            {key.toUpperCase()}
          </button>
        ))}
      </div>
      
      {/* Price Chart */}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff1a" vertical={false} />
            <XAxis dataKey="date" stroke="#9ca3af" tick={{ fill: '#9ca3af' }} tickLine={false} />
            <YAxis stroke="#9ca3af" tick={{ fill: '#9ca3af' }} tickLine={false} domain={['auto', 'auto']} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            
            {activeToggles.open && <Line type="monotone" dataKey="open" stroke={colors.open} strokeWidth={2} dot={false} activeDot={{ r: 8 }} animationDuration={1500} />}
            {activeToggles.high && <Line type="monotone" dataKey="high" stroke={colors.high} strokeWidth={2} dot={false} activeDot={{ r: 8 }} animationDuration={1500} />}
            {activeToggles.low && <Line type="monotone" dataKey="low" stroke={colors.low} strokeWidth={2} dot={false} activeDot={{ r: 8 }} animationDuration={1500} />}
            {activeToggles.close && <Line type="monotone" dataKey="close" stroke={colors.close} strokeWidth={2} dot={false} activeDot={{ r: 8 }} animationDuration={1500} />}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Volume Chart */}
      <div className="h-[120px] w-full mt-4 border-t border-white/10 pt-4">
        <h4 className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-semibold">Trading Volume</h4>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 0, right: 30, left: 20, bottom: 0 }}>
            <Tooltip 
              cursor={{ fill: '#ffffff1a' }} 
              contentStyle={{ backgroundColor: '#1C263A', borderColor: '#ffffff33', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Bar dataKey="volume" fill="#8b5cf6" radius={[4, 4, 0, 0]} animationDuration={1500}>
              {chartData.map((entry, index) => {
                const isPositive = index === 0 || entry.close >= chartData[index - 1].close;
                return <cell key={`cell-${index}`} fill={isPositive ? '#10B981' : '#EF4444'} />;
              })}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockChart;
