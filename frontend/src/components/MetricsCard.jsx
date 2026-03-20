const MetricsCard = ({ title, value, icon, trend, highlight, suffix = '' }) => {
  const isPositive = trend > 0;
  const isNegative = trend < 0;

  return (
    <div className="glass-panel p-5 flex flex-col justify-between animate-fade-in hover:-translate-y-1 transition-transform">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
        <div className={`p-2 rounded-lg ${highlight ? 'bg-accent-green/10 text-accent-green' : 'bg-white/5 text-gray-400'}`}>
          {icon}
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold mb-1">
          {typeof value === 'number' && !Number.isInteger(value) ? value.toFixed(2) : value}{suffix}
        </div>
        
        {trend !== undefined && (
          <div className="flex items-center gap-1 text-sm font-medium">
            <span className={isPositive ? 'text-stock-up' : isNegative ? 'text-stock-down' : 'text-gray-400'}>
              {isPositive ? '+' : ''}{trend}%
            </span>
            <span className="text-gray-500 font-normal">vs last period</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;
