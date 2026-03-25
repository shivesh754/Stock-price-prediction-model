import { useState, useEffect } from 'react';
import { format, subYears } from 'date-fns';
import { DollarSign, TrendingUp, TrendingDown, Activity, RefreshCw, Search } from 'lucide-react';
import { stockService } from '../services/api';
import StockChart from '../components/StockChart';
import MetricsCard from '../components/MetricsCard';
import DateRangePicker from '../components/DateRangePicker';
import LoadingSpinner from '../components/LoadingSpinner';
import companiesData from '../data/companies.json';

const POPULAR_STOCKS = companiesData.slice(0, 1000);

const Dashboard = () => {
  const [symbol, setSymbol] = useState(POPULAR_STOCKS[0]?.symbol || 'AAPL');
  const [displayName, setDisplayName] = useState(`${POPULAR_STOCKS[0]?.name} (${POPULAR_STOCKS[0]?.symbol})` || 'Apple Inc. (AAPL)');
  
  // Default to 1 year back
  const today = new Date();
  const defaultStart = format(subYears(today, 1), 'yyyy-MM-dd');
  const defaultEnd = format(today, 'yyyy-MM-dd');

  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(defaultEnd);
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await stockService.getHistoricalData(symbol, startDate, endDate);
      setData(result);
      calculateStats(result);
    } catch (err) {
      setError('Failed to fetch historical data. ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [symbol, startDate, endDate]);

  const calculateStats = (result) => {
    if (!result || result.close.length === 0) return;

    const closes = result.close;
    const highs = result.high;
    const lows = result.low;
    const volumes = result.volume;
    
    const currentPrice = closes[closes.length - 1];
    const prevPrice = closes.length > 1 ? closes[closes.length - 2] : currentPrice;
    
    // Last 7 days slice
    const sevenDaysHigh = Math.max(...highs.slice(-7));
    const sevenDaysLow = Math.min(...lows.slice(-7));
    const avgVol = volumes.slice(-7).reduce((a, b) => a + b, 0) / Math.min(7, volumes.length);

    const priceChange = ((currentPrice - prevPrice) / prevPrice) * 100;

    setStats({
      currentPrice,
      priceChange,
      sevenDaysHigh,
      sevenDaysLow,
      avgVol
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            Market Dashboard
          </h1>
          <p className="text-gray-400 mt-1">Real-time historical data and insights</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <input
              type="text"
              list="dash-companies"
              value={displayName}
              onChange={(e) => {
                const val = e.target.value;
                setDisplayName(val);
                const found = companiesData.find(c => `${c.name} (${c.symbol})` === val || c.symbol === val);
                if (found) {
                  setSymbol(found.symbol);
                } else {
                  setSymbol(val.toUpperCase());
                }
              }}
              placeholder="Search symbol..."
              className="input-field pr-10"
            />
            <datalist id="dash-companies">
              {POPULAR_STOCKS.map(c => (
                <option key={c.symbol} value={`${c.name} (${c.symbol})`} />
              ))}
            </datalist>
            <div className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
              <Search className="w-4 h-4" />
            </div>
          </div>
          <button 
            onClick={fetchData} 
            className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 transition-colors border border-white/10"
            title="Refresh Data"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <div className="glass-panel p-4 mb-8 flex flex-wrap gap-4 items-center !bg-dark-card/50">
        <DateRangePicker 
          startDate={startDate} 
          endDate={endDate} 
          onStartChange={setStartDate} 
          onEndChange={setEndDate} 
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricsCard 
          title="Current Price" 
          value={stats ? stats.currentPrice : '-.--'} 
          icon={<DollarSign className="w-5 h-5" />} 
          trend={stats ? stats.priceChange.toFixed(2) : undefined}
          highlight={true}
          suffix=" USD"
        />
        <MetricsCard 
          title="7-Day High" 
          value={stats ? stats.sevenDaysHigh : '-.--'} 
          icon={<TrendingUp className="w-5 h-5" />} 
        />
        <MetricsCard 
          title="7-Day Low" 
          value={stats ? stats.sevenDaysLow : '-.--'} 
          icon={<TrendingDown className="w-5 h-5" />} 
        />
        <MetricsCard 
          title="Avg Volume (7d)" 
          value={stats ? (stats.avgVol / 1000000).toFixed(2) : '-.--'} 
          icon={<Activity className="w-5 h-5" />} 
          suffix="M"
        />
      </div>

      {/* Main Chart Area */}
      <div className="glass-panel p-6 h-[550px]">
        {loading ? (
          <LoadingSpinner message="Fetching market data..." />
        ) : error ? (
          <div className="h-full flex items-center justify-center text-stock-down flex-col bg-red-500/5 rounded-xl border border-red-500/10">
            <TrendingDown className="w-8 h-8 mb-2 opacity-50" />
            <p>{error}</p>
          </div>
        ) : (
          <StockChart data={data} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
